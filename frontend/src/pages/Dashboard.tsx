import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center border-b-[3px] border-black pb-6 bg-white px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div>
           <div className="inline-block px-3 py-1 mb-2 border-2 border-black bg-black text-white font-bold text-xs tracking-[0.1em] uppercase">
              System Overview
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black">
              Hate Weather Report
            </h2>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Global Status</div>
          <div className="text-xl font-black bg-[#e12320] text-white px-4 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
             MOSTLY PEACEFUL
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Messages Analyzed", value: "1,248", color: "text-black" },
          { label: "Toxicity Blocked", value: "14%", color: "text-[#e12320]" },
          { label: "Empathy Used", value: "856", color: "text-black" },
          { label: "Users Protected", value: "342", color: "text-black" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</div>
            <div className={`text-5xl font-black ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
           <span className="w-3 h-8 bg-[#e12320] block"></span>
           Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="pb-4 border-b-2 border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 border-2 border-black font-bold">🛡️</div>
            <div>
               <b className="text-black font-black">User_842</b> <span className="text-gray-600">de-escalated a thread in #gaming</span>
            </div>
          </div>
          <div className="pb-4 border-b-2 border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#e12320]/10 border-2 border-[#e12320] font-bold">⚠️</div>
            <div>
               <b className="text-[#e12320] font-black">Auto-Mod</b> <span className="text-black">flagged a comment (Severity: 85%)</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 flex items-center justify-center bg-gray-100 border-2 border-black font-bold">🪞</div>
            <div>
               <b className="text-black font-black">User_11</b> <span className="text-gray-600">rewrote a draft using Empathy Mirror</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
