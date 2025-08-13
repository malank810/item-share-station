import SearchBar from "./SearchBar";
import heroImage from "@/assets/hero-rental.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-[var(--gradient-accent)] rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--gradient-primary)] rounded-full blur-3xl opacity-20" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight tracking-tight">
              Rent what you need,
              <br />
              <span className="bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                when you need it
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Access premium tools and equipment without the commitment. 
              <br className="hidden md:block" />
              <span className="bg-[var(--gradient-accent)] bg-clip-text text-transparent font-medium">Local, trusted, instant.</span>
            </p>
          </div>
          
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;