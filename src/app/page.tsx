import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Hero from "@/components/hero/Hero";
import Areas from "@/components/sections/Areas";
import Footer from "@/components/sections/Footer";
import Method from "@/components/sections/Method";
import Story from "@/components/sections/Story";
import Studio from "@/components/sections/Studio";
import Voices from "@/components/sections/Voices";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Areas />
        <Method />
        <Story />
        <Voices />
        <Studio />
      </main>
      <Footer />
      <Preloader />
    </>
  );
}
