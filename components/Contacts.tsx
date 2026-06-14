import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { Phone, Telegram, WhatsApp, Mail, Pin, ArrowRight } from "./Icons";

const contacts = [
  { icon: Phone, label: "Телефон менеджера", value: site.phoneDisplay, href: site.phoneHref },
  { icon: Telegram, label: "Telegram", value: site.telegramHandle, href: site.telegram },
  { icon: WhatsApp, label: "WhatsApp", value: site.phoneDisplay, href: site.whatsapp },
  { icon: Mail, label: "E-mail", value: site.email, href: site.emailHref },
  { icon: Pin, label: "Производство и самовывоз", value: site.city, href: undefined },
];

export default function Contacts() {
  return (
    <section className="section bg-linen" id="kontakty">
      <div className="container">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">
            Контакты
          </Reveal>
          <Reveal as="h2" className="section-title" delay={1}>
            Запросите прайс или расчёт заказа
          </Reveal>
          <Reveal as="p" className="section-lead" delay={2}>
            Ответим в рабочее время, пришлём актуальные цены, фото партии и
            рассчитаем стоимость заготовок по вашему чертежу.
          </Reveal>
        </div>

        <div className="contacts__grid">
          <Reveal className="contact-list">
            {contacts.map((c) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <span className="contact-item__icon">
                    <Icon width={22} height={22} />
                  </span>
                  <span>
                    <small>{c.label}</small>
                    <b>{c.value}</b>
                  </span>
                </>
              );
              return c.href ? (
                <a
                  className="contact-item"
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {inner}
                </a>
              ) : (
                <div className="contact-item" key={c.label}>
                  {inner}
                </div>
              );
            })}
          </Reveal>

          <Reveal className="contacts__cta" delay={1}>
            <h3>Напишите нам прямо сейчас</h3>
            <p>
              Самый быстрый способ — мессенджер. Пришлите объём доски или чертёж
              детали, и менеджер вернётся с расчётом.
            </p>
            <a
              className="btn btn-light"
              href={`${site.whatsappText}буковой%20доской`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp width={20} height={20} /> Написать в WhatsApp
            </a>
            <a className="btn btn-light" href={site.telegram} target="_blank" rel="noopener noreferrer">
              <Telegram width={20} height={20} /> Написать в Telegram
            </a>
            <a className="btn btn-ghost" href={site.phoneHref} style={{ color: "var(--cream)", borderColor: "rgba(245,241,233,.4)" }}>
              <Phone width={18} height={18} /> Позвонить менеджеру
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
