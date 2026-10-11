export const site = {
  name: "DOLWOOD",
  tagline: "Бук от производителя",
  city: "г.о. Щёлково, Московская область",
  phoneDisplay: "+7 926 717-47-64",
  phoneHref: "tel:+79267174764",
  telegram: "https://t.me/dolovaalina",
  telegramHandle: "@dolovaalina",
  whatsapp: "https://wa.me/79267174764",
  whatsappText:
    "https://wa.me/79267174764?text=Здравствуйте!%20Пишу%20с%20сайта%20Dolwood,%20интересует%20",
  email: "alina_dolova@mail.ru",
  emailHref: "mailto:alina_dolova@mail.ru",
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://dolwood.ru").replace(/\/$/, "");
export const pathHref = (path: string) => `${basePath}${path}`;
export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

export const nav = [
  { href: pathHref("/bukovaya-doska/"), label: "Доска оптом" },
  { href: pathHref("/zagotovki-iz-buka/"), label: "Заготовки и декор" },
  { href: pathHref("/dostavka-i-oplata/"), label: "Доставка и оплата" },
  { href: pathHref("/#about"), label: "Производство" },
  { href: pathHref("/#kontakty"), label: "Контакты" },
];
