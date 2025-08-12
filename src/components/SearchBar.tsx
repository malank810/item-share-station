import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card backdrop-blur-md rounded-2xl shadow-[var(--shadow-modern)] border border-border/50 p-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="What do you need?"
              className="pl-12 h-14 border-0 bg-transparent focus-visible:ring-2 focus-visible:ring-primary/20 text-base placeholder:text-muted-foreground/70"
            />
          </div>
          
          <div className="relative md:border-l border-border/30">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Location"
              className="pl-12 h-14 border-0 bg-transparent focus-visible:ring-2 focus-visible:ring-primary/20 text-base placeholder:text-muted-foreground/70"
            />
          </div>
          
          <div className="flex">
            <Button size="lg" className="h-14 w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;