import { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: { id: string; name: string }[];
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  location: string;
  onLocationChange: (location: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  priceRange,
  onPriceRangeChange,
  location,
  onLocationChange,
  sortBy,
  onSortChange
}: SearchAndFilterProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    const filters = [];
    if (selectedCategory !== 'all') filters.push(selectedCategory);
    if (location) filters.push(`Near ${location}`);
    if (priceRange[0] > 0 || priceRange[1] < 500) {
      filters.push(`$${priceRange[0]}-$${priceRange[1]}`);
    }
    setActiveFilters(filters);
  }, [selectedCategory, location, priceRange]);

  const clearFilters = () => {
    onCategoryChange('all');
    onLocationChange('');
    onPriceRangeChange([0, 500]);
    onSortChange('newest');
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Category</h3>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Location</h3>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Enter location..."
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Price Range (per day)</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            max={500}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Sort by</h3>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {activeFilters.length > 0 && (
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for items, brands, descriptions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-border/50"
          />
        </div>
        
        {/* Desktop Filters */}
        <div className="hidden md:flex gap-2">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-48 h-12 bg-background/80 backdrop-blur-sm border-border/50">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="h-12 px-4 bg-background/80 backdrop-blur-sm border-border/50"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className="md:hidden h-12 bg-background/80 backdrop-blur-sm border-border/50"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFilters.length > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Filter & Sort</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="px-3 py-1"
            >
              {filter}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;