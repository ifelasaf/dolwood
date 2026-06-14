"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Phone, Telegram, WhatsApp, Mail, ChevronDown, Chat, Close } from "./Icons";

export const contactItems = [
  { Icon: Phone, label: "Позвонить", sub: site.phoneDisplay, href: site.phoneHref, ext: false },
  { Icon: Telegram, label: "Telegram", sub: site.telegramHandle, href: site.telegram, ext: true },
  { Icon: WhatsApp, label: "WhatsApp", sub: site.phoneDisplay, href: site.whatsapp, ext: true },
  { Icon: Mail, label: "Написать на почту", sub: site.email, href: site.emailHref, ext: false },
];

export default function ContactMenu({
  variant = "header",
}: {
  variant?: "header" | "fab";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const panel = (
    <div className="contact-panel" role="menu" aria-label="Способы связи">
      {contactItems.map((it) => (
        <a
          key={it.label}
          className="contact-panel__item"
          href={it.href}
          target={it.ext ? "_blank" : undefined}
          rel={it.ext ? "noopener noreferrer" : undefined}
          role="menuitem"
          onClick={() => setOpen(false)}
        >
          <span className="contact-panel__icon">
            <it.Icon width={20} height={20} />
          </span>
          <span className="contact-panel__text">
            <b>{it.label}</b>
            <small>{it.sub}</small>
          </span>
        </a>
      ))}
    </div>
  );

  if (variant === "fab") {
    return (
      <div className={`contact-fab ${open ? "open" : ""}`} ref={ref}>
        {open && panel}
        <button
          type="button"
          className="contact-fab__trigger"
          aria-label={open ? "Закрыть" : "Связаться"}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close width={26} height={26} /> : <Chat width={28} height={28} />}
        </button>
      </div>
    );
  }

  return (
    <div className={`contact-menu contact-menu--header ${open ? "open" : ""}`} ref={ref}>
      <button
        type="button"
        className="btn btn-ghost contact-menu__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Связаться
        <ChevronDown className={`chev ${open ? "chev--up" : ""}`} width={16} height={16} />
      </button>
      {open && panel}
    </div>
  );
}
