import React, { useState } from 'react';

const API_BASE = 'http://localhost:8000';

const EmpathyMirror = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkEmpathy = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/decision/empathy-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft_text: text })
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error contacting the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b-[3px] border-black pb-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-2">Empathy Mirror 🪞</h2>
        <p className="text-xl text-gray-600 font-medium">See how your message sounds to others before you send it.</p>
      </div>

      <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <label className="block text-sm font-black uppercase tracking-widest text-black mb-4">Draft Check</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your draft here..."
          className="w-full h-40 bg-gray-50 text-black border-2 border-black p-4 focus:outline-none focus:ring-0 focus:bg-white focus:shadow-[4px_4px_0px_0px_#e12320] transition-all placeholder:text-gray-400 font-medium text-lg resize-none mb-6"
        />
        
        <div className="flex justify-end">
          <button
            onClick={checkEmpathy}
            disabled={loading || !text}
            className="neo-btn py-3 px-8 text-lg hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
          >
            {loading ? 'Checking...' : 'Check Draft'}
          </button>
        </div>

        {result && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 animate-in fade-in zoom-in-95 duration-300">
             <div className="w-24 h-24 flex items-center justify-center bg-black text-white border-[3px] border-black text-6xl shadow-[4px_4px_0px_0px_#e12320]">
                {result.predicted_reaction_emoji}
             </div>
             
             <div className="space-y-4">
               <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   <p className="text-sm font-black uppercase tracking-widest text-[#e12320] mb-1">Analysis</p>
                   <p className="text-lg font-bold">{result.warning_message}</p>
                </div>

                <div className="bg-[#22c55e]/10 border-2 border-[#22c55e] p-4 shadow-[4px_4px_0px_0px_#22c55e]">
                  <p className="text-sm font-black uppercase tracking-widest text-[#22c55e] mb-1">Better Version</p>
                  <p className="text-lg italic font-medium text-black">"{result.civilized_version}"</p>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpathyMirror;
