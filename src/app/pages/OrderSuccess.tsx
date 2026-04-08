import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, Calendar, Package, Zap } from "lucide-react";
import { useNavigate } from "react-router";
import { Navbar } from "./Navbar";

export function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 relative overflow-hidden flex flex-col">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center py-16 sm:py-24 z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-blue-400 text-zinc-950 rounded-full flex items-center justify-center mb-8"
          >
            <CheckCircle2 size={48} strokeWidth={3} />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black mb-4 tracking-tighter"
          >
            You're all set!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-2xl"
          >
            Your pure fibre connection is officially locked in. We've sent your receipt and
            installation details straight to your inbox.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-blue-400 mb-4">
                <Package size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Order Processed</h3>
              <p className="text-zinc-500 text-sm">
                Your account is ready and equipment is being allocated.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 border-blue-400/30 rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-400/5" />
              <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center text-blue-400 mb-4 z-10">
                <Calendar size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2 z-10">Engineer Visit</h3>
              <p className="text-zinc-400 text-sm z-10">
                We'll see you on your scheduled installation date.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center text-center opacity-50">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 mb-4">
                <Zap size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Pure Fibre</h3>
              <p className="text-zinc-500 text-sm">
                Enjoy uninterrupted, blazing-fast speeds once active.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-400 hover:bg-blue-500 text-zinc-950 px-8 py-4 rounded-full font-black flex items-center justify-center gap-2 transition-transform active:scale-95 text-lg"
            >
              Go to Dashboard <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 px-8 py-4 rounded-full font-bold transition-colors"
            >
              Return to Home
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
