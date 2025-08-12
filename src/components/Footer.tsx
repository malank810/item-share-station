import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Rent<span className="text-secondary">Hub</span>
            </h3>
            <p className="text-background/70 leading-relaxed">
              The trusted marketplace for renting anything you need. Safe, secure, and convenient.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-background/70 hover:text-secondary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-background/70 hover:text-secondary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-background/70 hover:text-secondary cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-background/70 hover:text-secondary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">Browse Items</a></li>
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">List Your Item</a></li>
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">How It Works</a></li>
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">Safety</a></li>
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">Report Issue</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-background/70 hover:text-secondary transition-colors">Trust & Safety</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/70">
            © 2024 RentHub. All rights reserved. Built with ❤️ for the sharing economy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;