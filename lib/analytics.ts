export const goals = ["request_board", "request_parts", "request_start", "request_saved", "request_contact", "request_copy", "contact_phone", "contact_whatsapp", "contact_telegram", "contact_email"] as const;
export type Goal = typeof goals[number];
export type GoalParams = { product?: "board" | "parts"; placement?: string; channel?: string };
type Ym = ((id: number, method: string, ...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
declare global { interface Window { ym?: Ym; dolwoodMetricaInitialized?: number; dolwoodMetricaLastPage?: string } }
export function counterId(value: string | undefined): number | null {
  if (!value || !/^[1-9]\d*$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}
export function contactChannel(href: string): string | undefined {
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  try { const host = new URL(href).hostname; if (host === "wa.me") return "whatsapp"; if (host === "t.me") return "telegram"; } catch { /* internal relative URL */ }
}
export function requestGoal(href: string): Goal | undefined {
  if (href.endsWith("#request-board")) return "request_board";
  if (href.endsWith("#request-parts")) return "request_parts";
}
export function cleanPageUrl(href: string): string {
  const url = new URL(href);
  url.hash = "";
  // Attribution is retained; arbitrary query strings and message bodies aren't included.
  const allowed = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid", "_openstat", "gclid"]);
  for (const key of Array.from(url.searchParams.keys())) if (!allowed.has(key)) url.searchParams.delete(key);
  return url.href;
}
export function analyticsEnabled(host: string, id: number | null): boolean {
  return !!id && !["localhost", "127.0.0.1", "[::1]"].includes(host);
}
export function reachGoal(goal: Goal, params: GoalParams = {}) {
  if (typeof window === "undefined") return;
  const id = counterId(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID);
  if (!analyticsEnabled(window.location.hostname, id) || !window.ym) return;
  try { window.ym(id!, "reachGoal", goal, { ...params, page: window.location.pathname }); } catch { /* Analytics never blocks contact actions. */ }
}
export function handleAnalyticsClick(event: MouseEvent) {
  if (event.defaultPrevented || !(event.target instanceof Element)) return;
  const target = event.target.closest<HTMLElement>("a,button");
  if (!target || target.getAttribute("aria-disabled") === "true" || target.hasAttribute("disabled")) return;
  const href = target.getAttribute("href") || "";
  const channel = contactChannel(href);
  const placement = target.closest<HTMLElement>("[data-placement]")?.dataset.placement || "page";
  const productValue = target.closest<HTMLElement>("[data-product]")?.dataset.product;
  const product: GoalParams["product"] = productValue === "parts" || productValue === "board" ? productValue : undefined;
  const params = { placement, channel, product };
  const request = requestGoal(href);
  if (request) reachGoal(request, params);
  if (channel) reachGoal(`contact_${channel}` as Goal, params);
  if (target.dataset.goal === "request_contact" && channel) reachGoal("request_contact", params);
}
