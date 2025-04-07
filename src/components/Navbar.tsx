
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const location = useLocation();

  return (
    <nav className="sticky top-0 w-full bg-white border-b border-gray-200 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-jumia-orange to-jumia-blue bg-clip-text text-transparent">
              BasketBliss
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" icon={<Home size={18} />} label="Home" currentPath={location.pathname} />
            <NavLink to="/products" icon={<Package size={18} />} label="Products" currentPath={location.pathname} />
            <NavLink to="/new-product" icon={<Plus size={18} />} label="New Product" currentPath={location.pathname} />
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-6 w-6 text-jumia-dark" />
              {itemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-jumia-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {itemCount > 99 ? "99+" : itemCount}
                </div>
              )}
            </Button>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="outline" size="icon" className="mr-2">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile navigation links */}
        <div className="md:hidden flex justify-center pt-2 pb-1 space-x-4 border-t mt-2">
          <MobileNavLink to="/" icon={<Home size={16} />} label="Home" />
          <MobileNavLink to="/products" icon={<Package size={16} />} label="Products" />
          <MobileNavLink to="/new-product" icon={<Plus size={16} />} label="New" />
        </div>
      </div>
    </nav>
  );
};

// Helper component for desktop nav links
interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, currentPath }) => {
  const isActive = currentPath === to || (to !== "/" && currentPath.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 py-2 px-1 border-b-2 transition-colors ${
        isActive
          ? "border-jumia-orange text-jumia-orange"
          : "border-transparent hover:border-gray-300 text-gray-600 hover:text-jumia-dark"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

// Helper component for mobile nav links
interface MobileNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex flex-col items-center space-y-1 text-gray-600 hover:text-jumia-orange"
  >
    <span>{icon}</span>
    <span className="text-xs">{label}</span>
  </Link>
);

export default Navbar;
