import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
 return ["/", "/bukovaya-doska/", "/zagotovki-iz-buka/", "/dostavka-i-oplata/"].map(path => ({ url: absoluteUrl(path) }));
}
