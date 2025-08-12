import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ListingsGrid from "@/components/ListingsGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ListingsGrid />
      <Footer />
    </div>
  );
};

export default Index;
