import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Wrench, Tent, Dumbbell, Smartphone, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  listingCount: number;
}

const iconMap = {
  camera: Camera,
  wrench: Wrench,
  tent: Tent,
  dumbbell: Dumbbell,
  smartphone: Smartphone,
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          listings!category_id(count)
        `)
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      const processedCategories = data?.map(category => ({
        ...category,
        listingCount: category.listings?.length || 0
      })) || [];

      setCategories(processedCategories);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/listings?category=${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Browse by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you need from our community marketplace
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-2xl mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need from our community marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Camera;
            
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)] border-border/50 bg-[var(--gradient-card)] backdrop-blur-sm overflow-hidden hover:scale-[1.02]"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:bg-[var(--gradient-primary)] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="text-xs text-primary font-medium">
                    {category.listingCount} {category.listingCount === 1 ? 'item' : 'items'} available
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/listings')}
            className="text-lg px-8 py-6 font-medium border-2 hover:bg-accent/10"
          >
            View All Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;