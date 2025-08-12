import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              RentHub
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Simple equipment rentals.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              <Instagram className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">All items</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Photography</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tools</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Safety</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 RentHub
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;