import { Link, useLocation } from "react-router";
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-12 flex items-center gap-4">
        {/* Logo — visible only after scroll */}
        <div
          className={`transition-all duration-300 shrink-0 ${
            scrolled ? "opacity-100 w-auto mr-2" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          

<Link 
  to="/" 
  className="text-white font-black text-base tracking-tighter whitespace-nowrap"
>
  Vean
</Link>
        </div>

        {/* Nav links — left aligned */}
        <nav className="flex items-center gap-1 sm:gap-2 flex-wrap">
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
        </nav>

        {/* Order Now — right side, visible after scroll */}
        <div
          className={`ml-auto transition-all duration-300 shrink-0 ${
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
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
