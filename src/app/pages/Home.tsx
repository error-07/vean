import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Search, Zap, ShieldCheck, Rocket, ArrowRight, ChevronRight, Wifi, Cable } from "lucide-react";
import { useState, useEffect } from "react";

const words = ["unlocked.", "unleashed.", "unreal."];

export function Home() {
  const [postcode, setPostcode] = useState("");
  const [typedText, setTypedText] = useState("");
  const navigate = useNavigate();

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
        timeout = setTimeout(type, 1500); // pause at the end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeout = setTimeout(type, 500); // pause before next word
      } else {
        timeout = setTimeout(type, isDeleting ? 75 : 150);
      }
    };

    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  const features = [
    {
      icon: <Zap size={32} className="text-lime-400" />,
      title: "Symmetrical Speeds",
      desc: "Same speeds up as down. Perfect for streaming, gaming, and working from home without the lag."
    },
    {
      icon: <ShieldCheck size={32} className="text-lime-400" />,
      title: "No Mid-contract Hikes",
      desc: "We don't do sneaky price bumps. The price you sign up for is the price you pay for the entire contract."
    },
    {
      icon: <Rocket size={32} className="text-lime-400" />,
      title: "Next-gen Wi-Fi 6",
      desc: "Our custom routers deliver wall-to-wall coverage, blanketing your home in blazing fast internet."
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-zinc-950 pt-24">
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pt-20 pb-32 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-lime-400 font-medium text-sm mb-8 tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
            </span>
            Live in 20+ UK Cities
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8">
            The internet, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
              {typedText}
            </span>
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block w-2 md:w-3 h-10 md:h-[1.1em] bg-lime-400 ml-2 align-middle translate-y-[-4px]"
            />
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-medium">
            Fixed pricing for your entire contract. Just ludicrously fast full fibre broadband.
          </p>

          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              navigate("/check-availability");
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
          >
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-zinc-500" size={20} />
              </div>
              <input
                type="text"
                placeholder="Enter your postcode"
                className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl py-4 pl-12 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all placeholder:text-zinc-600 uppercase font-bold"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-lime-400 hover:bg-lime-500 text-zinc-950 font-black px-8 py-4 rounded-2xl text-lg transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
            >
              Check Now
            </button>
          </form>
          <p className="text-zinc-600 text-sm mt-4 font-medium">
            Check availability in 10 seconds. No credit check required.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:w-2/3">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              Why we're not like <br className="hidden md:block" /> the other guys.
            </h2>
            <p className="text-xl text-zinc-400">
              Others have been ripping you off for decades. We built Vean to be exactly what they aren't: fast, fair, and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:bg-zinc-800/80 transition-colors group"
              >
                <div className="bg-zinc-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-zinc-800 group-hover:border-lime-400/50 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-20 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 flex flex-col items-start hover:border-lime-400/50 transition-colors group"
          >
            <div className="bg-zinc-950 p-4 rounded-2xl mb-6 border border-zinc-800 group-hover:border-lime-400/50 text-lime-400 transition-colors">
              <Cable size={32} />
            </div>
            <h3 className="text-3xl font-black text-white mb-4">Plan 1</h3>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Plain Optic Fibre
            </p>
            <Link to="/full-fibre" className="mt-auto flex items-center gap-2 text-white font-bold hover:text-lime-400 transition-colors group/link">
              Explore Plan 1 <ArrowRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 flex flex-col items-start hover:border-lime-400/50 transition-colors group"
          >
            <div className="bg-zinc-950 p-4 rounded-2xl mb-6 border border-zinc-800 group-hover:border-lime-400/50 text-lime-400 transition-colors">
              <Wifi size={32} />
            </div>
            <h3 className="text-3xl font-black text-white mb-4">Plan 2</h3>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Our Router
            </p>
            <Link to="/mesh-wifi" className="mt-auto flex items-center gap-2 text-white font-bold hover:text-lime-400 transition-colors group/link">
              Explore plan 2 <ArrowRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Plans Teaser */}
      <section className="py-32 px-6 md:px-12 bg-lime-400 rounded-t-[3rem] text-zinc-950 mt-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-lime-300 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="md:w-1/2">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                Speeds that melt your face.
              </h2>
              <p className="text-xl font-medium text-zinc-800">
                Choose the speed that fits your life. No matter which you pick, you get our kick-ass router and 24/7 support.
              </p>
            </div>
            <Link 
              to="/broadband"
              className="group flex items-center gap-2 bg-zinc-950 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 transition-colors"
            >
              See all plans
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/50 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] flex flex-col hover:bg-white/60 transition-colors">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-3xl font-black mb-2">The Essential</h3>
                  <p className="font-medium text-zinc-600">Perfect for scrolling, streaming & browsing.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-full font-black text-xl shadow-sm">
                  150 Mbps
                </div>
              </div>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <span className="text-5xl font-black">£25</span>
                  <span className="font-bold text-zinc-500">/month</span>
                </div>
                <button className="bg-lime-400 hover:bg-lime-500 text-zinc-950 p-4 rounded-full transition-colors border-2 border-zinc-950">
                  <ChevronRight size={24} strokeWidth={3} />
                </button>
              </div>
            </div>

            <div className="bg-zinc-950 text-white border border-zinc-800 p-10 rounded-[2.5rem] flex flex-col relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 bg-lime-400 text-zinc-950 font-black px-6 py-2 rounded-bl-2xl text-sm uppercase tracking-wider">
                Most Popular
              </div>
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-3xl font-black mb-2 text-lime-400">The Pro</h3>
                  <p className="font-medium text-zinc-400">4K streaming, heavy gaming, large families.</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full font-black text-xl shadow-sm">
                  500 Mbps
                </div>
              </div>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <span className="text-5xl font-black text-white">£35</span>
                  <span className="font-bold text-zinc-500">/month</span>
                </div>
                <button className="bg-lime-400 hover:bg-lime-500 text-zinc-950 p-4 rounded-full transition-colors">
                  <ChevronRight size={24} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
