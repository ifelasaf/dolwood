import Reveal from "./Reveal";
import { Plank, Panel, Drop, ArrowRight } from "./Icons";

const products = [
  {
    icon: Plank,
    title: "Доска обрезная",
    text: "Буковая доска камерной сушки. Толщины 25 / 32 / 40 / 50 мм, длина до 3 м.",
    list: ["Сорта A / AB / B", "Влажность 8–10%", "Под распил и мебель"],
  },
  {
    icon: Panel,
    title: "Мебельный щит",
    text: "Цельноламельный и сращённый щит из бука под столешницы, фасады, ступени.",
    list: ["Любые размеры под заказ", "Шлифованный", "Для фабрик и мастеров"],
  },
  {
    icon: Drop,
    title: "Сушка и сортировка",
    text: "Контроль влажности и отбор по сорту. Доска приходит стабильной по партии.",
    list: ["Камерная сушка", "Отбор по сорту/длине", "Паллетирование под ТК"],
  },
];

export default function Wholesale() {
  return (
    <section className="section bg-eggshell" id="opt">
      <div className="container">
        <div className="section-head">
          <Reveal as="h2" className="section-title" delay={1}>
            Оптовые продажи буковой доски
          </Reveal>
          <Reveal as="p" className="section-lead" delay={2}>
            Прозрачные цены за кубометр, отгрузка от 1 м³ и градация для опта.
            Самовывоз из Щёлково или доставка вашей транспортной компанией в
            любой регион.
          </Reveal>
        </div>

        <div className="cards" style={{ marginBottom: 22 }}>
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal className="card" key={p.title} delay={(i % 3) as 0 | 1 | 2}>
                <div className="card__icon">
                  <Icon width={26} height={26} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <ul className="card__list">
                  {p.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="cards cards--2" delay={1}>
          <div className="card">
            <h3>Цены на буковую доску</h3>
            <div style={{ marginTop: 18 }}>
              <div className="price-row">
                <span>Доска бук, сухая · до 10 м³</span>
                <b>70 000 ₽/м³</b>
              </div>
              <div className="price-row">
                <span>Доска бук, сухая · от 10 м³</span>
                <b>65 000 ₽/м³</b>
              </div>
              <div className="price-row">
                <span>Минимальная партия</span>
                <b>от 1 м³</b>
              </div>
              <div className="price-row">
                <span>Условия оплаты</span>
                <b>предоплата 50%</b>
              </div>
            </div>
            <p className="note">
              Точная цена зависит от сорта, толщины и длины. Пришлём актуальный
              прайс и фото партии под ваш объём.
            </p>
            <a className="btn btn-primary" href="#kontakty" style={{ marginTop: 22 }}>
              Запросить прайс <ArrowRight width={18} height={18} />
            </a>
          </div>

          <div
            className="card"
            style={{
              background: "linear-gradient(155deg, var(--linen-soft), var(--linen))",
              borderColor: "transparent",
            }}
          >
            <h3>Кому подходит</h3>
            <ul className="card__list" style={{ marginTop: 16 }}>
              <li>Мебельным фабрикам — стабильное сырьё под производство</li>
              <li>Столярным мастерским — доска и щит под проекты</li>
              <li>Производителям лестниц, дверей, столешниц</li>
              <li>Изготовителям массивной мебели и декора</li>
            </ul>
            <p className="note">
              Работаем с ИП и юридическими лицами, отгрузка по безналичному
              расчёту с документами.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
