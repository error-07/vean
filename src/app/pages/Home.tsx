import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { Navbar } from "/Users/basith/Desktop/website/src/app/pages/Navbar.tsx";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col selection:bg-blue-400 selection:text-zinc-900">

      <Navbar />

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            // pt-24 clears both navbar bars (~96px)
            className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-6 flex flex-col gap-6 overflow-y-auto"
          >
            <a href="/broadband" className="text-4xl font-black tracking-tighter text-zinc-300 hover:text-blue-400 transition-colors">
              Broadband
            </a>
            <a href="/about" className="text-4xl font-black tracking-tighter text-zinc-300 hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="/help" className="text-4xl font-black tracking-tighter text-zinc-300 hover:text-blue-400 transition-colors">
              Help
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content — no horizontal padding here; each page section owns its own */}
      <main className="flex-grow flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}
