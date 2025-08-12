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
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-[var(--card-hover-shadow)] border-border/50">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={isAvailable ? "secondary" : "destructive"} className="text-xs">
              {isAvailable ? "Available" : "Booked"}
            </Badge>
          </div>
        </div>
        
        <div className="p-5 space-y-3">
          <div className="space-y-1">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1" />
              {location}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-current text-yellow-500" />
              <span className="text-sm">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium text-foreground">${price}</div>
              <div className="text-xs text-muted-foreground">per day</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;