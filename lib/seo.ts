import type { Metadata } from "next";
import { absoluteUrl } from "./site";
export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const url = absoluteUrl(path);
  return { title, description, alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", locale: "ru_RU", siteName: "Dolwood" },
    twitter: { card: "summary", title, description } };
}
