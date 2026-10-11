import PageIntro from "@/components/PageIntro";
import Wholesale from "@/components/Wholesale";
import RequestComposer from "@/components/RequestComposer";
import Contacts from "@/components/Contacts";
import { pageMetadata } from "@/lib/seo";
import { pathHref } from "@/lib/site";
export const metadata = pageMetadata("Буковая доска камерной сушки оптом: цены и размеры | Dolwood", "Купить буковую доску оптом в Щёлково, Московская область. Влажность 8±2%, сорта A/AB/B, толщины 30–50 мм. Прайс, подбор партии, самовывоз и доставка ТК.", "/bukovaya-doska/");
export default function Page() { return <main id="main-content"><PageIntro title="Буковая доска камерной сушки оптом" label="Буковая доска" path="/bukovaya-doska/" description="Для мебельных фабрик, производителей мебели и столярных мастерских. Подбираем партию под вашу спецификацию: толщину, сорт, длину и объём." /><Wholesale />
<section className="section bg-cream"><div className="container"><h2 className="section-title">Как выбрать доску под производство</h2><div className="cards cards--2"><div className="card"><h3>Согласуйте полезный размер</h3><p>Укажите размер будущей детали и припуски на обработку. Толщина доски — 30, 40 или 50 мм; длина до 3 м. Если нужен определённый диапазон ширины или длины, добавьте его в запрос.</p></div><div className="card"><h3>Опишите требования к сорту</h3><p>Для видимых деталей и внутренних элементов могут требоваться разные характеристики. Укажите назначение доски — поможем подобрать сорт A / AB / B под ваши детали.</p></div></div><p className="delivery-note">Получите фото партии, прайс и информацию об отгрузке в одном запросе.</p><a className="text-link" href={pathHref("/dostavka-i-oplata/")}>Условия оплаты и доставки →</a></div></section><RequestComposer /><Contacts /></main>; }
