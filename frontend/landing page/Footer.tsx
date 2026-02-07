const Footer = () => {
  return (
    <footer className="bg-white border-t-[5px] border-black py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="flex flex-wrap items-center gap-10 mb-12">
              {/* Euromed Logo */}
              <div className="border-[3px] border-black p-4 bg-white shadow-[6px_6px_0px_0px_#000] rotate-2">
                <span className="text-black font-black text-2xl tracking-tighter italic">EUROMED</span>
              </div>
              <span className="text-5xl font-light text-black/20">×</span>
              {/* YSCI Logo */}
              <div className="border-[3px] border-black p-4 bg-[#e12320] shadow-[6px_6px_0px_0px_#000] -rotate-2">
                <span className="text-white font-black text-2xl tracking-tighter italic">YSCI</span>
              </div>
            </div>
            
            <p className="text-3xl font-black leading-none mb-10 max-w-lg text-black uppercase tracking-tighter">
              CLICK or CAP is an initiative supporting the Euro-Mediterranean vision.
            </p>
            
            <p className="text-xl text-gray-500 font-medium max-w-md leading-relaxed uppercase tracking-tight">
              In partnership with YSCI, we build a safer digital future for the next generation of digital natives.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6">
              <h4 className="font-black uppercase text-sm tracking-widest text-[#e12320]">Navigation</h4>
              <a href="#" className="font-bold hover:text-[#e12320] transition-colors uppercase text-sm border-b-2 border-transparent hover:border-black w-fit">Audit Tool</a>
              <a href="#" className="font-bold hover:text-[#e12320] transition-colors uppercase text-sm border-b-2 border-transparent hover:border-black w-fit">Research</a>
              <a href="#" className="font-bold hover:text-[#e12320] transition-colors uppercase text-sm border-b-2 border-transparent hover:border-black w-fit">Leaderboard</a>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="font-black uppercase text-sm tracking-widest text-black/40">Community</h4>
              <a href="#" className="font-bold hover:text-[#e12320] transition-colors uppercase text-sm border-b-2 border-transparent hover:border-black w-fit">Wall of Cap</a>
              <a href="#" className="font-bold hover:text-[#e12320] transition-colors uppercase text-sm border-b-2 border-transparent hover:border-black w-fit">Youth Forum</a>
              <a href="#" className="font-bold hover:text-[#e12320] transition-colors uppercase text-sm border-b-2 border-transparent hover:border-black w-fit">Resilience Hub</a>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="font-black uppercase text-sm tracking-widest text-black">Basin Legal</h4>
              <a href="#" className="font-bold hover:text-[#e12320] transition-colors uppercase text-sm border-b-2 border-transparent hover:border-black w-fit">Privacy</a>
              <a href="#" className="font-bold hover:text-[#e12320] transition-colors uppercase text-sm border-b-2 border-transparent hover:border-black w-fit">Ethical AI</a>
              <a href="#" className="font-bold hover:text-[#e12320] transition-colors uppercase text-sm border-b-2 border-transparent hover:border-black w-fit">Mission</a>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-12 border-t-[3px] border-black flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-black text-white border-[3px] border-black flex items-center justify-center -rotate-6 shadow-[4px_4px_0px_0px_#e12320]">
              <span className="font-black text-xl">C/C</span>
            </div>
            <span className="font-black uppercase tracking-tighter text-black text-lg">© 2026 CLICK or CAP • ITBS Hackathon</span>
          </div>
          <div className="flex gap-12">
            <a href="#" className="font-black text-sm hover:text-[#e12320] uppercase transition-colors border-b-4 border-black pb-1">Instagram</a>
            <a href="#" className="font-black text-sm hover:text-[#e12320] uppercase transition-colors border-b-4 border-black pb-1">Twitter</a>
            <a href="#" className="font-black text-sm hover:text-[#e12320] uppercase transition-colors border-b-4 border-black pb-1">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
