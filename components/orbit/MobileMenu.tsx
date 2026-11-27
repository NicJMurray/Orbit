"use client";

import { useRef, useState } from "react";

export function MobileMenu({ links }: { links: ReadonlyArray<{ href: string; label: string }> }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <div className="mobile-menu" onKeyDown={(e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }}>
      <button ref={toggle} className="nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg> :
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
      </button>
      <nav className="nav-drawer" id="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>
        {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      </nav>
    </div>
  );
}
