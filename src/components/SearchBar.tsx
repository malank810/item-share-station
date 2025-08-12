import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-[var(--search-shadow)] p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">What do you need?</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Camera, tools, equipment..."
              className="pl-10 h-12 border-border focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="City or ZIP code"
              className="pl-10 h-12 border-border focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Rental dates</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Select dates"
              className="pl-10 h-12 border-border focus:ring-primary"
            />
          </div>
        </div>
        
        <Button size="lg" className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;