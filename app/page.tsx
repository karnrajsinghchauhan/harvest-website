import Header from "@/components/Header";
import { Hero, Sequence, Specimen, Capacity, Routes, Provenance } from "@/components/Sections";
import { Contact, Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sequence />
        <Specimen />
        <Capacity />
        <Routes />
        <Provenance />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
