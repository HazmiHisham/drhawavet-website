import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { OurClients } from "@/components/OurClients";
import { ImportantNotice } from "@/components/ImportantNotice";
import { BookingForm } from "@/components/BookingForm";
import { Branches } from "@/components/Branches";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BackToTop } from "@/components/BackToTop";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About tone="colored" />
        <OurClients tone="white" />
        <Services tone="colored" />
        <ImportantNotice tone="white" />
        <BookingForm tone="colored" />
        <Branches tone="white" />
        <WhyChooseUs tone="colored" />
        <Testimonials tone="white" />
        <FAQ tone="colored" />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
