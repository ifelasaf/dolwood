import Reveal from "./Reveal";

const steps = [
  { n: "01", t: "Заявка", d: "Оставляете заявку или присылаете чертёж / спецификацию." },
  { n: "02", t: "Расчёт и КП", d: "Считаем объём, цену и сроки, согласуем детали." },
  { n: "03", t: "Предоплата 50%", d: "Запускаем в работу после предоплаты, по договору." },
  { n: "04", t: "Производство", d: "Пилим, сушим, режем деталь с контролем качества." },
  { n: "05", t: "Отгрузка", d: "Самовывоз из Щёлково или отправка вашей ТК по РФ." },
];

export default function Process() {
  return (
    <section className="section bg-eggshell" id="process">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal as="p" className="eyebrow">
            Как мы работаем
          </Reveal>
          <Reveal as="h2" className="section-title" delay={1}>
            От заявки до отгрузки — 5 шагов
          </Reveal>
        </div>

        <div className="steps">
          {steps.map((s, i) => (
            <Reveal className="step" key={s.n} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="step__num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
