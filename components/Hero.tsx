import { pathHref, site } from "@/lib/site";
import Reveal from "./Reveal";
import { ArrowRight, Check } from "./Icons";

export default function Hero() {
  return (
    <section className="hero" data-placement="hero" id="top">
      <div className="container hero__grid">
        <div>
          <Reveal as="h1" delay={1}>
            <em>Буковая доска</em> оптом для мебельного производства
          </Reveal>
          <Reveal as="p" className="hero__lead" delay={2}>
            Камерная сушка 8±2%, толщины 25 / 30 / 40 / 50 мм.
            Производство в Московской области, городской округ Щёлково. Самовывоз или доставка транспортной компанией.
          </Reveal>

          <Reveal className="hero__cta" delay={3}>
            <a className="btn btn-primary" href="#request-board">Запросить прайс и партию <ArrowRight width={18} height={18} /></a>
            <a className="btn btn-ghost" href={pathHref("/zagotovki-iz-buka/")}>Нужны детали по чертежу</a>
          </Reveal>

          <Reveal className="hero__facts" delay={4}>
            <div className="fact">
              <b>8±2%</b>
              <span>влажность камерной сушки</span>
            </div>
            <div className="fact">
              <b>25–50 мм</b>
              <span>толщины под ваши задачи</span>
            </div>
            <div className="fact">
              <b>по РФ</b>
              <span>отгрузка любой ТК</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="hero__panel" delay={2}>
          <p className="eyebrow">Бук для вашего производства</p>
          <h2>Подберём доску под ваш заказ</h2>
          <p>Получите прайс и фото подходящей партии. Напишите, какие детали вы производите — поможем с выбором размеров и сорта.</p>
          <ul>
            <li>
              <Check width={20} height={20} /> Буковая доска обрезная, сорта A / AB / B
            </li>
            <li>
              <Check width={20} height={20} /> Толщины 25 / 30 / 40 / 50 мм
            </li>
            <li>
              <Check width={20} height={20} /> Камерная сушка 8±2%
            </li>
            <li>
              <Check width={20} height={20} /> Фото партии и актуальный прайс по запросу
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
