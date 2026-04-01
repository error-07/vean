import { motion } from "motion/react";
import { ArrowRight, HeartHandshake, Zap } from "lucide-react";
import { useNavigate } from "react-router";

export function About() {
  const navigate = useNavigate();

  const values = [
    {
      title: "Fair Pricing",
      desc: "Fixed pricing for your entire contract. We charge what we advertise.",
      icon: <HeartHandshake className="text-lime-400 w-8 h-8" />
    },
    {
      title: "Ludicrous Speed",
      desc: "Our full fibre network is built for the future. Symmetric speeds up to 1Gbps.",
      icon: <Zap className="text-lime-400 w-8 h-8" />
    },
    {
      title: "UK-Based Support",
      desc: "No outsourced call centres. Real people, based right here in the UK, ready to help when you need it.",
      icon: <HeartHandshake className="text-lime-400 w-8 h-8" />
    }
  ];

  return (
    <div className="flex flex-col w-full bg-zinc-950 text-zinc-50 pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-lime-400 font-bold text-sm uppercase tracking-widest w-fit">
              Our Mission
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white">
              We <span className="text-zinc-600 line-through decoration-lime-400 decoration-8">hated</span> our ISP. <br />
              So we built <span className="text-lime-400">our own.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg mt-4 leading-relaxed">
              Founded in 2024, Vean was born from a simple idea: bringing next-generation connectivity to everyone. We decided it was time to build a network that truly works for you.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-square rounded-[3rem] overflow-hidden bg-zinc-900 border border-zinc-800"
          >
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=800" 
              alt="Team working in server room" 
              className="object-cover w-full h-full opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mb-32">
          <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter text-center">What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] hover:bg-zinc-800/80 transition-colors"
              >
                <div className="bg-zinc-950 border border-zinc-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                  {val.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-lime-400 rounded-[3rem] p-12 md:p-20 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/20 blur-[100px] rounded-full mix-blend-overlay"></div>
          <h2 className="text-5xl md:text-7xl font-black text-zinc-950 mb-8 tracking-tighter relative z-10">
            Ready to unlock your internet?
          </h2>
          <button 
            onClick={() => navigate("/check-availability")}
            className="bg-zinc-950 text-white hover:bg-zinc-800 px-8 py-4 rounded-full font-black text-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 relative z-10"
          >
            Check Postcode
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
