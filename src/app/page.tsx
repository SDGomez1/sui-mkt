import Features from "@/components/homePage/Features";
import Footer from "@/components/homePage/Footer";
import FreeTrialForm from "@/components/homePage/freeTrialForm";
import Hero from "@/components/homePage/Hero";
import Navbar from "@/components/homePage/Navbar";
import PainPoint from "@/components/homePage/PainPoint";
import Trial7Days from "@/components/homePage/Trial7Days";

export default function Home() {
  return (
    <section className=" max-w-vw overflow-x-hidden">
      <Navbar />
      <Hero />
      <PainPoint />
      <Features />
      <Trial7Days />
      <FreeTrialForm />
      <Footer />
    </section>
  );
}
