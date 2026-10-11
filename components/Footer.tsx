import { nav, site } from "@/lib/site";
import { Telegram, WhatsApp, Mail } from "./Icons";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="footer" data-placement="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <a href={`${BASE}/`} className="logo logo--img logo--footer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/logo-v3.png`}
                alt="Dolwood"
                width={1368}
                height={1149}
                className="logo-svg"
              />
            </a>
            <p className="footer__about">
              Производство буковой доски и мебельных заготовок на заказ в Щёлково.
              Поставки для мебельных фабрик и мастерских по всей России.
            </p>
            <div className="footer__socials">
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <Telegram width={20} height={20} />
              </a>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsApp width={20} height={20} />
              </a>
              <a href={site.emailHref} aria-label="E-mail">
                <Mail width={20} height={20} />
              </a>
            </div>
          </div>

          <div>
            <h4>Разделы</h4>
            <ul className="footer__links">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Контакты</h4>
            <ul className="footer__links">
              <li>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </li>
              <li>
                <a href={site.telegram} target="_blank" rel="noopener noreferrer">
                  Telegram {site.telegramHandle}
                </a>
              </li>
              <li>
                <a href={site.emailHref}>{site.email}</a>
              </li>
              <li>{site.city}</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {site.name}. Бук оптом и мебельные заготовки на заказ.
          </span>
          <span>Самовывоз из Щёлково · доставка по России</span>
        </div>
      </div>
    </footer>
  );
}
