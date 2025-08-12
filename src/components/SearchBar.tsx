import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-[var(--search-shadow)] border border-border p-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="What do you need?"
              className="pl-12 h-12 border-0 bg-transparent focus-visible:ring-0 text-base"
            />
          </div>
          
          <div className="relative md:border-l border-border">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Location"
              className="pl-12 h-12 border-0 bg-transparent focus-visible:ring-0 text-base"
            />
          </div>
          
          <div className="flex">
            <Button size="lg" className="h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;