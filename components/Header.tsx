"use client";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const links = [["/platform","Platform"],["/data","Data"],["/docs","Docs"],["/blog","Field notes"],["/company","Company"]];
  return (
    <header className="masthead" onKeyDown={e => {if(e.key==="Escape"){setOpen(false);toggle.current?.focus();}}}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="wrap masthead-in">
        <Link href="/" className="mark" aria-label="Harvest — home">
          <Logo size={30} />
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <div className="nav-wide">
            <Link href="/platform">Platform</Link>
            <Link href="/data">Data</Link>
            <Link href="/blog">Field notes</Link>
            <Link href="/company">Company</Link>
            <Link href="/docs">
              Docs
            </Link>
          </div>
          <Link href="/#contact" className="act">
            Contact
          </Link>
          <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?"Close":"Menu"}</button>
        </nav>
      </div>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" hidden={!open}>{links.map(([href,label])=><Link key={href} href={href} aria-current={pathname.startsWith(href)?"page":undefined} onClick={()=>setOpen(false)}>{label}<span aria-hidden="true">↗</span></Link>)}</nav>
    </header>
  );
}
