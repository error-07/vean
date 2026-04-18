import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import {
  Search,
  Zap,
  ShieldCheck,
  Rocket,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Globe,
  Router,
  ArrowLeftRight,
  FileX,
  Headphones,
  Network,
  CheckCircle2,
  Wifi,
  Gamepad2,
  Tv,
  Users,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const words = ["unlocked.", "unleashed.", "unreal.", "reimagined."];

const carouselSlides = [
  {
    id: "features",
    label: "What's Included",
    content: [
      { icon: <Network size={18} />, label: "Static IP" },
      { icon: <Globe size={18} />, label: "No CGNAT" },
      { icon: <Router size={18} />, label: "BYO Router" },
      { icon: <ArrowLeftRight size={18} />, label: "Symmetric Speeds" },
      { icon: <FileX size={18} />, label: "No Contracts" },
      { icon: <Headphones size={18} />, label: "24/7 UK Support" },
    ],
  },
  {
    id: "why",
    label: "Why Vean",
    content: [
      { icon: <Zap size={18} />, label: "Fixed Pricing — Forever" },
      { icon: <ShieldCheck size={18} />, label: "No Mid-Contract Hikes" },
      { icon: <Rocket size={18} />, label: "Wi-Fi 6 Router Included" },
      { icon: <Headphones size={18} />, label: "Real UK Human Support" },
      { icon: <Globe size={18} />, label: "Full Fibre — Not Copper" },
      { icon: <Zap size={18} />, label: "Same Upload & Download" },
    ],
  },
  {
    id: "plans",
    label: "Broadband Plans",
    isPlans: true,
  },
];

const plans = [
  {
    name: "Essential",
    speed: "150",
    price: 25,
    desc: "Streaming, browsing & WFH for 1–2 people.",
    popular: false,
    icons: [<Tv key="tv" size={16} />, <Users key="u" size={16} />],
  },
  {
    name: "Pro",
    speed: "500",
    price: 35,
    desc: "4K streaming, gaming, large families.",
    popular: true,
    icons: [<Tv key="tv" size={16} />, <Gamepad2 key="g" size={16} />, <Users key="u" size={16} />],
  },
  {
    name: "Max",
    speed: "1000",
    price: 45,
    desc: "Smart homes, power users, ludicrous speed.",
    popular: false,
    icons: [<Wifi key="w" size={16} />, <Gamepad2 key="g" size={16} />, <Users key="u" size={16} />],
  },
];

const whyFeatures = [
  {
    icon: <Zap size={22} className="text-blue-400" />,
    title: "Symmetrical Speeds",
    desc: "Same speeds up as down. Perfect for video calls, uploading, gaming — no throttling, no excuses.",
  },
  {
    icon: <ShieldCheck size={22} className="text-blue-400" />,
    title: "No Mid-Contract Hikes",
    desc: "We don't do sneaky price bumps. The price you sign up for is the price you pay. Full stop.",
  },
  {
    icon: <Rocket size={22} className="text-blue-400" />,
    title: "Next-gen Wi-Fi 6",
    desc: "Our custom routers deliver wall-to-wall coverage and blanket your home in blazing-fast internet.",
  },
];

/* ─────────────────────────────────────────────
   CAROUSEL COMPONENT (embedded strip)
───────────────────────────────────────────── */
function HomeCarousel() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef<any>(null);

  const go = useCallback(
    (idx: number) => {
      setDir(idx > active ? 1 : -1);
      setActive(idx);
    },
    [active]
  );

  const next = useCallback(() => go((active + 1) % carouselSlides.length), [active, go]);
  const prev = useCallback(
    () => go((active - 1 + carouselSlides.length) % carouselSlides.length),
    [active, go]
  );

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => { timerRef.current = setInterval(next, 4500); };

  const slide = carouselSlides[active];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Tab header */}
      <div className="flex border-b border-zinc-800">
        {carouselSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            className={`flex-1 py-3 text-[11px] font-black tracking-widest uppercase transition-colors relative ${
              i === active ? "text-blue-400" : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            {s.label}
            {i === active && (
              <motion.div
                layoutId="carousel-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={active}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 p-5"
          >
            {slide.isPlans ? (
              <div className="flex flex-col h-full gap-3">
                <div className="grid grid-cols-3 gap-2 flex-1">
                  {plans.map((p) => (
                    <div
                      key={p.name}
                      onClick={() => navigate("/broadband", { state: { selectedPlan: p.name } })}
                      className={`flex flex-col justify-between rounded-2xl p-3 border cursor-pointer transition-all hover:scale-[1.03] active:scale-95 ${
                        p.popular
                          ? "bg-blue-400/10 border-blue-400/40"
                          : "bg-zinc-950 border-zinc-800 hover:border-zinc-600"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1 gap-1">
                          <span className={`text-xs font-black ${p.popular ? "text-blue-400" : "text-white"}`}>
                            {p.name}
                          </span>
                          {p.popular && (
                            <span className="text-[9px] font-black bg-blue-400 text-zinc-950 px-1.5 py-0.5 rounded-full uppercase leading-none">
                              ★
                            </span>
                          )}
                        </div>
                        <div className="text-xl font-black text-white leading-none">{p.speed}</div>
                        <div className="text-[10px] text-zinc-500 font-bold">Mbps</div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-black text-white">
                          £{p.price}
                          <span className="text-[9px] text-zinc-500 font-bold">/mo</span>
                        </span>
                        <div className="flex gap-0.5 text-zinc-600">{p.icons}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate("/broadband")}
                  className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black tracking-wide flex items-center justify-center gap-1.5 transition-colors"
                >
                  View All Plans & Order <ArrowRight size={13} />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 content-start">
                {(slide.content as { icon: React.ReactNode; label: string }[]).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-blue-500/30 transition-colors group cursor-default"
                  >
                    <span className="text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-blue-100 font-bold text-xs truncate">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Side arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors z-10"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors z-10"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 py-3 border-t border-zinc-800">
        {carouselSlides.map((_, i) => (
          <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}>
            <motion.div
              animate={{
                width: i === active ? 24 : 6,
                backgroundColor: i === active ? "#60a5fa" : "#3f3f46",
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN HOME PAGE
───────────────────────────────────────────── */
export function Home() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [postcode, setPostcode] = useState("");
  const [status, setStatus] = useState<"idle" | "searching" | "found">("idle");
  const availRef = useRef<HTMLDivElement>(null);

  // Typewriter
  useEffect(() => {
    let timeout: any;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const type = () => {
      const word = words[wordIndex];
      setTypedText(isDeleting ? word.slice(0, charIndex) : word.slice(0, charIndex));
      if (isDeleting) charIndex--; else charIndex++;
      if (!isDeleting && charIndex > word.length) {
        isDeleting = true;
        timeout = setTimeout(type, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeout = setTimeout(type, 400);
      } else {
        timeout = setTimeout(type, isDeleting ? 60 : 130);
      }
    };
    timeout = setTimeout(type, 700);
    return () => clearTimeout(timeout);
  }, []);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    setStatus("searching");
    setTimeout(() => setStatus("found"), 1300);
  };

  const scrollToAvail = () => {
    availRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex flex-col w-full bg-zinc-950 min-h-screen text-zinc-50 overflow-x-hidden">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative pt-28 pb-10 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full">
        {/* Ambient radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] pointer-events-none opacity-25"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.55) 0%, transparent 65%)" }}
        />

        {/* Live pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 font-bold text-[11px] tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Now Live in 20+ UK Cities
          </div>
        </motion.div>

        {/* Giant wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="text-center mb-3"
        >
          <h1 className="text-[clamp(5rem,18vw,14rem)] font-black tracking-tighter leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-400/50">
            Vean
          </h1>
        </motion.div>

        {/* Typewriter tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-zinc-400 mb-3"
        >
          Broadband,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
            {typedText}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 h-6 sm:h-7 bg-blue-400 ml-1 align-middle translate-y-[-2px]"
          />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-center text-zinc-500 text-sm sm:text-base font-medium max-w-sm mx-auto mb-10"
        >
          Fixed pricing. No hidden fees. Just ludicrously fast full fibre.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <Link
            to="/broadband"
            className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            See Plans <ArrowRight size={15} />
          </Link>
          <button
            onClick={scrollToAvail}
            className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-sm transition-all flex items-center gap-2"
          >
            <MapPin size={15} className="text-blue-400" /> Check Availability
          </button>
        </motion.div>

        {/* ── CAROUSEL STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          <HomeCarousel />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-4" />

      {/* ══════════════════════════════════════
          WHY VEAN (left) + AVAILABILITY (right)
      ══════════════════════════════════════ */}
      <section
        ref={availRef}
        className="py-20 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Why Vean ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-blue-400 font-bold text-[11px] tracking-widest uppercase mb-4 block">
              Why Vean
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white leading-[1.05] mb-5">
              Not like the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                other guys.
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-10 max-w-md">
              Others have been ripping you off for decades. We built Vean to be exactly what they
              aren't — fast, fair, and transparent. A modern UK ISP delivering premium full-fibre
              across multiple national networks. We actually understand technology, and we're
              committed to delivering an exceptional customer experience.
            </p>

            <div className="space-y-5">
              {whyFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-blue-500/40 flex items-center justify-center shrink-0 transition-colors mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white mb-0.5">{f.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Availability checker ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-blue-400 font-bold text-[11px] tracking-widest uppercase mb-4 block">
              Check Availability
            </span>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 sm:p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
                    <MapPin size={22} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white leading-tight">Is Vean at your door?</h3>
                    <p className="text-xs text-zinc-500 font-medium">No credit check required.</p>
                  </div>
                </div>

                <form onSubmit={handleCheck} className="mb-4">
                  <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 focus-within:border-blue-500/50 rounded-2xl px-4 py-3 transition-colors">
                    <input
                      type="text"
                      placeholder="Enter your postcode…"
                      className="flex-1 bg-transparent text-blue-100 placeholder:text-zinc-600 text-sm font-bold focus:outline-none uppercase tracking-wider"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 text-xs font-black transition-all active:scale-95 flex items-center gap-1.5"
                    >
                      <Search size={14} strokeWidth={2.5} /> Check
                    </button>
                  </div>
                </form>

                <AnimatePresence mode="wait">
                  {status === "searching" && (
                    <motion.div
                      key="searching"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-blue-400 font-bold text-sm"
                    >
                      <div className="w-3 h-3 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                      Checking your area…
                    </motion.div>
                  )}
                  {status === "found" && (
                    <motion.div
                      key="found"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="bg-blue-400/10 border border-blue-400/30 rounded-2xl p-4 flex items-start gap-3 mb-4">
                        <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-blue-300 font-bold text-sm leading-snug">
                          Great news — Vean Full Fibre is available at your address!
                        </p>
                      </div>
                      <Link
                        to="/broadband"
                        className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-400 text-white font-black py-3 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 text-sm"
                      >
                        Order Now <ArrowRight size={15} />
                      </Link>
                    </motion.div>
                  )}
                  {status === "idle" && (
                    <motion.div key="idle" className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[11px] text-zinc-600 font-medium">
                        <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        Covers all major UK networks
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-600 font-medium">
                        <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        Instant results, no personal info needed
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mini stats row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { val: "20+", label: "UK Cities" },
                { val: "99.9%", label: "Uptime SLA" },
                { val: "1Gbps", label: "Max Speed" },
              ].map((s) => (
                <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
                  <div className="text-xl font-black text-blue-400">{s.val}</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      {/* ══════════════════════════════════════
          PLANS SECTION
      ══════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-blue-400 font-bold text-[11px] tracking-widest uppercase mb-3 block">
              Broadband Plans
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-none">
              Speeds that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                melt your face.
              </span>
            </h2>
          </div>
          <Link
            to="/broadband"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 text-zinc-300 font-bold text-sm transition-all shrink-0"
          >
            Compare all plans
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`relative flex flex-col p-7 rounded-3xl border transition-all ${
                plan.popular
                  ? "bg-zinc-900 border-blue-400/40 shadow-2xl shadow-blue-500/5 md:-translate-y-3"
                  : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-400 text-zinc-950 font-black px-5 py-1 rounded-full text-[11px] uppercase tracking-widest whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="flex items-start justify-between mb-5 gap-3">
                <div>
                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <p className="text-zinc-500 text-xs mt-1 leading-snug">{plan.desc}</p>
                </div>
                <div className="flex gap-1.5 text-zinc-600 shrink-0 mt-1">{plan.icons}</div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">{plan.speed}</span>
                  <span className="text-zinc-500 font-bold text-base">Mbps</span>
                </div>
                {/* Relative speed bar */}
                <div className="mt-3 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: plan.name === "Essential" ? "22%" : plan.name === "Pro" ? "55%" : "100%",
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                    className={`h-full rounded-full ${plan.popular ? "bg-blue-400" : "bg-zinc-600"}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-zinc-800 mt-auto">
                <div>
                  <span className="text-3xl font-black text-white">£{plan.price}</span>
                  <span className="text-zinc-500 text-xs font-bold">/month</span>
                </div>
                <button
                  onClick={() => navigate("/broadband", { state: { selectedPlan: plan.name } })}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-black text-sm transition-all hover:scale-105 active:scale-95 ${
                    plan.popular
                      ? "bg-blue-400 text-zinc-950 hover:bg-blue-300"
                      : "bg-zinc-800 text-white hover:bg-zinc-700"
                  }`}
                >
                  Select <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-zinc-600 text-xs font-medium mt-8"
        >
          All plans include free setup, Wi-Fi 6 router & 24/7 UK support. Fixed pricing — no surprise hikes.
        </motion.p>
      </section>

      {/* ══════════════════════════════════════
          FOOTER CTA STRIP
      ══════════════════════════════════════ */}
      <section className="mx-4 sm:mx-8 md:mx-16 mb-16 rounded-3xl overflow-hidden relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)" }}
        />
        <div className="relative z-10 px-8 sm:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
              Ready for real internet?
            </h3>
            <p className="text-blue-200/80 text-sm font-medium">
              No contracts. No price hikes. Pure fibre.
            </p>
          </div>
          <Link
            to="/broadband"
            className="shrink-0 px-7 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Get Started <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}