import Reveal from "./Reveal";
import { Shield, Ruble, Gauge, Truck, Handshake, Drop } from "./Icons";

const features = [
  {
    icon: Shield,
    title: "Отечественный бук",
    text: "Бук без импортных рисков — стабильное снабжение и цена.",
  },
  {
    icon: Ruble,
    title: "Прозрачные цены",
    text: "Публичный прайс на доску и расчёт заготовок по чертежу — без «уточняйте».",
  },
  {
    icon: Drop,
    title: "Камерная сушка",
    text: "Влажность 8±2% под контролем — деталь не ведёт и не трескается.",
  },
  {
    icon: Gauge,
    title: "Точность партии",
    text: "Повторяемость геометрии на токарных станках и ЧПУ-фрезеровке.",
  },
  {
    icon: Truck,
    title: "Доставка по России",
    text: "Самовывоз из Щёлково или отгрузка любой транспортной компанией.",
  },
  {
    icon: Handshake,
    title: "Работаем по безналу",
    text: "ИП и юрлица, документы и предоплата 50% — удобно для фабрик.",
  },
];

export default function Advantages() {
  return (
    <section className="section bg-cream" id="preimushchestva">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal as="p" className="eyebrow">
            Почему Dolwood
          </Reveal>
          <Reveal as="h2" className="section-title" delay={1}>
            Преимущества для вашего производства
          </Reveal>
        </div>

        <div className="cards">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal className="feature" key={f.title} delay={(i % 3) as 0 | 1 | 2}>
                <div className="feature__icon">
                  <Icon width={24} height={24} />
                </div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
