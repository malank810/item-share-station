import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Heart, Globe, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of sharing within local communities, creating connections that go beyond transactions.'
    },
    {
      icon: Heart,
      title: 'Trust & Safety',
      description: 'Building a platform where trust is earned through transparency, verification, and genuine community care.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Reducing waste by maximizing the use of existing items instead of encouraging unnecessary purchases.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Constantly improving our platform to make sharing easier, safer, and more rewarding for everyone.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      description: 'Former tech executive passionate about building sustainable communities through sharing economy.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Engineering',
      description: 'Full-stack developer with 10+ years building scalable platforms that connect people.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Community Manager',
      description: 'Dedicated to fostering trust and building meaningful connections within our growing community.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            About Rently
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're building the future of sharing - where communities thrive through trust, 
            sustainability, and the simple joy of helping neighbors.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              Rently was born from a simple observation: most of us own things we rarely use, 
              while constantly needing items we don't have. A power drill that sits in the garage 
              364 days a year. A camping tent used once a season. Professional camera equipment 
              gathering dust between projects.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              What if we could unlock the value in these underused items while building stronger, 
              more connected communities? That's the vision that drove us to create Rently - 
              a platform where neighbors become resources for each other.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              Since launching, we've facilitated thousands of rentals, saved countless items from 
              landfills, and helped people access tools and equipment they never could have 
              afforded to buy. But more importantly, we've watched communities grow stronger 
              as neighbors discover the joy of sharing.
            </p>
            
            <p className="text-lg leading-relaxed">
              Today, Rently continues to evolve based on feedback from our amazing community of 
              renters and lenders. Every new feature, every improvement, every decision is made 
              with one goal in mind: making it easier for people to share, connect, and thrive together.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product development to community support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind Rently, working every day to make sharing easier and communities stronger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Our Impact
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Together, our community is making a real difference.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
              <div className="text-muted-foreground">Items Shared</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8,500+</div>
              <div className="text-muted-foreground">Happy Renters</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$2.1M+</div>
              <div className="text-muted-foreground">Saved on Purchases</div>
            </div>
          </div>

          <Button 
            size="lg"
            onClick={() => navigate('/listings')}
            className="bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-hover)] text-lg px-8 py-6 font-medium"
          >
            Join Our Community
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;