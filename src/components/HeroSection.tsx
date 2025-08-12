import SearchBar from "./SearchBar";
import heroImage from "@/assets/hero-rental.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[var(--hero-overlay)]" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Rent Anything,
              <br />
              <span className="text-secondary">Anytime</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Access the tools, equipment, and gear you need without the commitment of buying. 
              From cameras to camping gear, find everything for your next project or adventure.
            </p>
          </div>
          
          <SearchBar />
          
          <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Verified owners</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Instant booking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Secure payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;