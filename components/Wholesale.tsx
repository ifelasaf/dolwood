import Reveal from "./Reveal";
import { Plank, Drop, ArrowRight } from "./Icons";

const products = [
  {
    icon: Plank,
    title: "Доска обрезная",
    text: "Буковая доска камерной сушки. Толщины 30 / 40 / 50 мм, длина до 3 м.",
    list: ["Сорта A / AB / B", "Влажность 8±2%", "Под распил и мебель"],
  },
  {
    icon: Drop,
    title: "Сушка и сортировка",
    text: "Контроль влажности и отбор по сорту. Подбор доски по сорту и размерам.",
    list: ["Камерная сушка", "Отбор по сорту/длине", "Паллетирование под ТК"],
  },
];

export default function Wholesale() {
  return (
    <section className="section bg-eggshell" id="opt" data-placement="wholesale">
      <div className="container">
        <div className="section-head">
          <Reveal as="h2" className="section-title" delay={1}>
            Оптовые продажи буковой доски
          </Reveal>
          <Reveal as="p" className="section-lead" delay={2}>
            Подберём сорт и размеры буковой доски для вашего производства.
            Самовывоз из Щёлково или доставка вашей транспортной компанией в
            любой регион.
          </Reveal>
        </div>

        <div className="cards cards--2" style={{ marginBottom: 22 }}>
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
            <p>Пришлём актуальный прайс и фото доски под ваш запрос.</p>
            <details className="price-details"><summary>Посмотреть цены и условия</summary>
              <div className="price-row"><span>Партия от 1 до менее 10 м³</span><b>73 000 ₽/м³</b></div>
              <div className="price-row"><span>Партия от 10 м³</span><b>68 000 ₽/м³</b></div>
              <p className="note">Цена по сорту и размерам — в предложении. Минимальная партия — 1 м³.</p>
            </details>
            <a className="btn btn-primary" href="#request-board" style={{ marginTop: 22 }}>
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
              <li>Столярным мастерским — буковая доска под проекты</li>
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
