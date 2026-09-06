import { DOCS } from "@/lib/links";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="masthead">
      <div className="wrap masthead-in">
        <a href="#top" className="mark" aria-label="Harvest — home">
          <Logo size={30} />
        </a>
        <nav className="nav">
          <div className="nav-wide">
            <a href="#pipeline">Pipeline</a>
            <a href="#episode">An episode</a>
            <a href="#capacity">Capacity</a>
            <a href="#routes">Participation</a>
            <a href={DOCS} target="_blank" rel="noopener noreferrer">
              Docs
            </a>
          </div>
          <a href="#contact" className="act">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
