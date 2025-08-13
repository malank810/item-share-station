import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-background/80 backdrop-blur-md rounded-2xl shadow-[var(--shadow-modern)] border border-border/50 p-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="What do you need?"
              className="pl-12 h-14 border-0 bg-transparent focus-visible:ring-2 focus-visible:ring-primary/20 text-base placeholder:text-muted-foreground/70 hover:bg-accent/20 transition-colors"
            />
          </div>
          
          <div className="relative md:border-l border-border/30">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Location"
              className="pl-12 h-14 border-0 bg-transparent focus-visible:ring-2 focus-visible:ring-primary/20 text-base placeholder:text-muted-foreground/70 hover:bg-accent/20 transition-colors"
            />
          </div>
          
          <div className="flex">
            <Button size="lg" className="h-14 w-full bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-hover)] text-primary-foreground font-medium shadow-lg transition-all duration-300 hover:scale-[1.02] border-0">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;