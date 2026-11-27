"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { INTERESTS, type Enquiry, type Interest } from "../../lib/enquiry";

type Errors = Partial<Record<keyof Enquiry, string>>;

export function ContactForm({ initialSent = false, initialInterest }: { initialSent?: boolean; initialInterest?: Interest }) {
  const [sent, setSent] = useState(initialSent);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState("");
  const successHeading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (sent) successHeading.current?.focus({ preventScroll: true });
  }, [sent]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setErrors({});
    setFailure("");
    setSending(true);
    const values = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => null) as { ok?: boolean; message?: string; errors?: Errors } | null;
      if (response.ok && data?.ok) {
        setSent(true);
        return;
      }
      setFailure(data?.message || "We couldn’t send your enquiry. Please try again.");
      if (data?.errors) {
        setErrors(data.errors);
        const field = Object.keys(data.errors)[0];
        requestAnimationFrame(() => {
          const element = form.current?.elements.namedItem(field);
          if (element instanceof HTMLElement) element.focus();
        });
      }
    } catch {
      setFailure("We couldn’t send your enquiry. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }
  function described(key: keyof Enquiry) {
    return {
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": errors[key] ? "error-" + key : undefined,
    };
  }
  function error(key: keyof Enquiry) {
    return errors[key] ? <small className="field-error" id={"error-" + key}>{errors[key]}</small> : null;
  }

  return (
    <div className={"contact-panel" + (sent ? " contact-success-panel" : "")}>
      {sent ? (
        <div className="contact-success" role="status">
          <span className="success-icon" aria-hidden="true">
            <svg width="29" height="29" viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <h3 tabIndex={-1} ref={successHeading}>Enquiry received.</h3>
          <p>We’ll reply by email.</p>
          <button className="underlink" type="button" onClick={() => {
            setSent(false);
            if (new URL(window.location.href).searchParams.has("sent")) window.history.replaceState(null, "", "/contact#contact");
            requestAnimationFrame(() => document.getElementById("enquiry-name")?.focus());
          }}>Send another enquiry</button>
        </div>
      ) : (
        <form className="contact-form" ref={form} onSubmit={submit} action="/api/enquiries" method="post">
          <div className="form-pair">
            <label htmlFor="enquiry-name">Name
              <input id="enquiry-name" name="name" autoComplete="name" required maxLength={100} placeholder="Your name" {...described("name")} />
              {error("name")}
            </label>
            <label htmlFor="enquiry-email">Work email
              <input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" {...described("email")} />
              {error("email")}
            </label>
          </div>
          <div className="form-pair">
            <label htmlFor="enquiry-company">Company or agency
              <input id="enquiry-company" name="company" autoComplete="organization" required maxLength={140} {...described("company")} />
              {error("company")}
            </label>
            <label htmlFor="enquiry-interest">Enquiry type
              <select id="enquiry-interest" name="interest" defaultValue={initialInterest ?? ""} required {...described("interest")}>
                <option value="" disabled>Select one</option>
                {INTERESTS.map(interest => <option key={interest} value={interest}>{interest}</option>)}
              </select>
              {error("interest")}
            </label>
          </div>
          <label htmlFor="enquiry-message">What should we review?
            <textarea id="enquiry-message" name="message" rows={4} minLength={10} maxLength={2400} required placeholder="Accounts, markets and what you want to find out." {...described("message")} />
            {error("message")}
          </label>
          <div className="form-trap" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
          {failure && <p className="submission-error" role="alert">{failure}</p>}
          <div className="form-actions">
            <button className="button button-ink" type="submit" disabled={sending}>{sending ? "Sending…" : "Send enquiry"}</button>
            <p>We use your details to respond to your enquiry.<br /><a href="/privacy">How we handle your details</a></p>
          </div>
        </form>
      )}
    </div>
  );
}
