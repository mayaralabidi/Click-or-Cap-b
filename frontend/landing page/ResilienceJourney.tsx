import { Award, Shield, UserCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ResilienceJourney = () => {
  const badges = [
    { name: "Cultural Bridge", icon: <UserCheck size={32} />, color: "bg-[#e12320] text-white", desc: "For cross-border audits" },
    { name: "Disinfo Decoder", icon: <Shield size={32} />, color: "bg-black text-white", desc: "For finding top-tier caps" },
    { name: "Truth Sentinel", icon: <Star size={32} />, color: "bg-[#e12320] text-white", desc: "For 90% accuracy" },
    { name: "Impact Maker", icon: <Award size={32} />, color: "bg-[#FAF9F6] text-black", desc: "For high community reach" }
  ];

  return (
    <section className="py-24 bg-[#FAF9F6] border-b-[3px] border-black overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl md:text-8xl font-black mb-10 leading-none tracking-tighter text-black">
              Your Resilience <br />
              <span className="text-[#e12320]">Journey</span>
            </h2>
            <p className="text-2xl text-gray-600 font-medium mb-12 leading-snug">
              Earn Resilience Points for every audit. Track your progress as an Intercultural Digital Citizen and compete for the Euro-Med Leaderboard.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white border-[3px] border-black p-6 flex items-center gap-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className={`p-3 border-2 border-black ${badge.color} flex-shrink-0`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-tighter mb-1 text-black">{badge.name}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{badge.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Leaderboard Mockup */}
            <div className="neo-card bg-white p-10 max-w-lg mx-auto relative z-10 shadow-[12px_12px_0px_0px_#e12320]">
              <div className="flex justify-between items-center mb-12 pb-6 border-b-[3.5px] border-black">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-black">Basin Leaderboard</h3>
                <span className="bg-[#e12320] text-white px-3 py-1 font-black text-xs tracking-widest animate-pulse">LIVE</span>
              </div>
              
              <div className="space-y-8">
                {[
                  { name: "Sami_Tunis", score: "12,450", rank: 1, color: "text-[#e12320]" },
                  { name: "Elise_Marseille", score: "10,200", rank: 2, color: "text-black" },
                  { name: "Layla_Beirut", score: "9,800", rank: 3, color: "text-black" },
                  { name: "Marc_Barcelona", score: "8,500", rank: 4, color: "text-gray-400" }
                ].map((user, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer">
                    <div className="flex items-center gap-6">
                      <span className={`text-2xl font-black tabular-nums ${i === 0 ? 'text-[#e12320]' : 'text-black'}`}>0{user.rank}</span>
                      <span className="font-black text-xl uppercase tracking-tighter group-hover:text-[#e12320] transition-colors">{user.name}</span>
                    </div>
                    <span className="font-black tabular-nums text-lg border-b-2 border-transparent group-hover:border-[#e12320]">{user.score} XP</span>
                  </div>
                ))}
              </div>
              
              <button className="neo-btn w-full mt-12 py-4">
                Claim Your Rank
              </button>
            </div>
            
            {/* Background pattern */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#e12320]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-black/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResilienceJourney;
