import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ListingCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  location: string;
  category: string;
  isAvailable: boolean;
}

const ListingCard = ({ 
  title, 
  image, 
  price, 
  rating, 
  reviewCount, 
  location, 
  category,
  isAvailable 
}: ListingCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)] border-border/50 bg-[var(--gradient-card)] backdrop-blur-sm overflow-hidden hover:scale-[1.02]">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <Badge 
              variant={isAvailable ? "secondary" : "destructive"} 
              className={`text-xs backdrop-blur-sm ${isAvailable ? 'bg-accent/90 text-foreground border-accent' : 'bg-destructive/90 text-destructive-foreground'} shadow-[var(--shadow-accent)]`}
            >
              {isAvailable ? "Available" : "Booked"}
            </Badge>
          </div>
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className="text-xs backdrop-blur-sm bg-background/90 border-border/50 text-foreground shadow-lg">
              {category}
            </Badge>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:bg-[var(--gradient-primary)] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {title}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">${price}</div>
              <div className="text-xs text-muted-foreground">per day</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;