import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Top Bar: collapsible on scroll ── */}
      <div
        className={`bg-zinc-950/90 backdrop-blur-md  transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0 border-b-0" : "max-h-16 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-12 flex items-center gap-2">
          <Link
            to="/"
            className="px-2.5 py-1 rounded-lg text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 whitespace-nowrap"
          >
            Professional
          </Link>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-zinc-500 border border-zinc-800 cursor-not-allowed whitespace-nowrap">
            Residential
            <span className="ml-1 text-[10px] font-normal text-zinc-600">(soon)</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-zinc-500 border border-zinc-800 cursor-not-allowed whitespace-nowrap">
            Business
            <span className="ml-1 text-[10px] font-normal text-zinc-600">(soon)</span>
          </span>
        </div>
      </div>

      {/* ── Bottom Bar: always fixed ── */}
      <div className="bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-12 flex items-center justify-between">
          <Link
            to="/"
            className="text-white font-black text-base tracking-tighter hover:text-blue-400 transition-colors"
          >
            Vean
          </Link>

          <button
            onClick={() => navigate("/broadband")}
            className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs px-4 py-1.5 rounded-lg transition-all"
          >
            Order Now
          </button>
        </div>
      </div>
    </header>
  );
}