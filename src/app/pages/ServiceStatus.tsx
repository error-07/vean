import { motion } from "motion/react";
import { CheckCircle, AlertTriangle, XCircle, Activity } from "lucide-react";

export function ServiceStatus() {
  const regions = [
    { name: "London", status: "operational" },
    { name: "Manchester", status: "operational" },
    { name: "Birmingham", status: "operational" },
    { name: "Glasgow", status: "degraded" },
    { name: "Liverpool", status: "operational" },
    { name: "Leeds", status: "operational" },
  ];

  return (
    <div className="flex flex-col w-full bg-zinc-950 pt-32 pb-24 text-zinc-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col items-start mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
          >
            Network <span className="text-lime-400">Status</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-400"
          >
            Real-time updates on our full fibre network performance.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-12 flex items-center gap-6"
        >
          <div className="bg-lime-400/20 p-4 rounded-full">
            <Activity className="text-lime-400" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">All Systems Operational</h2>
            <p className="text-zinc-400">Our core network is currently running normally with no major outages reported.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-800 bg-zinc-950/50">
            <h3 className="font-bold text-lg">Regional Status</h3>
          </div>
          <div className="divide-y divide-zinc-800">
            {regions.map((region, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-zinc-800/50 transition-colors">
                <span className="font-medium text-lg">{region.name}</span>
                <div className="flex items-center gap-2">
                  {region.status === "operational" ? (
                    <>
                      <span className="text-lime-400 text-sm font-bold uppercase tracking-wider">Operational</span>
                      <CheckCircle className="text-lime-400" size={20} />
                    </>
                  ) : region.status === "degraded" ? (
                    <>
                      <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">Degraded</span>
                      <AlertTriangle className="text-amber-400" size={20} />
                    </>
                  ) : (
                    <>
                      <span className="text-red-500 text-sm font-bold uppercase tracking-wider">Outage</span>
                      <XCircle className="text-red-500" size={20} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
