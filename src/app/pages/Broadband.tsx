import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Info, WifiHigh, Tv, Gamepad2, Users, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "./Navbar";

export function Broadband() {
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Essential",
      speed: "150",
      price: 25,
      desc: "Perfect for smaller households browsing and streaming.",
      idealFor: [<Tv key="tv" size={20} />, <Users key="user" size={20} />],
      features: ["Symmetrical speeds", "Vean Wi-Fi 6 Router", "Fixed pricing", "Free setup"],
    },
    {
      name: "Pro",
      speed: "500",
      price: 35,
      desc: "For heavy streamers, remote workers, and gamers.",
      idealFor: [<Tv key="tv" size={20} />, <Gamepad2 key="game" size={20} />, <Users key="user" size={20} />],
      features: ["Symmetrical speeds", "Vean Wi-Fi 6 Router", "Fixed pricing", "Free setup", "Priority Support"],
      popular: true,
    },
    {
      name: "Max",
      speed: "1000",
      price: 45,
      desc: "Ludicrous speed for smart homes and power users.",
      idealFor: [<WifiHigh key="wifi" size={20} />, <Gamepad2 key="game" size={20} />, <Users key="user" size={20} />],
      features: ["Symmetrical speeds", "Vean Wi-Fi 6e Mesh System", "Fixed pricing", "Free setup", "Priority Support", "Static IP"],
    },
  ];

  const handleSelectPlan = (plan: (typeof plans)[0]) => {
    const finalPrice = billing === "annually" ? Math.floor(plan.price * 0.9) : plan.price;
    navigate("/checkout", {
      state: {
        planName: plan.name,
        planSpeed: plan.speed,
        planPrice: finalPrice,
        billing,
      },
    });
  };

  return (
    <div className="flex flex-col w-full bg-zinc-950 min-h-screen text-zinc-50">
      <Navbar />
      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full py-16 sm:py-24">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6"
            >
              Broadband that <span className="text-blue-400">flies.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-zinc-400 mb-10"
            >
              Simple, honest pricing. No hidden fees. Symmetrical speeds across the board.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center p-1 bg-zinc-900 rounded-full w-fit mx-auto border border-zinc-800"
            >
              <button
                className={`px-6 sm:px-8 py-3 rounded-full font-bold text-sm transition-colors ${billing === "monthly" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"}`}
                onClick={() => setBilling("monthly")}
              >
                Pay Monthly
              </button>
              <button
                className={`px-6 sm:px-8 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2 ${billing === "annually" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"}`}
                onClick={() => setBilling("annually")}
              >
                Pay Annually{" "}
                <span className="bg-blue-400/20 text-blue-400 px-2 py-0.5 rounded-full text-xs">
                  Save 10%
                </span>
              </button>
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-24 sm:mb-32">
            {plans.map((plan, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 + 0.3 }}
                key={plan.name}
                className={`relative flex flex-col p-8 rounded-[2.5rem] ${
                  plan.popular
                    ? "bg-zinc-900 border-2 border-blue-400/50 shadow-2xl shadow-blue-400/5 md:-translate-y-4"
                    : "bg-zinc-900 border border-zinc-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-400 text-zinc-950 font-black px-6 py-1.5 rounded-full text-sm uppercase tracking-wide">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-3xl font-black mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-black text-white">{plan.speed}</span>
                    <span className="text-xl font-bold text-zinc-500">Mbps</span>
                  </div>
                  <p className="text-zinc-400 text-sm h-10">{plan.desc}</p>
                </div>

                <div className="mb-8 p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex justify-between items-center">
                  <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">
                    Ideal For
                  </span>
                  <div className="flex gap-3 text-zinc-400">{plan.idealFor}</div>
                </div>

                <div className="mb-8 flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-zinc-300">
                        <CheckCircle2 size={20} className="text-blue-400 flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-zinc-800 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-white">
                      £{billing === "annually" ? Math.floor(plan.price * 0.9) : plan.price}
                    </span>
                    <span className="text-sm font-bold text-zinc-500">/month</span>
                    {billing === "annually" && (
                      <span className="text-xs text-blue-400 font-bold mt-1">billed annually</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`px-6 py-4 rounded-full font-black transition-transform hover:scale-105 active:scale-95 ${
                      plan.popular
                        ? "bg-blue-400 text-zinc-950 hover:bg-blue-500"
                        : "bg-white text-zinc-950 hover:bg-zinc-200"
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 sm:p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px]" />

            <div className="md:w-1/2 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tighter">
                Not sure what speed you need?
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 mb-8">
                Here is a rough guide: 150Mbps is great for 1-2 people streaming 4K. 500Mbps handles
                heavy downloading and multiple devices. 1Gbps is for hardcore gamers and huge smart
                homes.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors"
              >
                <Info size={20} />
                Read our full speed guide
              </button>
            </div>

            <div className="md:w-1/2 relative z-10 bg-zinc-950 p-8 rounded-3xl border border-zinc-800 w-full">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">
                    <span>Downloading 50GB Game</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "20%" }}
                      transition={{ duration: 1 }}
                      className="bg-zinc-500 h-full rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs font-bold mt-2 text-zinc-400">
                    <span>Standard (70Mbps)</span>
                    <span>1 hr 35 mins</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold text-blue-400 mb-2 uppercase tracking-wide">
                    <span>Downloading 50GB Game</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="bg-blue-400 h-full rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs font-bold mt-2 text-blue-400">
                    <span>Vean Pro (500Mbps)</span>
                    <span>13 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-400/20 p-3 rounded-2xl">
                  <Info className="text-blue-400" size={28} />
                </div>
                <h3 className="text-3xl font-black text-white">Speed Guide</h3>
              </div>

              <div className="space-y-6 text-zinc-300">
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                  <h4 className="text-xl font-bold text-white mb-2">150 Mbps - The Essential</h4>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Ideal for smaller households (1-2 people). You can comfortably stream 4K video,
                    browse, work from home, and play games online without interruption.
                  </p>
                </div>
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 border-l-4 border-l-blue-400">
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    500 Mbps - The Pro
                    <span className="text-xs bg-blue-400 text-zinc-950 px-2 py-0.5 rounded-full uppercase tracking-wider font-black">
                      Sweet Spot
                    </span>
                  </h4>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Perfect for families (3-5 people) where multiple people are streaming in 4K,
                    attending video calls, and gaming simultaneously.
                  </p>
                </div>
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                  <h4 className="text-xl font-bold text-white mb-2">1 Gbps - The Max</h4>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Total overkill for most, but essential for power users with smart homes, dozens
                    of devices, or heavy download needs.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
