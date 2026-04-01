import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wifi, Shield, CreditCard, Clock, Calendar, 
  Settings, HelpCircle, FileText, ChevronRight, Download, Activity,
  Smartphone, MapPin, Zap, CheckCircle2
} from "lucide-react";

export function AccountDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <Activity size={18} /> },
    { id: "plan", label: "My Plan", icon: <Wifi size={18} /> },
    { id: "billing", label: "Billing", icon: <CreditCard size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-24 pb-24 relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">Welcome back, Alex.</h1>
          <p className="text-xl text-zinc-400">Manage your VEAN fibre service, bills, and account settings.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? "bg-lime-400 text-zinc-950" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
            
            <div className="mt-8 hidden lg:block bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4 text-lime-400">
                <HelpCircle size={24} />
                <h3 className="font-bold text-white">Need help?</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-4">Our support team is online and ready to assist.</p>
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg font-bold text-sm transition-colors">
                Contact Support
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Status Banner */}
                  <div className="bg-lime-400 border border-lime-400/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-lime-300 to-transparent opacity-20" />
                    <div className="z-10">
                      <div className="inline-flex items-center gap-2 bg-zinc-950/10 px-3 py-1 rounded-full text-zinc-950 font-bold text-sm mb-3 uppercase tracking-wide">
                        <Clock size={14} /> Pending Installation
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight">Your installation is confirmed</h2>
                      <p className="text-zinc-900/80 font-medium max-w-lg mt-2">
                        Our engineer will arrive on <strong className="text-zinc-950">14 Oct, 09:00 - 11:00</strong>. Make sure someone over 18 is home.
                      </p>
                    </div>
                    <button className="z-10 bg-zinc-950 text-lime-400 px-6 py-3 rounded-full font-bold hover:bg-zinc-900 transition-colors whitespace-nowrap">
                      Reschedule
                    </button>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                      <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-300 mb-4">
                        <Wifi size={20} />
                      </div>
                      <h3 className="font-bold text-lg mb-1">Vean 500 Plan</h3>
                      <p className="text-zinc-400 text-sm mb-4">500 Mbps pure fibre connection. No unexpected mid-contract price hikes.</p>
                      <button onClick={() => setActiveTab("plan")} className="text-lime-400 font-bold text-sm flex items-center gap-1 hover:text-lime-300 transition-colors">
                        View Plan Details <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                      <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-300 mb-4">
                        <CreditCard size={20} />
                      </div>
                      <h3 className="font-bold text-lg mb-1">Next Payment</h3>
                      <p className="text-zinc-400 text-sm mb-4">£35.00 scheduled for <strong className="text-white">20 Oct</strong>. You won't be billed until your service is active.</p>
                      <button onClick={() => setActiveTab("billing")} className="text-lime-400 font-bold text-sm flex items-center gap-1 hover:text-lime-300 transition-colors">
                        Manage Billing <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Next Steps / Checklist */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mt-6">
                    <h3 className="text-xl font-black mb-6">Installation Checklist</h3>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-lime-400 before:via-zinc-800 before:to-transparent">
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-zinc-900 bg-lime-400 text-zinc-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#18181b] z-10">
                          <CheckCircle2 size={16} />
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-zinc-950 p-4 rounded-xl border border-zinc-800 ml-4 md:ml-0">
                          <h4 className="font-bold mb-1">Order Confirmed</h4>
                          <p className="text-sm text-zinc-500">Your Vean fibre plan is locked in at a fixed price.</p>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-zinc-900 bg-lime-400 text-zinc-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#18181b] z-10">
                          <Calendar size={14} />
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-zinc-950 p-4 rounded-xl border border-zinc-800 border-lime-400/30 ml-4 md:ml-0">
                          <h4 className="font-bold text-lime-400 mb-1">Installation Day</h4>
                          <p className="text-sm text-zinc-400">Engineer arrives to connect your new pure fibre line.</p>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-zinc-900 bg-zinc-800 text-zinc-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#18181b] z-10">
                          <Zap size={14} />
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-zinc-950 p-4 rounded-xl border border-zinc-800 ml-4 md:ml-0 opacity-50">
                          <h4 className="font-bold mb-1">Service Active</h4>
                          <p className="text-sm text-zinc-500">Enjoy reliable, blazing-fast speeds on all your devices.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "plan" && (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h2 className="text-3xl font-black mb-2">Vean 500 Plan</h2>
                        <div className="inline-flex items-center gap-2 bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full text-sm font-bold border border-lime-400/20">
                          <Shield size={14} /> Fixed Price Guarantee
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black">£35.00</div>
                        <div className="text-zinc-500 font-bold text-sm uppercase">/month</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                        <div className="text-zinc-500 text-sm font-bold uppercase mb-1">Download</div>
                        <div className="text-2xl font-black text-white">500 Mbps</div>
                      </div>
                      <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                        <div className="text-zinc-500 text-sm font-bold uppercase mb-1">Upload</div>
                        <div className="text-2xl font-black text-white">500 Mbps</div>
                      </div>
                      <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                        <div className="text-zinc-500 text-sm font-bold uppercase mb-1">Contract</div>
                        <div className="text-2xl font-black text-white">24 Months</div>
                      </div>
                    </div>

                    <div className="border-t border-zinc-800 pt-8">
                      <h3 className="font-bold text-lg mb-4">Equipment</h3>
                      <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                        <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 shrink-0">
                          <Wifi size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold">Standard Wi-Fi 6 Router</h4>
                          <p className="text-zinc-500 text-sm">Included with your plan.</p>
                        </div>
                        <div className="text-lime-400 font-bold text-sm">
                          FREE
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "billing" && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                    <h2 className="text-3xl font-black mb-6">Payment Method</h2>
                    
                    <div className="flex items-center justify-between bg-zinc-950 p-5 rounded-2xl border border-zinc-800 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-zinc-800 rounded flex items-center justify-center text-white font-bold text-xs border border-zinc-700">
                          VISA
                        </div>
                        <div>
                          <div className="font-bold">Visa ending in 4242</div>
                          <div className="text-sm text-zinc-500">Expires 12/26</div>
                        </div>
                      </div>
                      <button className="text-lime-400 font-bold text-sm hover:text-white transition-colors">
                        Update
                      </button>
                    </div>

                    <h3 className="font-bold text-lg mb-4 mt-10">Billing History</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-xl hover:bg-zinc-950 transition-colors cursor-pointer border border-transparent hover:border-zinc-800">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                            <FileText size={18} />
                          </div>
                          <div>
                            <div className="font-bold">Initial Order Invoice</div>
                            <div className="text-sm text-zinc-500">Oct 01, 2025</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold">£0.00</span>
                          <button className="text-zinc-500 hover:text-white transition-colors">
                            <Download size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-center p-6 border border-zinc-800 border-dashed rounded-xl bg-zinc-950/50 text-zinc-500">
                        <p className="text-sm">Your first actual bill will appear here once your service is activated.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
                >
                  <h2 className="text-3xl font-black mb-8">Account Settings</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-zinc-300">Personal Details</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2">First Name</label>
                            <input type="text" defaultValue="Alex" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium text-white" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2">Last Name</label>
                            <input type="text" defaultValue="Smith" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium text-white" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2">Email Address</label>
                          <input type="email" defaultValue="alex.smith@example.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium text-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2">Phone Number</label>
                          <input type="tel" defaultValue="+44 7700 900077" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-zinc-800 pt-8">
                      <h3 className="font-bold text-lg mb-4 text-zinc-300">Service Address</h3>
                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
                        <MapPin className="text-zinc-500 shrink-0 mt-1" size={20} />
                        <div>
                          <div className="font-medium text-white">123 Fibre Street</div>
                          <div className="text-zinc-500">London, SW1A 1AA</div>
                          <div className="text-xs text-lime-400 mt-2 font-bold uppercase tracking-wide">Primary Installation Address</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-zinc-800 pt-8 flex justify-end gap-4">
                      <button className="text-zinc-400 font-bold px-6 py-3 hover:text-white transition-colors">
                        Cancel
                      </button>
                      <button className="bg-lime-400 text-zinc-950 font-black px-8 py-3 rounded-full hover:bg-lime-500 transition-transform active:scale-95">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}