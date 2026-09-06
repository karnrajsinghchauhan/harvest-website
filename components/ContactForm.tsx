"use client";

import { useState, FormEvent } from "react";

type State = "idle" | "sending" | "sent" | "failed";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [problem, setProblem] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    setProblem("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setProblem(body.error || "The message didn't send. Try again in a moment.");
      setState("failed");
      return;
    }

    form.reset();
    setState("sent");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="pair">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" autoComplete="organization" />
      </div>

      <div className="field">
        <label htmlFor="interest">What brings you here</label>
        <select id="interest" name="interest" defaultValue="buying">
          <option value="buying">Buying or licensing data</option>
          <option value="reserved">Reserving collection capacity</option>
          <option value="investing">Machine Shares</option>
          <option value="operator">Operating or staking a robot</option>
          <option value="press">Press</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>

      <div>
        <button type="submit" className="act" disabled={state === "sending"}>
          {state === "sending" ? "Sending" : "Send message"}
        </button>
      </div>

      {state === "sent" && (
        <p className="note note-ok">Sent. We answer within one business day.</p>
      )}
      {state === "failed" && <p className="note note-bad">{problem}</p>}
    </form>
  );
}
