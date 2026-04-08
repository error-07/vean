import { useState } from "react";
import { Navbar } from "./Navbar";
import { motion, AnimatePresence } from "motion/react";
import {
  Users, Cable, Activity, CheckCircle2, Clock, MapPin,
  Search, Filter, ChevronRight, Zap, AlertTriangle, Lock, Eye, EyeOff, LogOut, ShieldCheck
} from "lucide-react";

const ADMIN_CREDENTIALS = [
  { username: "admin",    password: "admin",  role: "Super Admin" },
  { username: "ops",      password: "ops@vean1",  role: "Operations Manager" },
  { username: "engineer", password: "eng#portal", role: "Lead Engineer" },
];

function AdminLogin({ onLogin }: { onLogin: (user: { username: string; role: string }) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) { setError("Please enter both username and password."); return; }
    setLoading(true); setError("");
    await new Promise((r) => setTimeout(r, 800));
    const match = ADMIN_CREDENTIALS.find(
      (c) => c.username === username.trim().toLowerCase() && c.password === password
    );
    if (match) { onLogin({ username: match.username, role: match.role }); }
    else { setError("Invalid username or password. Please try again."); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl mb-4">
            <ShieldCheck size={28} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Admin Portal</h1>
          <p className="text-zinc-500 mt-2 text-sm">Vean Operations Centre — restricted access</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-5">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2">Username</label>
            <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
              placeholder="Enter your username" autoComplete="username" />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2">Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pr-12 text-white font-medium focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                placeholder="Enter your password" autoComplete="current-password" />
              <button onClick={() => setShowPass((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors" tabIndex={-1}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold px-4 py-3 rounded-xl">
                  <AlertTriangle size={16} /> {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-blue-400 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-950 font-black py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
            {loading ? <span className="inline-block w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" /> : <><Lock size={16} /> Sign In</>}
          </button>
          <p className="text-center text-xs text-zinc-600 pt-2">Access is restricted to authorised Vean staff only.<br />Unauthorised access attempts are logged.</p>
        </div>
      </motion.div>
    </div>
  );
}

export function AdminDashboard() {
  const [authed, setAuthed]           = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; role: string } | null>(null);
  const [activeTab, setActiveTab]     = useState("installations");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin  = (user: { username: string; role: string }) => { setCurrentUser(user); setAuthed(true); };
  const handleLogout = () => { setAuthed(false); setCurrentUser(null); };

  if (!authed) return <AdminLogin onLogin={handleLogin} />;

  const stats = [
    { label: "Pending Installs",   value: "24",    icon: <Clock size={20} className="text-amber-400" /> },
    { label: "Active Connections", value: "1,204", icon: <Zap size={20} className="text-blue-400" /> },
    { label: "Engineers Active",   value: "8",     icon: <Users size={20} className="text-blue-400" /> },
    { label: "Network Load",       value: "34%",   icon: <Activity size={20} className="text-purple-400" /> },
  ];

  const installations = [
    { id: "INS-001", name: "Alex Smith",   address: "123 Fibre Street, London",  date: "Today, 09:00",    status: "in-progress", engineer: "Dave W."    },
    { id: "INS-002", name: "Sarah Jones",  address: "45 Connect Avenue, London", date: "Today, 11:30",    status: "pending",     engineer: "Dave W."    },
    { id: "INS-003", name: "Michael Chen", address: "78 Speed Road, London",     date: "Today, 14:00",    status: "pending",     engineer: "Sarah T."   },
    { id: "INS-004", name: "Emma Wilson",  address: "12 Gigabit Lane, London",   date: "Tomorrow, 09:00", status: "scheduled",   engineer: "Unassigned" },
    { id: "INS-005", name: "James Brown",  address: "88 Router Way, London",     date: "Yesterday",       status: "completed",   engineer: "Mike R."    },
  ];

  const filtered = installations.filter(
    (j) => j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           j.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
           j.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-progress": return <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Activity size={12} /> In Progress</span>;
      case "pending":     return <span className="bg-blue-400/10 text-blue-400 border border-blue-400/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={12} /> Pending</span>;
      case "scheduled":   return <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={12} /> Scheduled</span>;
      case "completed":   return <span className="bg-blue-400/10 text-blue-400 border border-blue-400/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12} /> Completed</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-14 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 w-full">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-zinc-400 text-xs font-bold uppercase tracking-wide mb-3">
              <Activity size={14} className="text-blue-400" /> Operations Centre
            </div>
            <h1 className="text-4xl font-black tracking-tighter">Admin Dashboard</h1>
            <div className="mt-2 inline-flex items-center gap-2 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full text-blue-400 text-xs font-bold">
              <ShieldCheck size={12} /> {currentUser?.role} — @{currentUser?.username}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl font-bold text-sm border border-zinc-800 transition-colors">Export Report</button>
            <button className="bg-blue-400 hover:bg-blue-500 text-zinc-950 px-4 py-2 rounded-xl font-bold text-sm transition-transform active:scale-95">New Installation</button>
            <button onClick={handleLogout} className="bg-zinc-900 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-zinc-400 px-4 py-2 rounded-xl font-bold text-sm border border-zinc-800 transition-colors flex items-center gap-2">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-5 opacity-20 group-hover:opacity-40 transition-opacity">{stat.icon}</div>
              <div className="text-zinc-500 font-bold text-sm mb-2">{stat.label}</div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-zinc-800 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
              {["installations", "engineers", "network"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-colors ${activeTab === tab ? "bg-blue-400 text-zinc-950" : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input type="text" placeholder="Search jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all text-white placeholder:text-zinc-600" />
              </div>
              <button className="bg-zinc-950 border border-zinc-800 text-zinc-400 p-2 rounded-xl hover:text-white transition-colors shrink-0"><Filter size={18} /></button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "installations" && (
              <motion.div key="installations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-950/50 text-zinc-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-bold">Job ID</th><th className="p-4 font-bold">Customer</th>
                        <th className="p-4 font-bold">Address</th><th className="p-4 font-bold">Time</th>
                        <th className="p-4 font-bold">Engineer</th><th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {filtered.length > 0 ? filtered.map((job) => (
                        <tr key={job.id} className="hover:bg-zinc-800/20 transition-colors group">
                          <td className="p-4 text-sm font-mono text-zinc-400">{job.id}</td>
                          <td className="p-4 text-sm font-bold text-white">{job.name}</td>
                          <td className="p-4 text-sm text-zinc-400"><div className="flex items-center gap-2"><MapPin size={14} />{job.address}</div></td>
                          <td className="p-4 text-sm font-medium">{job.date}</td>
                          <td className="p-4 text-sm text-zinc-300">{job.engineer}</td>
                          <td className="p-4">{getStatusBadge(job.status)}</td>
                          <td className="p-4 text-right"><button className="text-zinc-500 hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"><ChevronRight size={20} /></button></td>
                        </tr>
                      )) : (
                        <tr><td colSpan={7} className="p-12 text-center text-zinc-500 text-sm">No results for "{searchQuery}"</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
            {activeTab === "engineers" && (
              <motion.div key="engineers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-12 text-center text-zinc-500 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-zinc-950 rounded-full flex items-center justify-center mb-4 text-zinc-700"><Users size={32} /></div>
                <h3 className="text-lg font-bold text-white mb-2">Engineer Fleet View</h3>
                <p className="max-w-md text-sm">Track your installation fleet in real-time. Coming in the next update.</p>
              </motion.div>
            )}
            {activeTab === "network" && (
              <motion.div key="network" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-12 text-center text-zinc-500 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-zinc-950 rounded-full flex items-center justify-center mb-4 text-blue-400/50"><Cable size={32} /></div>
                <h3 className="text-lg font-bold text-white mb-2">Network Health</h3>
                <p className="max-w-md text-sm">1,204 active gigabit connections. All systems operational with 99.99% uptime.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
