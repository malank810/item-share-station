import { useEffect, useState } from "react";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ListingPreview {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  category: string;
}

const sampleListings: ListingPreview[] = [
  {
    id: "1",
    title: "Professional DSLR Camera",
    image: "/src/assets/camera-rental.jpg",
    price: 45,
    rating: 4.8,
    location: "Downtown",
    category: "Photography"
  },
  {
    id: "2",
    title: "Power Drill Set",
    image: "/src/assets/drill-rental.jpg",
    price: 25,
    rating: 4.6,
    location: "Midtown",
    category: "Tools"
  },
  {
    id: "3",
    title: "4-Person Camping Tent",
    image: "/src/assets/tent-rental.jpg",
    price: 35,
    rating: 4.9,
    location: "Suburbs",
    category: "Outdoor"
  }
];

const AnimatedListingsPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sampleListings.length);
        setIsAnimating(false);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentListing = sampleListings[currentIndex];

  return (
    <div className="relative">
      <div className="aspect-square rounded-3xl overflow-hidden shadow-[var(--shadow-modern)] border border-border/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          <Card className="h-full border-0 bg-transparent">
            <CardContent className="p-0 h-full">
              <div className="relative h-2/3 overflow-hidden">
                <img 
                  src={currentListing.image} 
                  alt={currentListing.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground border-border/50 shadow-lg">
                    {currentListing.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 space-y-3 bg-background/95 backdrop-blur-sm">
                <h3 className="font-semibold text-lg text-foreground">
                  {currentListing.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {currentListing.location}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{currentListing.rating}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                      ${currentListing.price}
                    </div>
                    <div className="text-xs text-muted-foreground">per day</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {sampleListings.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary shadow-[var(--shadow-accent)]' 
                : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedListingsPreview;