import { env } from "cloudflare:workers";
import { INTERESTS, type Enquiry, type Interest } from "../../../lib/enquiry";

const MAX_BODY = 18_000;
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
const reply = (body: object, status: number) => Response.json(body, { status, headers });

async function boundedText(req: Request) {
  const reader = req.body?.getReader();
  if (!reader) throw new Error("missing body");
  const decoder = new TextDecoder();
  let result = "";
  let actualSize = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) return result + decoder.decode();
    actualSize += value.byteLength;
    if (actualSize > MAX_BODY) {
      await reader.cancel();
      throw new RangeError("oversized body");
    }
    result += decoder.decode(value, { stream: true });
  }
}

export async function POST(req: Request) {
  const site = req.headers.get("sec-fetch-site");
  const origin = req.headers.get("origin");
  if (site === "cross-site" || site === "same-site" || (origin && origin !== new URL(req.url).origin)) {
    return reply({ message: "Please submit the form from Orbit Audit." }, 403);
  }
  const type = req.headers.get("content-type")?.split(";")[0].trim();
  if (type !== "application/json" && type !== "application/x-www-form-urlencoded") {
    return reply({ message: "Please submit the enquiry form." }, 415);
  }
  if (Number(req.headers.get("content-length")) > MAX_BODY) return reply({ message: "Please shorten your message and try again." }, 413);
  let raw: Record<string, unknown>;
  try {
    const body = await boundedText(req);
    raw = type === "application/json"
      ? JSON.parse(body)
      : Object.fromEntries(new URLSearchParams(body));
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("invalid body");
  } catch (error) {
    return error instanceof RangeError
      ? reply({ message: "Please shorten your message and try again." }, 413)
      : reply({ message: "We couldn't read your enquiry. Please try again." }, 400);
  }

  const redirect = () => new Response(null, { status: 303, headers: { ...headers, Location: "/contact?sent=1#contact" } });
  if (typeof raw.website === "string" && raw.website.trim()) return type === "application/json" ? reply({ ok: true }, 200) : redirect();

  const val = (key: string) => typeof raw[key] === "string" ? raw[key].trim() : "";
  const data: Enquiry = {
    name: val("name"),
    email: val("email"),
    company: val("company"),
    interest: val("interest") as Interest,
    message: val("message"),
  };
  const errors: Partial<Record<keyof Enquiry, string>> = {};
  if (!data.name || data.name.length > 100) errors.name = "Enter your name (up to 100 characters).";
  if (data.email.length > 254 || !/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]{2,}$/u.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.company || data.company.length > 140) errors.company = "Enter your company name (up to 140 characters).";
  if (!INTERESTS.includes(data.interest)) errors.interest = "Choose what you’re looking for.";
  if (data.message.length < 10 || data.message.length > 2400) errors.message = "Tell us a little about the project (10 to 2,400 characters).";
  if (Object.keys(errors).length) return reply({ message: "Please check the highlighted fields.", errors }, 400);

  const id = crypto.randomUUID();
  try {
    if (!env.DB) throw new Error("Missing database binding");
    // Count by the normalized address; do not store visitor IPs.
    const recent = await env.DB.prepare("SELECT COUNT(*) AS total FROM enquiries WHERE email = ? AND received_at > ?")
      .bind(data.email.toLowerCase(), Date.now() - 5 * 60_000).first<number>("total");
    if ((recent ?? 0) >= 5) return reply({ message: "Too many enquiries. Please wait a few minutes and try again." }, 429);
    await env.DB.prepare(
      "INSERT INTO enquiries (id, name, email, company, interest, message, received_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    ).bind(id, data.name, data.email.toLowerCase(), data.company, data.interest, data.message, Date.now()).run();
  } catch {
    console.error("Orbit Audit: could not record enquiry");
    return reply({ message: "Your enquiry couldn’t be saved. Please try again shortly." }, 503);
  }
  // Storage is the receipt; an email outage leaves the enquiry queued for retry.
  if (env.ENQUIRY_MAILER) {
    await env.ENQUIRY_MAILER.fetch("https://orbit-mailer.internal/notify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(response => {
      if (!response.ok) throw new Error("Mailer unavailable");
    }).catch(() => console.warn("Orbit Audit: notification retry required", { id }));
  }
  return type === "application/json" ? reply({ ok: true }, 201) : redirect();
}
