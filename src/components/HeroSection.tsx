import SearchBar from "./SearchBar";
import heroImage from "@/assets/hero-rental.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[var(--hero-gradient)]" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
              Rent what you need,
              <br />
              <span className="font-normal">when you need it</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              Access tools and equipment without buying. Simple, trusted, local.
            </p>
          </div>
          
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;