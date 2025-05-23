import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import NewsCarousel from "@/components/home/News-carousel";


export default function Home() {
  return (
    <div >
      <Header />
      <Hero />
      <NewsCarousel />
      <Footer />
    </div>
  );
}
