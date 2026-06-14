import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Wholesale from "@/components/Wholesale";
import Blanks from "@/components/Blanks";
import Advantages from "@/components/Advantages";
import Process from "@/components/Process";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import ContactMenu from "@/components/ContactMenu";
import ScrollTop from "@/components/ScrollTop";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Wholesale />
        <Blanks />
        <Advantages />
        <Process />
        <Contacts />
      </main>
      <Footer />

      {/* плавающие кнопки: наверх + связаться */}
      <ScrollTop />
      <ContactMenu variant="fab" />
    </>
  );
}
