import { motion } from 'framer-motion';

const CapWall = () => {
  const caps = [
    {
      region: "Tunis",
      language: "Arabic",
      tactic: "AI-Gen",
      content: "Viral image of 'migrant wave' found to be synthetic vision manipulation.",
      date: "2h ago",
      color: "border-[#e12320]"
    },
    {
      region: "Marseille",
      language: "French",
      tactic: "Scapegoating",
      content: "Coordinated narrative blaming youth for regional inflation trends.",
      date: "5h ago",
      color: "border-black"
    },
    {
      region: "Beirut",
      language: "Arabic",
      tactic: "Deepfake",
      content: "Audio clip of politician forged to trigger cross-border tensions.",
      date: "12h ago",
      color: "border-[#e12320]"
    },
    {
      region: "Berlin",
      language: "German",
      tactic: "Polarization",
      content: "Bot-driven thread targeting Euro-Med cultural exchange programs.",
      date: "1d ago",
      color: "border-black"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Dots */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-black mb-8 leading-none tracking-tighter text-black">
              The Euro-Med <br />
              <span className="text-[#e12320] underline decoration-black">Cap Wall</span> 🌍
            </h2>
            <p className="text-2xl text-gray-600 font-medium leading-snug">
              A live, anonymized feed of disinformation tactics found by users from Marseille to Tunis. We expose the tactics to build collective immunity.
            </p>
          </div>
          <button className="neo-btn-secondary whitespace-nowrap">
            View Live Feed
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {caps.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`neo-card bg-white p-8 h-full flex flex-col ${cap.color}`}
            >
              <div className="flex gap-2 mb-6 flex-wrap">
                <span className="bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-tighter">
                  #{cap.region}
                </span>
                <span className="bg-[#FAF9F6] text-black text-[10px] font-black px-3 py-1 uppercase tracking-tighter border border-black/10">
                  #{cap.language}
                </span>
                <span className="bg-[#FAF9F6] text-black text-[10px] font-black px-3 py-1 uppercase tracking-tighter border border-black/10">
                  #{cap.tactic}
                </span>
              </div>
              
              <p className="text-xl font-bold mb-8 italic leading-tight text-black">
                "{cap.content}"
              </p>
              
              <div className="mt-auto flex justify-between items-center pt-6 border-t-[1.5px] border-black/5">
                <span className="text-[#e12320] font-black text-xs uppercase tracking-widest">
                  Verified Report
                </span>
                <span className="text-gray-400 font-bold text-xs uppercase">
                  {cap.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Scroller background text */}
        <div className="mt-24 overflow-hidden whitespace-nowrap pointer-events-none opacity-[0.05]">
          <div className="inline-block animate-[scroll_40s_linear_infinite] text-[10rem] font-black uppercase text-black leading-none py-4">
            Expose the Cap • Build Immunity • Protect the Basin • Expose the Cap • Build Immunity • Protect the Basin •
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default CapWall;
