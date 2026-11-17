"use client";

import { CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/data/i18n/config";
import type { Dict } from "@/data/i18n/types";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ lang, t }: { lang: Locale; t: Dict["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        const code = json.error as keyof typeof t.errors | undefined;
        throw new Error(code && code in t.errors ? t.errors[code] : t.errors.generic);
      }
      setStatus("sent");
      setMessage(t.sent);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : t.errors.generic);
    }
  }

  const field = "mt-2 w-full rounded-lg border border-paper/15 bg-ink-900 px-4 py-3 text-paper transition-[border-color,box-shadow] duration-300 focus:border-indigo focus:outline-none focus:ring-4 focus:ring-indigo/10";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          {t.name}
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="block text-sm">
          {t.email}
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block text-sm">
        {t.message}
        <textarea name="message" required minLength={10} maxLength={4000} rows={5} className={field} />
      </label>
      {/* Honeypot anti-spam : doit rester vide */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <p className="text-sm text-mute">
        {t.consent}{" "}
        <Link href={`/${lang}/privacy`} className="underline underline-offset-2 hover:text-paper">
          {t.consentLink}
        </Link>
        .
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary group disabled:opacity-60">
          <Send size={16} aria-hidden="true" className={`transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${status === "sending" ? "animate-pulse" : ""}`} />
          {status === "sending" ? t.sending : t.send}
        </button>
        <p role="status" aria-live="polite" className={`flex items-center gap-2 text-sm ${status === "error" ? "text-red-700" : status === "sent" ? "text-emerald-700" : "text-mute"}`}>
          {status === "sent" && <CheckCircle2 size={18} aria-hidden="true" className="hero-rise" />}
          {message}
        </p>
      </div>
    </form>
  );
}
