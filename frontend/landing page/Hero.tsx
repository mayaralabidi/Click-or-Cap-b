import { ShieldCheck, Globe, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import ExtensionPreview from './ExtensionPreview';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border-2 border-black/10 rounded-full" />
        <div className="scan-line" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 mb-6 border-2 border-black bg-black text-white font-bold text-xs tracking-[0.2em] uppercase">
              Euro-Med Digital Co-Pilot
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tighter text-black">
              Spot the <span className="underline decoration-[8px] decoration-[#e12320]">Narrative.</span><br />
              Stop the <span className="text-[#e12320]">Cap.</span> <span className="inline-block animate-bounce">🧢</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-gray-600 font-medium max-w-xl leading-snug">
              Double-click to audit any post, decode cross-border disinformation, and protect our shared Mediterranean digital citizenship.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <a href="/extension.zip" download className="neo-btn flex items-center gap-3 group">
                Download Extension <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </a>
              <button className="neo-btn-secondary flex items-center gap-3">
                Research Hub
              </button>
            </div>
            
            <div className="mt-16 flex gap-12">
              <div className="flex flex-col">
                <span className="text-5xl font-black text-black">2.4M+</span>
                <span className="text-xs font-bold text-[#e12320] uppercase tracking-widest mt-1">Caps Detected</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-black text-black">42</span>
                <span className="text-xs font-bold text-[#e12320] uppercase tracking-widest mt-1">Partner Cities</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
             {/* Abstract Background Shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e12320]/5 rounded-full blur-3xl -z-10" />

            <div className="relative z-10">
               {/* Extension Interface Mockup with Animation */}
               <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
               >
                  <div className="absolute -inset-4 bg-black/5 rotate-6 rounded-sm scale-95 blur-sm" />
                  <div className="rotate-[-2deg]">
                     <ExtensionPreview />
                  </div>
               </motion.div>

              {/* Floaties */}
              <motion.div 
                className="absolute -top-12 -right-12 bg-white border-[3px] border-black p-4 shadow-[6px_6px_0px_0px_#e12320] hidden md:block z-20"
                animate={{ y: [15, -15, 15], rotate: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <ShieldCheck size={32} className="text-[#e12320]" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-8 -left-16 bg-black border-[3px] border-black p-4 shadow-[6px_6px_0px_0px_#FFFFFF] hidden md:block z-20"
                animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                transition={{ duration: 7, repeat: Infinity }}
              >
                <Globe size={32} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
