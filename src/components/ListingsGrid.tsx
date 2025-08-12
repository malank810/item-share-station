import ListingCard from "./ListingCard";
import cameraImage from "@/assets/camera-rental.jpg";
import drillImage from "@/assets/drill-rental.jpg";
import tentImage from "@/assets/tent-rental.jpg";

const mockListings = [
  {
    id: "1",
    title: "Professional DSLR Camera Kit",
    image: cameraImage,
    price: 45,
    rating: 4.8,
    reviewCount: 24,
    location: "San Francisco, CA",
    category: "Photography",
    isAvailable: true
  },
  {
    id: "2", 
    title: "Professional Power Drill Set",
    image: drillImage,
    price: 25,
    rating: 4.6,
    reviewCount: 18,
    location: "Austin, TX",
    category: "Tools",
    isAvailable: true
  },
  {
    id: "3",
    title: "4-Person Camping Tent",
    image: tentImage,
    price: 35,
    rating: 4.9,
    reviewCount: 31,
    location: "Denver, CO", 
    category: "Outdoor",
    isAvailable: false
  },
  {
    id: "4",
    title: "Professional DSLR Camera Kit",
    image: cameraImage,
    price: 50,
    rating: 4.7,
    reviewCount: 15,
    location: "Seattle, WA",
    category: "Photography",
    isAvailable: true
  },
  {
    id: "5",
    title: "Heavy Duty Power Tools",
    image: drillImage,
    price: 30,
    rating: 4.5,
    reviewCount: 22,
    location: "Portland, OR",
    category: "Tools",
    isAvailable: true
  },
  {
    id: "6",
    title: "Family Camping Gear",
    image: tentImage,
    price: 40,
    rating: 4.8,
    reviewCount: 28,
    location: "Boulder, CO",
    category: "Outdoor",
    isAvailable: true
  }
];

const ListingsGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Popular near you
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium equipment people are renting in your area. All verified and ready to go.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockListings.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListingsGrid;