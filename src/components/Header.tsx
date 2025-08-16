import { useState } from "react";
import { Menu, X, User, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigation = user ? [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Browse', href: '/listings' },
    { name: 'List Item', href: '/create-listing', icon: Plus }
  ] : [
    { name: 'Browse', href: '/listings' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'About', href: '/about' }
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-[var(--backdrop-blur)] border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-foreground">
              Rent<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">ly</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/profile')}
                  className="font-medium"
                >
                  <User className="h-4 w-4 mr-2" />
                  {user.user_metadata?.first_name || user.email}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="font-medium">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/auth')} className="text-muted-foreground hover:text-foreground">
                  Sign in
                </Button>
                <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground shadow-lg">
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-foreground hover:bg-accent"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
            <div className="border-t border-border pt-4 mt-4 space-y-2 flex flex-col">
              <ThemeToggle />
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start text-sm"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut} 
                    className="w-full justify-start text-sm"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate('/auth')} className="w-full justify-start text-sm">
                    <User className="mr-2 h-4 w-4" />
                    Sign in
                  </Button>
                  <Button onClick={() => navigate('/auth')} className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-sm">
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;