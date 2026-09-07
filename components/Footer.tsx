import ContactForm from "./ContactForm";
import Logo from "./Logo";
import { DOCS, X_URL, doc } from "@/lib/links";
import Link from "next/link";

export function Contact() {
  return (
    <section id="contact" className="wrap band">
      <div className="head">
        <div className="head-num index">06 / 06</div>
        <div className="head-body">
          <h2 className="h2">Tell us what your training stack needs.</h2>
          <p className="lede">
            For dataset licensing, reserved collection capacity, operator programs,
            or investment enquiries, send the task class, embodiment, and target
            volume.
          </p>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <a href="/" className="mark" aria-label="Harvest home">
            <Logo />
          </a>
          <nav className="foot-links" aria-label="Footer navigation">
            <Link href="/platform">Platform</Link>
            <Link href="/data">Data</Link>
            <Link href="/blog">Field notes</Link>
            <Link href="/company">Company</Link>
            <Link href="/docs">Documentation</Link>
            <a href={doc("security")} target="_blank" rel="noopener noreferrer">Security</a>
            <a href={doc("terms")} target="_blank" rel="noopener noreferrer">Terms</a>
            <a href={doc("privacy")} target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href={X_URL} target="_blank" rel="noopener noreferrer">X</a>
          </nav>
        </div>
        <div className="foot-legal">© {new Date().getFullYear()} Harvest. All rights reserved.</div>
        <p className="legal">
          Capacity, performance, and financial figures on this site are models and
          targets, not guarantees. Machine Shares are a design concept and are not
          an offer or solicitation of securities.
        </p>
      </div>
    </footer>
  );
}
