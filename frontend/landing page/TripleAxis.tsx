import { Zap, Search, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const TripleAxis = () => {
  const features = [
    {
      title: "Multilingual Cap-Detection",
      description: "From Arabic and French to Spanish and English. Our AI decodes slurs and coded hate across the entire Mediterranean basin.",
      icon: <Zap size={40} />,
      accent: "border-[#e12320]",
      badge: "AI Powered"
    },
    {
      title: "Narrative Archeology",
      description: "Spotted a 'Cap' narrative? We show you how disinformation travels across borders to polarize our youth.",
      icon: <Search size={40} />,
      accent: "border-black",
      badge: "Cross-Border"
    },
    {
      title: "Synthetic Vision",
      description: "Identify deepfakes and AI-gen images designed to trigger regional tensions. We see the 'Machine' behind the manipulation.",
      icon: <Eye size={40} />,
      accent: "border-[#e12320]",
      badge: "Deepfake Radar"
    }
  ];

  return (
    <section className="py-24 bg-[#FAF9F6] border-y-[3px] border-black">
      <div className="container mx-auto px-4">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-black tracking-tighter">
            The Triple Axis <br />
            <span className="text-[#e12320]">Euro-Med Defense</span>
          </h2>
          <div className="h-3 w-40 bg-black" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`neo-card group bg-white ${feature.accent}`}
            >
              <div className="mb-8 flex justify-between items-start">
                <div className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#e12320]">
                  {feature.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-3 py-1">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-3xl font-black mb-4 leading-tight text-black">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed mb-8 text-lg">
                {feature.description}
              </p>
              <div className="mt-auto">
                <button className="text-sm font-black uppercase tracking-tighter flex items-center gap-3 group/btn">
                  Learn Strategy 
                  <span className="group-hover/btn:translate-x-2 transition-transform h-8 w-8 rounded-full border-2 border-black flex items-center justify-center">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripleAxis;
