"use client";
import { usePathname } from "next/navigation";
import { pathHref, site } from "@/lib/site";
export default function MobileAction() {
  const parts = usePathname().includes("zagotovki-iz-buka");
  return <div className="mobile-action" data-placement="mobile" aria-label="Быстрый запрос"><a className="btn btn-primary" href={pathHref(parts ? "/zagotovki-iz-buka/#request-parts" : "/bukovaya-doska/#request-board")}>{parts ? "Рассчитать детали" : "Запросить прайс"}</a><a className="btn btn-ghost" href={site.phoneHref}>Позвонить</a></div>;
}
