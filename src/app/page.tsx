import { Contact } from "@/components/sections/Contact";
import { Explore } from "@/components/sections/Explore";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";

/**
 * Ana sayfa bir vitrin; her başlığın ayrıca kendi route'u var.
 *
 * Bölüm tonları bilinçli bir ritim izliyor:
 * hero(ızgara) → raised → tinted → plain → contrast → plain → plain
 * Ardışık iki bölüm aynı tonu almıyor.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Process />
      <TechStack />
      <Explore />
      <Contact />
    </>
  );
}
