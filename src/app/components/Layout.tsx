import { Link, Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Wifi } from "lucide-react";
import { useState, useEffect } from "react";

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Broadband", path: "/broadband" },
    { name: "About Us", path: "/about" },
    { name: "Help", path: "/help" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col selection:bg-lime-400 selection:text-zinc-900">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group z-50">
            <div className="bg-lime-400 p-2 rounded-xl text-zinc-950 group-hover:scale-105 transition-transform">
              <Wifi size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-lime-400 transition-colors">
              VEAN
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/check-availability"
              className="bg-lime-400 hover:bg-lime-500 text-zinc-950 px-6 py-2.5 rounded-full font-bold text-sm transition-colors"
            >
              Check Availability
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-zinc-300 hover:text-white z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-4xl font-black tracking-tighter text-zinc-300 hover:text-lime-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-8 pt-8 border-t border-zinc-800">
              <Link
                to="/check-availability"
                className="block w-full text-center bg-lime-400 hover:bg-lime-500 text-zinc-950 px-6 py-4 rounded-2xl font-bold text-lg transition-colors"
              >
                Check Availability
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <div className="bg-lime-400 p-2 rounded-xl text-zinc-950">
                <Wifi size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                VEAN
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              The internet, unlocked. We're bringing ludicrously fast, genuinely fairly-priced full fibre to homes across the country.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Products</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/full-fibre" className="text-zinc-400 hover:text-lime-400 transition-colors text-sm">Plan 1</Link></li>
              <li><Link to="/mesh-wifi" className="text-zinc-400 hover:text-lime-400 transition-colors text-sm">Plan 2</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/about" className="text-zinc-400 hover:text-lime-400 transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/help" className="text-zinc-400 hover:text-lime-400 transition-colors text-sm">Help Centre</Link></li>
              <li><Link to="/service-status" className="text-zinc-400 hover:text-lime-400 transition-colors text-sm">Service Status</Link></li>
              <li><Link to="/contact-us" className="text-zinc-400 hover:text-lime-400 transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-900">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Vean Fibre Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-lime-400 hover:text-lime-300 font-bold transition-colors text-sm">Admin Portal</Link>
            <Link to="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Privacy</Link>
            <Link to="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Terms</Link>
            <Link to="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
