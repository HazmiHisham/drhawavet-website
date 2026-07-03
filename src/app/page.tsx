import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
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
        <Services tone="white" />
        <ImportantNotice tone="colored" />
        <BookingForm tone="white" />
        <Branches tone="colored" />
        <WhyChooseUs tone="white" />
        <Testimonials tone="colored" />
        <FAQ tone="white" />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
