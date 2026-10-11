"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analyticsEnabled, cleanPageUrl, counterId, handleAnalyticsClick, reachGoal } from "@/lib/analytics";

export default function YandexMetrica() {
  const pathname = usePathname();
  useEffect(() => {
    const id = counterId(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID);
    if (!analyticsEnabled(window.location.hostname, id)) return;
    try {
    if (!window.ym) {
      const queue: NonNullable<Window["ym"]> = Object.assign(
        (...args: unknown[]) => { (queue.a ||= []).push(args); }, { a: [] as unknown[][], l: Date.now() }
      );
      window.ym = queue;
    }
    if (window.dolwoodMetricaInitialized !== id) {
      window.ym(id!, "init", { defer: true, clickmap: true, trackLinks: false, accurateTrackBounce: true, webvisor: false });
      window.dolwoodMetricaInitialized = id!;
      if (!document.querySelector('script[data-dolwood-metrica]')) {
        const script = document.createElement("script");
        script.async = true; script.src = "https://mc.yandex.ru/metrika/tag.js";
        script.dataset.dolwoodMetrica = "true"; document.head.appendChild(script);
      }
    }
    const url = cleanPageUrl(window.location.href);
    if (window.dolwoodMetricaLastPage !== url) {
      window.ym(id!, "hit", url, { title: document.title });
      window.dolwoodMetricaLastPage = url;
    }
    } catch { /* Analytics must not interrupt the purchase inquiry. */ }
  }, [pathname]);
  useEffect(() => {
    document.addEventListener("click", handleAnalyticsClick);
    // Count the first actual change once per request section, without field values.
    const started = new Set<string>();
    const start = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      const section = event.target.closest<HTMLElement>("[data-product]");
      const product = section?.dataset.product;
      if (!section || (product !== "board" && product !== "parts") || started.has(section.id)) return;
      started.add(section.id); reachGoal("request_start", { product, placement: "request" });
    };
    document.addEventListener("input", start);
    document.addEventListener("change", start);
    return () => { document.removeEventListener("click", handleAnalyticsClick); document.removeEventListener("input", start); document.removeEventListener("change", start); };
  }, [pathname]);
  return null;
}
