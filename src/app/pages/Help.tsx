import { motion } from "motion/react";
import { Plus, Minus, MessageSquare, Phone, Mail } from "lucide-react";
import { useState } from "react";

export function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "When can I get Vean full fibre?",
      a: "If you've checked your postcode and we're live, you can book an installation right away! If not, you can pre-register and we'll let you know the second we start building in your area."
    },
    {
      q: "Do I need a landline?",
      a: "Nope! Full fibre doesn't use old copper phone lines, so there's no need to pay for a landline you don't use. If you do want a home phone, we offer a VoIP add-on."
    },
    {
      q: "Will my price go up mid-contract?",
      a: "Never. We believe in complete transparency and fair pricing, so our prices are fixed for your entire contract term. What you see is what you pay."
    },
    {
      q: "Can I use my own router?",
      a: "Yes, you absolutely can! While we provide a high-end Wi-Fi 6 router for free, power users are more than welcome to use their own mesh systems or gaming routers. Just plug it into the ONT."
    }
  ];

  return (
    <div className="flex flex-col w-full bg-zinc-950 text-zinc-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
          >
            How can we <span className="text-lime-400">help?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-400"
          >
            Find answers to common questions below, or get in touch with our UK-based team.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FAQs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-black mb-8">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`border border-zinc-800 rounded-2xl p-6 transition-colors cursor-pointer ${openFaq === i ? "bg-zinc-900" : "bg-zinc-950 hover:bg-zinc-900/50"}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="font-bold text-lg">{faq.q}</h3>
                    <div className="text-lime-400 flex-shrink-0">
                      {openFaq === i ? <Minus size={24} /> : <Plus size={24} />}
                    </div>
                  </div>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-zinc-400 mt-4 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Methods */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl font-black mb-2">Get in touch</h2>
            <p className="text-zinc-400 mb-6">Our support team is available from 8am to 8pm, 7 days a week.</p>
            
            <div className="bg-lime-400 text-zinc-950 p-8 rounded-3xl flex items-center gap-6 hover:bg-lime-500 transition-colors cursor-pointer group">
              <div className="bg-zinc-950 text-lime-400 p-4 rounded-full group-hover:scale-110 transition-transform">
                <MessageSquare size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black mb-1">Live Chat</h3>
                <p className="font-medium text-zinc-800">Average response time: 2 mins</p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl flex items-center gap-6 hover:bg-zinc-800 transition-colors cursor-pointer group">
              <div className="bg-zinc-950 text-white border border-zinc-800 p-4 rounded-full group-hover:scale-110 transition-transform">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-1">Call Us</h3>
                <p className="text-zinc-400">0800 123 4567</p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl flex items-center gap-6 hover:bg-zinc-800 transition-colors cursor-pointer group">
              <div className="bg-zinc-950 text-white border border-zinc-800 p-4 rounded-full group-hover:scale-110 transition-transform">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-1">Email</h3>
                <p className="text-zinc-400">help@veanfibre.co.uk</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
