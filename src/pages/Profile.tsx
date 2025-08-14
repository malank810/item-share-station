import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, MapPin, Phone, Mail, Star, Package } from 'lucide-react';

interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  location: string;
  avatar_url: string;
}

interface UserListing {
  id: string;
  title: string;
  price: number;
  is_available: boolean;
  image_url: string;
  reviews: { rating: number }[];
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userListings, setUserListings] = useState<UserListing[]>([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    location: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchUserListings();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: user.id,
              email: user.email,
              first_name: user.user_metadata?.first_name || '',
              last_name: user.user_metadata?.last_name || ''
            }
          ])
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          return;
        }

        setProfile(newProfile);
        setFormData({
          first_name: newProfile.first_name || '',
          last_name: newProfile.last_name || '',
          phone: newProfile.phone || '',
          location: newProfile.location || '',
          avatar_url: newProfile.avatar_url || ''
        });
      } else if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          location: data.location || '',
          avatar_url: data.avatar_url || ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserListings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          id,
          title,
          price,
          is_available,
          image_url,
          reviews(rating)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user listings:', error);
        return;
      }

      setUserListings(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !profile) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          location: formData.location,
          avatar_url: formData.avatar_url
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to update profile. Please try again.',
          variant: 'destructive'
        });
        return;
      }

      toast({
        title: 'Success!',
        description: 'Your profile has been updated.',
      });

      fetchProfile(); // Refresh profile data

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed Out',
      description: 'You have been successfully signed out.',
    });
  };

  if (!user) return null;

  const averageRating = userListings.length > 0 
    ? userListings.reduce((acc, listing) => {
        const listingRating = listing.reviews.length > 0 
          ? listing.reviews.reduce((sum, review) => sum + review.rating, 0) / listing.reviews.length 
          : 0;
        return acc + listingRating;
      }, 0) / userListings.length 
    : 0;

  const totalReviews = userListings.reduce((acc, listing) => acc + listing.reviews.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your account and rental listings
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile Info</TabsTrigger>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Summary */}
                <Card className="border-border/50 shadow-[var(--shadow-modern)]">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {formData.avatar_url ? (
                        <img 
                          src={formData.avatar_url} 
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-primary" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {formData.first_name || formData.last_name 
                        ? `${formData.first_name} ${formData.last_name}` 
                        : 'Your Name'}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{user.email}</p>
                    
                    <div className="space-y-2 text-sm">
                      {formData.location && (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{formData.location}</span>
                        </div>
                      )}
                      {formData.phone && (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{formData.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/50">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">{userListings.length}</div>
                          <div className="text-xs text-muted-foreground">Listings</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {averageRating > 0 ? averageRating.toFixed(1) : '—'}
                          </div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Form */}
                <Card className="lg:col-span-2 border-border/50 shadow-[var(--shadow-modern)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first_name">First Name</Label>
                          <Input
                            id="first_name"
                            value={formData.first_name}
                            onChange={(e) => handleInputChange('first_name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input
                            id="last_name"
                            value={formData.last_name}
                            onChange={(e) => handleInputChange('last_name', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email || ''}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="e.g., Seattle, WA"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="avatar_url">Profile Picture URL</Label>
                        <Input
                          id="avatar_url"
                          type="url"
                          value={formData.avatar_url}
                          onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                          placeholder="https://example.com/profile.jpg"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-hover)]"
                        disabled={loading}
                      >
                        {loading ? 'Updating...' : 'Update Profile'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="listings">
              <Card className="border-border/50 shadow-[var(--shadow-modern)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    My Listings ({userListings.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userListings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userListings.map((listing) => {
                        const averageRating = listing.reviews.length > 0 
                          ? listing.reviews.reduce((acc, review) => acc + review.rating, 0) / listing.reviews.length 
                          : 0;
                        
                        return (
                          <Card key={listing.id} className="border-border/50">
                            <div className="aspect-[4/3] bg-muted relative overflow-hidden rounded-t-lg">
                              {listing.image_url ? (
                                <img 
                                  src={listing.image_url} 
                                  alt={listing.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                  No image
                                </div>
                              )}
                              <div className="absolute top-2 right-2">
                                <Badge variant={listing.is_available ? "default" : "secondary"}>
                                  {listing.is_available ? 'Available' : 'Unavailable'}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2 line-clamp-1">{listing.title}</h4>
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">${listing.price}/day</span>
                                {averageRating > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-current" />
                                    <span>{averageRating.toFixed(1)} ({listing.reviews.length})</span>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">No listings yet</h3>
                      <p className="text-muted-foreground mb-4">Start earning by listing your first item</p>
                      <Button onClick={() => window.location.href = '/create-listing'}>
                        Create Your First Listing
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="border-border/50 shadow-[var(--shadow-modern)]">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Sign Out</h4>
                      <p className="text-sm text-muted-foreground">Sign out of your account</p>
                    </div>
                    <Button variant="outline" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;