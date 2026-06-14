import type { SVGProps } from "react";

type I = SVGProps<SVGSVGElement>;
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const LogoMark = (p: I) => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden {...p}>
    <path
      d="M20 3c5 6 8 11 8 17a8 8 0 0 1-16 0c0-6 3-11 8-17Z"
      fill="currentColor"
      opacity="0.18"
    />
    <path
      d="M20 3c5 6 8 11 8 17a8 8 0 0 1-16 0c0-6 3-11 8-17Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path d="M20 13v22M20 22c-2.6-.6-4.3-2-5.3-4M20 27c2.6-.6 4.3-2 5.3-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const Phone = (p: I) => (
  <svg {...base} {...p}>
    <path d="M6.5 4h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L16 13l4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
  </svg>
);

export const Telegram = (p: I) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M21.94 4.3 18.7 19.6c-.24 1.08-.88 1.34-1.78.84l-4.92-3.63-2.37 2.29c-.27.27-.5.5-1 .5l.35-5.02 9.14-8.26c.4-.35-.09-.55-.62-.2L6.2 13.1l-4.86-1.52c-1.06-.33-1.08-1.06.22-1.57l19-7.32c.88-.33 1.65.2 1.37 1.61Z" />
  </svg>
);

export const WhatsApp = (p: I) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5.3-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7s1.9 2.9 4.6 4c1.7.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3Z" />
  </svg>
);

export const Mail = (p: I) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Pin = (p: I) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const ArrowRight = (p: I) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = (p: I) => (
  <svg {...base} {...p}>
    <path d="m20 6-11 11-5-5" />
  </svg>
);

export const Menu = (p: I) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: I) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronDown = (p: I) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowUp = (p: I) => (
  <svg {...base} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const Chat = (p: I) => (
  <svg {...base} {...p}>
    <path d="M21 11.5a7.5 7.5 0 0 1-10.9 6.7L4 20l1.8-5.1A7.5 7.5 0 1 1 21 11.5Z" />
    <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
  </svg>
);

/* доменные иконки */
export const Plank = (p: I) => (
  <svg {...base} {...p}>
    <rect x="3" y="8" width="18" height="8" rx="1.5" />
    <path d="M6 8v8M10 8v8M14 8v8M18 8v8" opacity=".5" />
  </svg>
);
export const Leg = (p: I) => (
  <svg {...base} {...p}>
    <path d="M8 3h8M9 3c0 4-1 13-1 18M15 3c0 4 1 13 1 18M8.4 9h7.2M8.2 14h7.6" />
  </svg>
);
export const Panel = (p: I) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M8 5v14M13 5v14M18 5v14" opacity=".5" />
  </svg>
);
export const Saw = (p: I) => (
  <svg {...base} {...p}>
    <path d="M3 7h13l-2 3 2 3H3z" />
    <path d="M16 8.5 21 7v6l-5-1.5" />
    <path d="M3 7v10" />
  </svg>
);
export const Drop = (p: I) => (
  <svg {...base} {...p}>
    <path d="M12 3c3.5 4.5 6 8 6 11a6 6 0 0 1-12 0c0-3 2.5-6.5 6-11Z" />
  </svg>
);
export const Shield = (p: I) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
    <path d="m9.5 12 1.8 1.8L15 10" />
  </svg>
);
export const Ruble = (p: I) => (
  <svg {...base} {...p}>
    <path d="M8 21V5h5a4 4 0 0 1 0 8H8M6 16h7M6 13h2" />
  </svg>
);
export const Truck = (p: I) => (
  <svg {...base} {...p}>
    <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);
export const Gauge = (p: I) => (
  <svg {...base} {...p}>
    <path d="M4 15a8 8 0 0 1 16 0" />
    <path d="m12 15 4-4" />
    <path d="M4 19h16" />
  </svg>
);
export const Handshake = (p: I) => (
  <svg {...base} {...p}>
    <path d="m3 11 4-4 5 3 5-3 4 4-4 5-3-2-2 2-3-2-3 2" />
  </svg>
);
