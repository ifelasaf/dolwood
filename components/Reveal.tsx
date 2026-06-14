"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type CSSProperties,
} from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  id?: string;
  style?: CSSProperties;
};

/**
 * Лёгкая анимация появления на скролле — без сторонних библиотек.
 * Использует IntersectionObserver и навешивает класс .is-visible один раз.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  id,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      style={style}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      data-delay={delay || undefined}
    >
      {children}
    </Tag>
  );
}
