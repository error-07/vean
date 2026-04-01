import { motion } from "motion/react";
import { Search, MapPin, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function CheckAvailability() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "searching" | "found">("idle");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    setStatus("searching");
    setTimeout(() => {
      setStatus("found");
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full bg-zinc-950 min-h-screen pt-32 pb-24 text-zinc-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            Check <span className="text-lime-400">Availability</span>
          </h1>
          <p className="text-xl text-zinc-400">
            Enter your postcode or address to see if Vean is available at your home.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSearch}
          className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 p-2 rounded-full flex items-center mb-16 shadow-2xl"
        >
          <div className="pl-6 text-zinc-400">
            <MapPin size={24} />
          </div>
          <input 
            type="text" 
            placeholder="e.g. SW1A 1AA or 10 Downing Street"
            className="w-full bg-transparent border-none text-white py-4 px-4 text-lg focus:outline-none placeholder:text-zinc-600 font-medium"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            type="submit"
            disabled={status === "searching"}
            className="bg-lime-400 hover:bg-lime-500 text-zinc-950 font-black px-8 py-4 rounded-full text-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {status === "searching" ? (
              <span className="animate-pulse">Checking...</span>
            ) : (
              <>Search <Search size={20} /></>
            )}
          </button>
        </motion.form>

        {status === "found" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <div className="bg-lime-400/20 border border-lime-400/50 text-lime-400 p-4 rounded-2xl flex items-center justify-center gap-3 mb-10 font-bold text-lg">
              <CheckCircle2 size={24} />
              Great news! Vean Full Fibre is available at your address.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-colors flex flex-col">
                <div className="mb-4">
                  <h3 className="text-2xl font-black mb-1">The Essential</h3>
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-lime-400" />
                    <span className="text-zinc-400 font-bold text-sm">150 Mbps Symmetrical</span>
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto pt-6 border-t border-zinc-800">
                  <div>
                    <span className="text-4xl font-black">£25</span>
                    <span className="text-zinc-500 font-medium">/mo</span>
                  </div>
                  <Link to="/broadband" className="bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-full transition-colors">
                    <ChevronRight size={24} />
                  </Link>
                </div>
              </div>

              <div className="bg-zinc-900 border border-lime-400/50 rounded-3xl p-8 hover:border-lime-400 transition-colors flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-lime-400 text-zinc-950 font-black px-4 py-1 rounded-bl-xl text-xs uppercase tracking-wider">
                  Recommended
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-black mb-1 text-lime-400">The Pro</h3>
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-lime-400" />
                    <span className="text-zinc-400 font-bold text-sm">500 Mbps Symmetrical</span>
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto pt-6 border-t border-zinc-800">
                  <div>
                    <span className="text-4xl font-black">£35</span>
                    <span className="text-zinc-500 font-medium">/mo</span>
                  </div>
                  <Link to="/broadband" className="bg-lime-400 hover:bg-lime-500 text-zinc-950 p-3 rounded-full transition-colors">
                    <ChevronRight size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
