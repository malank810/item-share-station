import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ListingsGrid from '@/components/ListingsGrid';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_url: string;
  is_available: boolean;
  categories: { name: string } | null;
  reviews: { rating: number }[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          categories(name),
          reviews(rating)
        `)
        .eq('is_available', true)
        .limit(12);

      if (error) {
        console.error('Error fetching listings:', error);
        return;
      }

      setListings(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your rentals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Search */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Welcome back, {user?.user_metadata?.first_name || 'Renter'}!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Find what you need, when you need it. Premium equipment from trusted locals.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Available Listings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Available Near You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {listings.length > 0 
                ? `${listings.length} items ready to rent in your area`
                : 'No listings available at the moment. Check back soon!'
              }
            </p>
          </div>
          
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => {
                const averageRating = listing.reviews.length > 0 
                  ? listing.reviews.reduce((acc, review) => acc + review.rating, 0) / listing.reviews.length 
                  : 0;
                
                return (
                  <div key={listing.id} className="group">
                    <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:translate-y-[-2px]">
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
                        <div className="absolute top-4 right-4">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            ${listing.price}/day
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {listing.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {listing.description || 'No description available'}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            📍 {listing.location || 'Location not specified'}
                          </span>
                          {averageRating > 0 && (
                            <span className="flex items-center text-muted-foreground">
                              ⭐ {averageRating.toFixed(1)} ({listing.reviews.length})
                            </span>
                          )}
                        </div>
                        {listing.categories?.name && (
                          <div className="mt-3">
                            <span className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                              {listing.categories.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No listings available yet.</p>
              <p className="text-sm text-muted-foreground">Be the first to list something!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;