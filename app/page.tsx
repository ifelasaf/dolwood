import Hero from "@/components/Hero";
import About from "@/components/About";
import Wholesale from "@/components/Wholesale";
import Blanks from "@/components/Blanks";
import Delivery from "@/components/Delivery";
import Faq from "@/components/Faq";
import Contacts from "@/components/Contacts";
import RequestComposer from "@/components/RequestComposer";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Буковая доска оптом от производителя в Щёлково | Dolwood", "Буковая доска камерной сушки 8±2% в Московской области. Толщины 25, 30, 40, 50 мм. Прайс и фото партии по запросу. Заготовки из бука по чертежам, доставка ТК.");
export default function Home() { return <main id="main-content"><Hero /><Wholesale /><RequestComposer /><Blanks /><RequestComposer kind="parts" /><About /><Faq /><Contacts /></main>; }
