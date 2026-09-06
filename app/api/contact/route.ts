import { NextRequest, NextResponse } from "next/server";

/**
 * Contact delivery via Resend's HTTP API. Two environment variables are
 * required in the Vercel project (Settings -> Environment Variables):
 *
 *   RESEND_API_KEY    a key from resend.com, after verifying a sending domain
 *   CONTACT_TO_EMAIL  the inbox submissions land in — server-side only, never
 *                     rendered on the page, which is the whole point of taking
 *                     messages through a form instead of publishing an address
 *
 * With either missing the route fails loudly rather than returning a success
 * the sender would believe. A form that quietly drops messages is worse than
 * one that is visibly not configured yet.
 */

const FROM = process.env.CONTACT_FROM_EMAIL;

export async function POST(req: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !to || !FROM) {
    return NextResponse.json(
      {
        error:
          "Contact delivery isn't configured yet. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
      },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json(
      { error: "Name, email and message are all required." },
      { status: 400 }
    );
  }

  const { name, email, company, interest, message } = body;

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      reply_to: email,
      subject: `Harvest — ${interest || "general"} — ${name}`,
      text: [
        `From:     ${name} <${email}>`,
        `Company:  ${company || "—"}`,
        `Interest: ${interest || "—"}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!sent.ok) {
    console.error("Resend rejected the send:", sent.status, await sent.text().catch(() => ""));
    return NextResponse.json(
      { error: "The message didn't send. Try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
