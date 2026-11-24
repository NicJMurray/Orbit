import type { Enquiry } from "./enquiry";

interface StoredEnquiry extends Enquiry {
  id: string;
  received_at: number;
  notification_attempts: number;
}

const FROM = "orbit-enquiries@njmurray.com";
const FIFTEEN_MINUTES = 15 * 60_000;

export async function deliverEnquiry(env: Cloudflare.Env, id: string) {
  const { DB, ENQUIRY_EMAIL, ENQUIRY_TO } = env;
  if (!DB || !ENQUIRY_EMAIL || !ENQUIRY_TO) return;
  const now = Date.now();
  // Lease the row so a retry and the original request cannot both send it.
  const row = await DB.prepare(
    `UPDATE enquiries
       SET notification_next_at = ?, notification_attempts = notification_attempts + 1
     WHERE id = ? AND notification_sent_at IS NULL AND notification_next_at <= ?
     RETURNING id, name, email, company, interest, message, received_at, notification_attempts`,
  ).bind(now + FIFTEEN_MINUTES, id, now).first<StoredEnquiry>();
  if (!row) return;

  try {
    const { messageId } = await ENQUIRY_EMAIL.send({
      from: FROM,
      to: ENQUIRY_TO,
      replyTo: row.email,
      subject: "New Orbit Audit enquiry",
      text: [
        "A new enquiry was submitted on orbit.njmurray.com.",
        "",
        `Name: ${row.name}`,
        `Email: ${row.email}`,
        `Company or agency: ${row.company}`,
        `Interested in: ${row.interest}`,
        "",
        row.message,
        "",
        `Received: ${new Date(row.received_at).toISOString()}`,
        `Reference: ${row.id}`,
      ].join("\n"),
    });
    await DB.prepare(
      "UPDATE enquiries SET notification_sent_at = ?, notification_message_id = ? WHERE id = ?",
    ).bind(Date.now(), messageId ?? null, row.id).run();
  } catch (error) {
    const code = (error as { code?: string })?.code;
    console.warn("Orbit Audit: enquiry notification pending", { id: row.id, code });
    const wait = Math.min(24 * 60 * 60_000, FIFTEEN_MINUTES * 2 ** Math.min(row.notification_attempts - 1, 7));
    await DB.prepare("UPDATE enquiries SET notification_next_at = ? WHERE id = ?")
      .bind(Date.now() + wait, row.id).run();
  }
}

export async function retryPendingEnquiries(env: Cloudflare.Env) {
  if (!env.DB || !env.ENQUIRY_EMAIL || !env.ENQUIRY_TO) return;
  const rows = await env.DB.prepare(
    "SELECT id FROM enquiries WHERE notification_sent_at IS NULL AND notification_next_at <= ? ORDER BY notification_next_at, received_at LIMIT 8",
  ).bind(Date.now()).all<{ id: string }>();
  for (const { id } of rows.results) await deliverEnquiry(env, id);
}
