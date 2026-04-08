import { motion } from "motion/react";
import { Zap, Cable, Rocket } from "lucide-react";
import { Navbar } from "./Navbar";

export function FullFibre() {
  return (
    <div className="flex flex-col w-full bg-zinc-950 min-h-screen text-zinc-50">
      <Navbar />
      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 font-medium text-sm mb-6 tracking-wide uppercase">
              <Zap size={16} />
              100% FTTP
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6"
            >
              True <span className="text-blue-400">Full Fibre</span> Broadband.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-zinc-400"
            >
              No copper wires. No speed drops at peak times. Just a pure fibre optic cable straight
              to your door.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 sm:p-10 rounded-[3rem] bg-zinc-900 border border-zinc-800"
            >
              <Cable className="text-blue-400 w-16 h-16 mb-8" />
              <h2 className="text-3xl font-black mb-4">What is FTTP?</h2>
              <p className="text-zinc-400 leading-relaxed">
                Fibre to the Premises (FTTP) means the fibre optic cable runs all the way into your
                home. This delivers a faster, more reliable connection compared to part-fibre
                networks that rely on copper wires for the final stretch. With Vean, you get the
                real deal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 sm:p-10 rounded-[3rem] bg-zinc-900 border border-zinc-800"
            >
              <Rocket className="text-blue-400 w-16 h-16 mb-8" />
              <h2 className="text-3xl font-black mb-4">Symmetrical Speeds</h2>
              <p className="text-zinc-400 leading-relaxed">
                Downloads and uploads at the exact same speed. Whether you're pulling down a massive
                100GB game or uploading high-res 4K video files for work, it happens in a flash.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
