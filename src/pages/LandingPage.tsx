import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Shield, Clock, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedListingsPreview from '@/components/AnimatedListingsPreview';
import PopularListings from '@/components/PopularListings';
import CategoriesSection from '@/components/CategoriesSection';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Verified Listings',
      description: 'Browse carefully vetted listings from your local community.'
    },
    {
      icon: Clock,
      title: 'Instant Booking',
      description: 'Book items instantly and get confirmation within minutes.'
    },
    {
      icon: Star,
      title: 'Community Ratings',
      description: 'Make informed decisions with reviews from real renters.'
    },
    {
      icon: Users,
      title: 'Local Network',
      description: 'Connect with neighbors and build lasting rental relationships.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '5K+', label: 'Items Listed' },
    { number: '50+', label: 'Cities' },
    { number: '25K+', label: 'Successful Rentals' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Rently
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                onClick={() => navigate('/how-it-works')}
                className="font-medium"
              >
                How It Works
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth')}
                className="font-medium"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-hover)] font-medium"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                Rent Anything,
                <br />
                From Anyone
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                Connect with your local community to rent items from trusted neighbors. 
                From cameras to tools, discover what's available near you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  onClick={() => navigate('/auth')}
                  className="bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-hover)] text-lg px-8 py-6 font-medium"
                >
                  Start Renting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/listings')}
                  className="text-lg px-8 py-6 font-medium border-2 hover:bg-accent/10"
                >
                  Browse Listings
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <AnimatedListingsPreview />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border/50 rounded-2xl p-4 shadow-[var(--shadow-modern)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Community Verified</p>
                    <p className="text-xs text-muted-foreground">Real Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Popular Listings Section */}
      <PopularListings />

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Choose Our Marketplace?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of people using our platform to find what they need. 
              Experience the future of sharing economy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our marketplace today and discover the convenience of renting from people nearby.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-hover)] text-lg px-8 py-6 font-medium"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Rently
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Connecting people through shared resources and trusted rental experiences.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 Rently. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;