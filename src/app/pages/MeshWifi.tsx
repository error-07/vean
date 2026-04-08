import { motion } from "motion/react";
import { Router, Signal, ShieldCheck } from "lucide-react";
import { Navbar } from "./Navbar";

export function MeshWifi() {
  return (
    <div className="flex flex-col w-full bg-zinc-950 min-h-screen text-zinc-50">
      <Navbar />
      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 font-medium text-sm mb-6 tracking-wide uppercase">
              <Signal size={16} />
              Wi-Fi 6E Ready
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6"
            >
              Wall-to-wall <span className="text-blue-400">Coverage.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-zinc-400"
            >
              Eliminate dead zones with our advanced mesh Wi-Fi system. Blazing fast speeds in every
              room of your house.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Router size={32} />,
                title: "Smart Routing",
                desc: "Your devices automatically connect to the strongest node, ensuring seamless roaming as you move around.",
              },
              {
                icon: <Signal size={32} />,
                title: "No Dead Zones",
                desc: "From the basement to the attic, experience perfect 4K streaming and low-latency gaming anywhere.",
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Secure Network",
                desc: "Built-in WPA3 security, parental controls, and automatic updates keep your family's data safe.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-400/50 transition-colors group"
              >
                <div className="bg-zinc-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-blue-400 border border-zinc-800 group-hover:bg-blue-400/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
