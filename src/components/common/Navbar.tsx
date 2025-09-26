import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button কম্পোনেন্ট
import { cn } from "@/lib/utils"; // cn ইউটিলিটি ফাংশন

const Navbar = () => {
  // ডেস্কটপ নেভিগেশন লিঙ্কের জন্য স্টাইল
  const baseNavStyles =
    "relative text-slate-700 hover:text-red-600 transition-all duration-300 font-medium group px-4 py-2 rounded-lg";
  const activeNavStyles = "text-red-600 bg-red-100/70";

  // মোবাইল নেভিগেশন লিঙ্কের জন্য স্টাইল
  const baseMobileNavStyles =
    "text-slate-700 hover:text-red-600 transition-all duration-300 font-medium px-6 py-3 rounded-lg border-l-2 border-transparent hover:border-red-500 hover:bg-red-50/50 hover:translate-x-1";
  const activeMobileNavStyles = "text-red-600 bg-red-50/80 border-red-500";

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "", label: "হোমপেজ" },
    { href: "/find-blood-donner-page", label: "রক্তদাতা খুঁজুন" },
    { href: "/become-a-donor-page", label: "রক্তদান করুন" },
    { href: "/about-page", label: "আমাদের সম্পর্কে" },
    { href: "/contact-page", label: "যোগাযোগ" },
    // { href: "/dashboard-page", label: "User Donor Dashboard" },
    // { href: "/admin-dashboard-page", label: "Admin Dashboard" },
       { href: "/dashboard/user", label: "ড্যাশবোর্ড" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        "bg-white/80 backdrop-blur-lg border-b border-red-100",
        isScrolled && "shadow-sm", // স্ক্রল করলে হালকা shadow যোগ হবে
        "animate-in fade-in slide-in-from-top-4 duration-500" // লোডিং অ্যানিমেশন
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-red-500/30">
                <Heart className="w-7 h-7 text-white animate-pulse group-hover:animate-bounce" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-800 transition-all duration-500 group-hover:text-red-600">
                Rokto Share
              </span>
              <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-1">
                জীবন বাঁচান, আশা জাগান
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    baseNavStyles,
                    "hover:scale-105",
                    isActive && activeNavStyles
                  )
                }
              >
                <span className="relative z-10">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login-page">
              <Button
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-105"
              >
                লগইন
              </Button>
            </Link>
            <Link to="/register-page">
              <Button
                className={cn(
                  "bg-red-600 hover:bg-red-700 text-white",
                  "transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20",
                  "font-semibold"
                )}
              >
                নিবন্ধন করুন
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-red-100/60 transition-all duration-300 hover:scale-110 text-slate-800"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-red-600 transition-transform duration-500 rotate-180" />
            ) : (
              <Menu className="h-6 w-6 text-red-600 transition-transform duration-500" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500 ease-in-out",
            isOpen
              ? "max-h-[500px] opacity-100 mt-4 transform-none"
              : "max-h-0 opacity-0 -translate-y-4"
          )}
        >
          <nav className="flex flex-col space-y-2 py-4 mt-2 border-t border-red-100 bg-white rounded-lg shadow-md">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(baseMobileNavStyles, isActive && activeMobileNavStyles)
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3 px-6 pt-4 mt-2 border-t border-red-100">
              <Link to="/login-page" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-all"
                >
                  লগইন
                </Button>
              </Link>
              <Link to="/register-page" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
                  নিবন্ধন করুন
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
