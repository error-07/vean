import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Search,
  Zap,
  ShieldCheck,
  Rocket,
  ArrowRight,
  ChevronRight,
  MapPin,
  Globe,
  Router,
  ArrowLeftRight,
  FileX,
  Headphones,
  Network,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";

const words = ["unlocked.", "unleashed.", "unreal.", "reimagined."];

const bubbles = [
  { icon: <Network size={16} />, label: "Static IP" },
  { icon: <Globe size={16} />, label: "No CGNAT" },
  { icon: <Router size={16} />, label: "BYO Router" },
  { icon: <ArrowLeftRight size={16} />, label: "Symmetric*" },
  { icon: <FileX size={16} />, label: "No contracts*" },
  { icon: <Headphones size={16} />, label: "24/7 UK support" },
];

export function Home() {
  const [postcode, setPostcode] = useState("");
  const [typedText, setTypedText] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState<"idle" | "searching" | "found">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let timeout: any;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setTypedText(currentWord.slice(0, charIndex));
        charIndex--;
      } else {
        setTypedText(currentWord.slice(0, charIndex));
        charIndex++;
      }
      if (!isDeleting && charIndex > currentWord.length) {
        isDeleting = true;
        timeout = setTimeout(type, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeout = setTimeout(type, 500);
      } else {
        timeout = setTimeout(type, isDeleting ? 75 : 150);
      }
    };

    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  const features = [
    {
      icon: <Zap size={28} className="text-blue-400" />,
      title: "Symmetrical Speeds",
      desc: "Same speeds up as down. Perfect for streaming, gaming, and working from home without the lag.",
    },
    {
      icon: <ShieldCheck size={28} className="text-blue-400" />,
      title: "No Mid-contract Hikes",
      desc: "We don't do sneaky price bumps. The price you sign up for is the price you pay for the entire contract.",
    },
    {
      icon: <Rocket size={28} className="text-blue-400" />,
      title: "Next-gen Wi-Fi 6",
      desc: "Our custom routers deliver wall-to-wall coverage, blanketing your home in blazing fast internet.",
    },
  ];

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode) return;
    setStatus("searching");
    setTimeout(() => setStatus("found"), 1200);
  };

  return (
          <>
        <motion.div
  className="w-full flex justify-center mt-20"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 tracking-tight break-words">
    Vean
  </h1>
</motion.div>
      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-12 flex items-center gap-4">
          <Link
            to="/"
            className={`transition-all duration-300 text-white font-black text-base tracking-tighter whitespace-nowrap hover:text-blue-400 ${
              scrolled ? "opacity-100 w-auto mr-2" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Vean
          </Link>
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
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative px-4 sm:px-6 md:px-12 pt-28 pb-20 max-w-7xl mx-auto w-full z-10">
        {/* Gradient Blob */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none -z-10 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(0,0,255,0.10) 100%)",
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 min-w-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 font-medium text-xs mb-6 tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Live in 20+ UK Cities
            </div>

            <h1 className="text-center sm:text-left text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-blue-100 tracking-tighter leading-[1.05] mb-4">
              The broadband,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                {typedText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-1.5 md:w-2 h-9 md:h-[0.85em] bg-blue-400 ml-2 align-middle translate-y-[-3px]"
              />
            </h1>

            <p className="text-sm sm:text-base text-blue-300/70 mb-8 max-w-lg font-medium">
              Fixed pricing for your entire contract. Just ludicrously fast full fibre broadband.
            </p>

            <div className="grid grid-cols-3 gap-x-2 gap-y-2">
              {bubbles.map((bubble, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + idx * 0.07, duration: 0.3, ease: "easeOut" }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 hover:bg-zinc-800 transition-colors group cursor-default text-xs"
                  style={{ minWidth: "0" }}
                >
                  <span className="text-blue-400 group-hover:scale-110 transition-transform">
                    {bubble.icon}
                  </span>
                  <span className="text-blue-100 font-semibold whitespace-nowrap">{bubble.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Inline Availability */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="w-full lg:w-auto lg:min-w-[300px] xl:min-w-[330px] shrink-0 lg:mt-[11.5rem]"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-3">
                <MapPin size={22} className="text-blue-400" />
              </div>

              <h3 className="text-base font-black text-blue-100 mb-0.5 tracking-tight">Check Availability</h3>
              <p className="text-xs text-zinc-500 font-medium mb-4">Enter your postcode to check availability</p>

              <form onSubmit={handleCheck} className="w-full mb-4">
                <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 focus-within:border-blue-500/60 transition-colors w-full">
                  <input
                    type="text"
                    placeholder="Enter postcode"
                    className="flex-1 bg-transparent text-blue-100 placeholder:text-zinc-600 text-sm font-bold focus:outline-none uppercase min-w-0"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-lg p-2 transition-all shrink-0"
                    aria-label="Search"
                  >
                    <Search size={15} strokeWidth={2.5} />
                  </button>
                </div>
              </form>

              {status === "searching" && <p className="text-blue-400 font-bold text-sm mb-2 animate-pulse">Checking availability...</p>}

              {status === "found" && (
                <div className="w-full">
                  <div className="bg-blue-400/20 border border-blue-400/50 text-blue-400 p-4 rounded-2xl flex items-center justify-center gap-3 mb-4 font-bold text-sm">
                    <CheckCircle2 size={20} /> Great news! Vean Full Fibre is available at your address.
                  </div>
                  <Link
                    to="/broadband"
                    className="inline-block bg-blue-400 hover:bg-blue-500 text-zinc-950 font-bold px-6 py-2 rounded-full transition-colors"
                  >
                    Order Now
                  </Link>
                </div>
              )}

              <p className="text-zinc-600 text-[10px] mt-3 font-medium">No credit check required.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-20 px-4 sm:px-6 md:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:w-2/3">
            <h2 className="text-3xl md:text-5xl font-black text-blue-100 mb-4 tracking-tighter">
              Why we're not like <br className="hidden md:block" /> the other guys.
            </h2>
            <p className="text-base sm:text-lg text-blue-300/60">
              Others have been ripping you off for decades. We built Vean to be exactly what they
              aren't: fast, fair, and transparent. Vean is a modern UK internet provider delivering premium broadband across multiple national full‑fibre networks — We’re more than just another ISP — we’re a provider that truly understands technology and is committed to delivering an exceptional customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-800/80 transition-colors group"
              >
                <div className="bg-zinc-950 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-blue-500/40 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-blue-100 mb-2">{feature.title}</h3>
                <p className="text-blue-300/60 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans Section ── */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 rounded-t-[3rem] mt-10 relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 bg-blue-400/20" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div className="md:w-1/2">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4 text-white">
                Speeds that melt your face.
              </h2>
              <p className="text-sm sm:text-base font-medium text-blue-200/80">
                Choose the speed that fits your life. Every plan comes with our kick-ass router and 24/7 support.
              </p>
            </div>
            <Link
              to="/broadband"
              className="group flex items-center gap-2 bg-zinc-950 text-white px-5 sm:px-7 py-3 rounded-full font-bold text-sm hover:bg-zinc-800 transition-colors shrink-0"
            >
              See all plans
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {/* Plan 1 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-7 sm:p-8 rounded-[2rem] flex flex-col hover:bg-white/15 transition-colors">
              <div className="flex justify-between items-start mb-8 gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black mb-1 text-white">The Essential</h3>
                  <p className="font-medium text-blue-200/70 text-sm">
                    Perfect for scrolling, streaming & browsing.
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full font-black text-base sm:text-lg shrink-0 text-white border border-white/20">
                  150 Mbps
                </div>
              </div>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <span className="text-4xl sm:text-5xl font-black text-white">£25</span>
                  <span className="font-bold text-blue-200/60">/month</span>
                </div>
                <Link
                  to="/broadband"
                  className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full transition-colors flex items-center justify-center"
                >
                  <ChevronRight size={20} strokeWidth={3} />
                </Link>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="bg-zinc-950 text-white border border-zinc-800 p-7 sm:p-8 rounded-[2rem] flex flex-col relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 bg-blue-500 text-white font-black px-5 py-1.5 rounded-bl-2xl text-xs uppercase tracking-wider">
                Most Popular
              </div>
              <div className="flex justify-between items-start mb-8 gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black mb-1 text-blue-400">The Pro</h3>
                  <p className="font-medium text-zinc-400 text-sm">
                    4K streaming, heavy gaming, large families.
                  </p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full font-black text-base sm:text-lg shrink-0">
                  500 Mbps
                </div>
              </div>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <span className="text-4xl sm:text-5xl font-black text-white">£35</span>
                  <span className="font-bold text-zinc-500">/month</span>
                </div>
                <Link
                  to="/broadband"
                  className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full transition-colors flex items-center justify-center"
                >
                  <ChevronRight size={20} strokeWidth={3} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}