import { absoluteUrl, pathHref } from "@/lib/site";
export default function PageIntro({ title, description, path, label }: { title: string; description: string; path: string; label: string }) {
 const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
  { "@type": "ListItem", position: 1, name: "Главная", item: absoluteUrl("/") },
  { "@type": "ListItem", position: 2, name: label, item: absoluteUrl(path) }] };
 return <section className="page-intro bg-linen"><div className="container"><nav aria-label="Хлебные крошки" className="breadcrumbs"><a href={pathHref("/")}>Главная</a><span aria-hidden="true"> / </span><span>{label}</span></nav><h1>{title}</h1><p className="section-lead">{description}</p></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /></section>;
}
