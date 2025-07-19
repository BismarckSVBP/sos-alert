
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import ThemeToggle from "./ThemeToggle";
import { useToast } from "@/hooks/use-toast.js";
import axios from "axios";
import { API_BASE_URL,ADMIN_EMAIL } from "@/config";
import { useAuthStore } from "../store/authStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { logout, user, isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout(); // Clears cookies + Zustand store
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      navigate("/");
      setIsMenuOpen(false);
    } catch (err) {
      toast({
        title: "Logout Failed",
        description: "Something went wrong while logging out.",
        variant: "destructive",
      });
    }
  };
  const admin = () => {
    const isAdmin =
      user?.email?.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();

    return isAdmin;
  };
  // console.log("hbhbh", sosDetails);
  // useEffect(() => {
  //   if (!user?.email) return;

  //   const fetchSosDetails = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/getSosDetails`, {
  //         params: { email: user.email },
  //       });
  //       setSosDetails(response.data || null);
  //     } catch (error) {
  //       console.error("Error fetching SOS details:", error);
  //       setSosDetails(null);
  //     }
  //   };

  //   fetchSosDetails();
  // }, [user?.email]);

  // const sosPath = sosDetails ? "/update-sos-details" : "/sos-details-form";
  // const sosLabel = sosDetails ? "Update SOS Details" : "Fill SOS Details";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    ...(isAuthenticated
      ? [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/sos-details", label: "SOS Details" },
              { to: "/sharing-email", label: "Share L&M" },
          
        ]
      : []),
    ...(admin() ? [{ to: "/admin-panel", label: "Admin" }] : []),

  ];

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-red-600 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">SOS Alert</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors ${
                location.pathname === link.to
                  ? "text-red-600 font-medium"
                  : "text-muted-foreground hover:text-red-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name || "User"}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-2 transition-colors ${
                  location.pathname === link.to
                    ? "text-red-600 font-medium"
                    : "text-muted-foreground hover:text-red-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="pt-4 border-t space-y-2">
                <p className="text-sm text-muted-foreground">
                  Welcome, {user?.name || "User"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 w-full"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
