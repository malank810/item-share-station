import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search, MessageCircle, CreditCard, Star, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: 'Browse & Search',
      description: 'Find exactly what you need from thousands of items in your local area.',
      details: 'Use our powerful search and filter tools to discover cameras, tools, outdoor gear, and much more.'
    },
    {
      icon: MessageCircle,
      title: 'Connect & Chat',
      description: 'Message item owners directly to ask questions and arrange pickup.',
      details: 'Our built-in messaging system makes it easy to communicate with owners and coordinate details.'
    },
    {
      icon: CreditCard,
      title: 'Book & Pay Securely',
      description: 'Complete your booking with secure payment processing.',
      details: 'Your payment is protected until you confirm receipt of the item. Easy cancellation policies.'
    },
    {
      icon: Star,
      title: 'Rent & Review',
      description: 'Enjoy your rental and leave a review to help the community.',
      details: 'Rate your experience to help other renters make informed decisions.'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Verified Community',
      description: 'All users are verified for your safety and peace of mind.'
    },
    {
      icon: Clock,
      title: 'Flexible Rentals',
      description: 'Rent for hours, days, or weeks - whatever works for you.'
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'Items are reviewed and rated by the community.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            How Rently Works
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Renting has never been easier. Follow these simple steps to access thousands of items in your community.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/listings')}
            className="bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-hover)] text-lg px-8 py-6 font-medium"
          >
            Start Browsing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Simple Steps to Rent
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started is easy. Follow these four steps to rent your first item.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative border-border/50 hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {step.description}
                  </p>
                  <p className="text-xs text-muted-foreground/80">
                    {step.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Choose Rently?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who trust Rently for their rental needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">How do I know items are safe to rent?</h3>
                <p className="text-muted-foreground">
                  All users on Rently are verified, and each item listing includes photos and detailed descriptions. 
                  Our review system helps you make informed decisions based on other renters' experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">What if an item gets damaged during my rental?</h3>
                <p className="text-muted-foreground">
                  Normal wear and tear is expected, but if significant damage occurs, you'll work directly with the 
                  item owner to resolve the issue. We recommend discussing damage policies before renting.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">How do I pick up and return items?</h3>
                <p className="text-muted-foreground">
                  Pickup and return arrangements are made directly with the item owner through our messaging system. 
                  Most owners offer flexible pickup times and locations within their area.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Can I cancel my booking?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel bookings according to the owner's cancellation policy. Most owners offer 
                  free cancellation up to 24 hours before the rental start time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community today and discover the convenience of renting from trusted neighbors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/listings')}
              className="bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-hover)] text-lg px-8 py-6 font-medium"
            >
              Browse Items
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-6 font-medium border-2 hover:bg-accent/10"
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;