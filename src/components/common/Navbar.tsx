
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Navbar = () => {
	 const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/search", label: "রক্তদাতা খুঁজুন" },
    { href: "/donate", label: "রক্তদান করুন" },
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/contact", label: "যোগাযোগ" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 border-b border-border/20",
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/90 shadow-lg"
          : "bg-slate-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-slate-900/85",
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-red-500/25">
                <Heart className="w-7 h-7 text-white animate-pulse group-hover:animate-bounce" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-red-500 to-red-700 rounded-full opacity-0 blur-md transition-all duration-500 group-hover:opacity-30 group-hover:animate-pulse"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-red-500 to-red-700 rounded-full opacity-20 blur-sm transition-all duration-300 group-hover:opacity-50"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105 animate-gradient bg-[length:200%_200%]">
                BloodConnect
              </span>
              <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-1">
                জীবন বাঁচান, আশা জাগান
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative text-slate-200 hover:text-red-400 transition-all duration-500 font-medium group px-3 py-2 rounded-lg",
                  "hover:scale-105 hover:-translate-y-1 hover:bg-red-500/10",
                  "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-red-400 after:to-red-600",
                  "after:transition-all after:duration-500 hover:after:w-3/4",
                  "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-red-500/10 before:to-red-600/10 before:opacity-0 before:transition-all before:duration-300 hover:before:opacity-100",
                  "animate-in fade-in slide-in-from-top-4",
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <Button
                variant="outline"
                className={cn(
                  "border-red-400/30 hover:text-white text-red-400 hover:bg-red-500/10 hover:border-red-400/60 transition-all duration-500",
                  "hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 bg-transparent backdrop-blur-sm",
                  "hover:ring-2 hover:ring-red-400/20 hover:ring-offset-2 hover:ring-offset-slate-900",
                )}
              >
                লগইন
              </Button>
            </Link>
            <Link to="/register">
              <Button
                className={cn(
                  "bg-red-600 hover:bg-red-700 text-white",
                  "transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-500/30",
                  "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent",
                  "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
                  "font-semibold",
                )}
              >
                <span className="relative z-10">নিবন্ধন করুন</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-red-500/10 transition-all duration-300 hover:scale-110 text-slate-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-red-400 transition-all duration-300 rotate-180" />
            ) : (
              <Menu className="h-6 w-6 text-red-400 transition-all duration-300" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-700 ease-in-out",
            isOpen
              ? "max-h-[500px] opacity-100 mt-6 transform translate-y-0"
              : "max-h-0 opacity-0 transform -translate-y-4",
          )}
        >
          <nav className="flex flex-col space-y-2 py-6 border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-sm rounded-lg">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-slate-200 hover:text-red-400 transition-all duration-500 font-medium px-6 py-3 rounded-lg",
                  "hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10 hover:scale-[1.02] hover:translate-x-2",
                  "border-l-2 border-transparent hover:border-red-400",
                  "animate-in fade-in slide-in-from-left-6",
                )}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div
              className="flex flex-col space-y-3 px-6 pt-6 border-t border-slate-700/50 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: "600ms" }}
            >
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-red-400/30 text-red-400 hover:bg-red-500/10 hover:border-red-400/60 transition-all duration-500 bg-transparent backdrop-blur-sm hover:scale-[1.02]"
                >
                  লগইন
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-lg font-semibold">
                  নিবন্ধন করুন
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
};

export default Navbar;