import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
}

interface MapViewProps {
  listings: Listing[];
  onListingSelect: (listing: Listing) => void;
}

const MapView = ({ listings, onListingSelect }: MapViewProps) => {
  const [mapboxToken, setMapboxToken] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Geolocation error:", error);
        }
      );
    }
  }, []);

  const handleTokenSubmit = () => {
    if (mapboxToken) {
      // Initialize Mapbox with token
      localStorage.setItem("mapbox_token", mapboxToken);
      // Reload to initialize map
      window.location.reload();
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10;
  };

  // Simple map placeholder - would integrate with Mapbox in production
  return (
    <div className="space-y-4">
      {!localStorage.getItem("mapbox_token") && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Setup Map View</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Enter your Mapbox public token to enable map functionality.
              Get yours at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSI..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <Button onClick={handleTokenSubmit}>Setup</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Map placeholder */}
        <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Interactive Map</p>
            <p className="text-sm text-muted-foreground">
              {userLocation ? `Your location: ${userLocation.lat.toFixed(2)}, ${userLocation.lng.toFixed(2)}` : "Getting your location..."}
            </p>
          </div>
        </div>

        {/* Listings with distance */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Nearby Listings
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {listings
              .filter(listing => listing.latitude && listing.longitude)
              .map((listing) => {
                const distance = userLocation && listing.latitude && listing.longitude
                  ? calculateDistance(userLocation.lat, userLocation.lng, listing.latitude, listing.longitude)
                  : null;

                return (
                  <Card 
                    key={listing.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setSelectedListing(listing);
                      onListingSelect(listing);
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        {listing.image_url && (
                          <img 
                            src={listing.image_url} 
                            alt={listing.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{listing.title}</h4>
                          <p className="text-xs text-muted-foreground">{listing.location}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="font-semibold text-sm">${listing.price}/day</span>
                            {distance && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {distance} km away
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;