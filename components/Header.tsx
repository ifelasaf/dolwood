"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Menu, Close } from "./Icons";
import ContactMenu, { contactItems } from "./ContactMenu";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header data-placement="header" className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header__inner">
        <a href={`${BASE}/`} className="logo logo--img" aria-label={`${site.name} — на главную`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/logo-v3.png`}
            alt="Dolwood"
            width={1368}
            height={1149}
            className="logo-svg"
          />
        </a>

        <nav className="nav" aria-label="Основная навигация">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <ContactMenu variant="header" />
          <button
            className="burger"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close width={24} height={24} /> : <Menu width={24} height={24} />}
          </button>
        </div>
      </div>

      <div id="mobile-navigation" hidden={!open} className={`mobile-menu ${open ? "open" : ""}`}>
        <nav className="mobile-menu__nav" aria-label="Мобильная навигация">
          {nav.map((n) => (
            <a
              key={n.href}
              className="mobile-menu__link"
              href={n.href}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <span className="mobile-menu__label">Связаться</span>
        <div className="mobile-menu__contacts">
          {contactItems.map((it) => (
            <a
              key={it.label}
              className="m-contact"
              href={it.href}
              target={it.ext ? "_blank" : undefined}
              rel={it.ext ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="m-contact__icon">
                <it.Icon width={20} height={20} />
              </span>
              <span className="m-contact__text">
                <b>{it.label}</b>
                <small>{it.sub}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
