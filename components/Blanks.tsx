import Reveal from "./Reveal";
import { Leg, Saw, Panel, ArrowRight } from "./Icons";

const items = [
  {
    icon: Leg,
    title: "Ножки и опоры",
    text: "Точёные, резные и фрезерованные ножки для столов, стульев и кресел.",
  },
  {
    icon: Saw,
    title: "Подлокотники и царги",
    text: "Подлокотники, царги, проножки и каркасные элементы по вашим размерам.",
  },
  {
    icon: Leg,
    title: "Балясины и стойки",
    text: "Балясины, столбы и элементы лестниц из массива бука и других пород.",
  },
  {
    icon: Saw,
    title: "Токарные и фрезерные детали",
    text: "Токарка и ЧПУ-фрезеровка с точной повторяемостью геометрии в партии.",
  },
  {
    icon: Panel,
    title: "Мебельный щит на заказ",
    text: "Щит и ламель под заданные размеры для столешниц, фасадов, полок.",
  },
  {
    icon: Saw,
    title: "Детали по чертежам",
    text: "Изготовим деталь по вашему чертежу, эскизу или образцу (pdf, dwg, фото).",
  },
];

export default function Blanks() {
  return (
    <section className="section bg-linen" id="zagotovki">
      <div className="container">
        <div className="section-head">
          <Reveal as="h2" className="section-title" delay={1}>
            Изготовление заготовок мебельного декора на заказ
          </Reveal>
          <Reveal as="p" className="section-lead" delay={2}>
            Берём на себя нарезку и обработку деталей по чертежам заказчика —
            фабрика получает готовую заготовку нужной влажности и размера, без
            собственного раскроя и сушки.
          </Reveal>
        </div>

        <div className="cards">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal className="card" key={it.title} delay={(i % 3) as 0 | 1 | 2}>
                <div className="card__icon">
                  <Icon width={26} height={26} />
                </div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          className="card"
          delay={1}
          style={{
            marginTop: 24,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            background: "var(--cream)",
          }}
        >
          <div style={{ maxWidth: "46ch" }}>
            <h3 style={{ marginBottom: 8 }}>Есть чертёж или образец?</h3>
            <p>
              Пришлите спецификацию — рассчитаем стоимость детали и сроки. Берём
              как партии для фабрик, так и небольшие заказы для мастеров.
            </p>
          </div>
          <a className="btn btn-primary" href="#kontakty">
            Рассчитать заказ <ArrowRight width={18} height={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
