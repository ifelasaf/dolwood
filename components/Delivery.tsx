import { pathHref } from "@/lib/site";
export default function Delivery() { return <section className="section bg-cream" id="process"><div className="container">
  <div className="section-head"><p className="eyebrow">Оплата и получение</p><h2 className="section-title">Сначала согласуем заказ</h2><p className="section-lead">До оплаты уточняем характеристики, стоимость и порядок отгрузки.</p></div>
  <div className="cards cards--2"><div className="card"><h3>Буковая доска</h3><p>Подбираем сорт, толщину, длину и объём. Подтверждаем наличие и срок отгрузки. Доска оплачивается полностью до отгрузки.</p></div>
  <div className="card"><h3>Детали и декор</h3><p>Рассчитываем заказ по чертежу или образцу. Согласуем размеры, партию и отделку. На декор — предоплата 50%; остальные условия фиксируем при согласовании заказа.</p></div></div>
  <p className="delivery-note">Самовывоз — из городского округа Щёлково по согласованию. Доставка — транспортной компанией в ваш регион.</p>
  <a className="text-link" href={pathHref("/dostavka-i-oplata/")}>Подробнее о доставке и оплате →</a>
</div></section>; }
