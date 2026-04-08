import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Navbar } from "./Navbar";

export function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col w-full bg-zinc-950 min-h-screen text-zinc-50">
      <Navbar />
      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6">
              Get in <span className="text-blue-400">touch.</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 mb-10 sm:mb-12">
              Have a question about our services? Our UK-based support team is ready to help you out.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-blue-400 shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Call Us</h3>
                  <p className="text-zinc-400 mb-1">0800 123 4567</p>
                  <p className="text-zinc-500 text-sm">Mon-Sun, 8am - 8pm</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-blue-400 shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Email Support</h3>
                  <p className="text-zinc-400">help@veanfibre.co.uk</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-blue-400 shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Headquarters</h3>
                  <p className="text-zinc-400">
                    123 Fibre Way, Tech District
                    <br />
                    London, E1 4AZ
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 sm:p-10"
          >
            <h2 className="text-3xl font-black mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-500 text-zinc-950 font-black px-8 py-4 rounded-xl text-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                {submitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
