import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface PopularListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_url: string;
  categories: { name: string } | null;
  reviews: { rating: number }[];
  averageRating: number;
  reviewCount: number;
}

const PopularListings = () => {
  const [listings, setListings] = useState<PopularListing[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularListings();
  }, []);

  const fetchPopularListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          categories(name),
          reviews(rating)
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) {
        console.error('Error fetching listings:', error);
        return;
      }

      const processedListings = data?.map(listing => {
        const avgRating = listing.reviews.length > 0 
          ? listing.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / listing.reviews.length 
          : 0;
        
        return {
          ...listing,
          averageRating: Number(avgRating.toFixed(1)),
          reviewCount: listing.reviews.length
        };
      }).sort((a, b) => b.averageRating - a.averageRating) || [];

      setListings(processedListings);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Popular in Your Area
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the most-rented items from your local community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Popular in Your Area
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most-rented items from your local community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {listings.map((listing) => (
            <Card key={listing.id} className="group cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)] border-border/50 bg-[var(--gradient-card)] backdrop-blur-sm overflow-hidden hover:scale-[1.02]">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                {listing.image_url ? (
                  <img 
                    src={listing.image_url} 
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground shadow-lg">
                    ${listing.price}/day
                  </Badge>
                </div>
                {listing.categories?.name && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline" className="text-xs backdrop-blur-sm bg-background/90 border-border/50 text-foreground shadow-lg">
                      {listing.categories.name}
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-foreground group-hover:bg-[var(--gradient-primary)] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-1">
                    {listing.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="line-clamp-1">{listing.location || 'Location not specified'}</span>
                    </div>
                    {listing.reviewCount > 0 && (
                      <div className="flex items-center text-muted-foreground">
                        <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                        <span>{listing.averageRating} ({listing.reviewCount})</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    className="w-full bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-hover)]"
                    onClick={() => navigate(`/listing/${listing.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/listings')}
            className="text-lg px-8 py-6 font-medium border-2 hover:bg-accent/10"
          >
            View All Listings
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularListings;