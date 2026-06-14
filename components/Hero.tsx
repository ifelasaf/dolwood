import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { ArrowRight, Check } from "./Icons";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div>
          <Reveal as="h1" delay={1}>
            <em>Бук</em> от производителя — доска оптом и заготовки на заказ
          </Reveal>
          <Reveal as="p" className="hero__lead" delay={2}>
            Dolwood поставляет буковую доску оптом и изготавливает мебельные
            заготовки (ножки, подлокотники, царги, балясины) по вашим чертежам.
            Работаем с мебельными фабриками и мастерскими по всей России.
          </Reveal>

          <Reveal className="hero__cta" delay={3}>
            <a className="btn btn-ghost" href="#zagotovki">
              Рассчитать стоимость заготовок
            </a>
          </Reveal>

          <Reveal className="hero__facts" delay={4}>
            <div className="fact">
              <b>8–10%</b>
              <span>влажность камерной сушки</span>
            </div>
            <div className="fact">
              <b>от 1 м³</b>
              <span>минимальная партия доски</span>
            </div>
            <div className="fact">
              <b>по РФ</b>
              <span>отгрузка любой ТК</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="hero__panel" delay={2}>
          <h3>Два направления — одно производство</h3>
          <p>Сырьё и передел в одних руках: контроль качества на каждом этапе.</p>
          <ul>
            <li>
              <Check width={20} height={20} /> Буковая доска обрезная, сорта A / AB / B
            </li>
            <li>
              <Check width={20} height={20} /> Распил и нарезка деталей по чертежам
            </li>
            <li>
              <Check width={20} height={20} /> Ножки, подлокотники, царги, балясины
            </li>
            <li>
              <Check width={20} height={20} /> Мебельный щит и токарные изделия
            </li>
            <li>
              <Check width={20} height={20} /> Работаем с ИП и юрлицами
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
