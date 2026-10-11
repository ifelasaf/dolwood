import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";
export function GET() {
 const body = `User-agent: *
Allow: /

User-agent: Yandex
Allow: /
Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term&yclid&_openstat&gclid&fbclid

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
 return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
