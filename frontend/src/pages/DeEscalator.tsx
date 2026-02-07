import React, { useState } from 'react';

const API_BASE = 'http://localhost:8000';

const DeEscalator = () => {
  const [text, setText] = useState('');
  const [replies, setReplies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateReplies = async () => {
    if (!text) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/decision/de-escalate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: text })
      });
      const data = await res.json();
      setReplies(data.options || []);
    } catch (error) {
       setError('Error contacting AI assistant. Ensure server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b-[3px] border-black pb-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-2">De-Escalation Assistant 🕊️</h2>
        <p className="text-xl text-gray-600 font-medium">Received a toxic message? Generate safe and constructive ways to reply.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit">
          <label className="block text-sm font-black uppercase tracking-widest text-black mb-4">Toxic Context</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the rude comment you received here..."
            className="w-full h-40 bg-gray-50 text-black border-2 border-black p-4 focus:outline-none focus:ring-0 focus:bg-white focus:shadow-[4px_4px_0px_0px_#e12320] transition-all placeholder:text-gray-400 font-medium text-lg resize-none mb-6"
          />
          
          <button
            onClick={generateReplies}
            disabled={loading || !text}
            className="w-full neo-btn py-4 text-lg"
          >
            {loading ? 'Generating...' : 'Generate Replies'}
          </button>
          
          {error && <p className="mt-4 text-[#e12320] font-bold border-2 border-[#e12320] p-2 bg-[#e12320]/10">{error}</p>}
        </div>

        <div className="space-y-4">
           {!replies.length && !loading && (
              <div className="border-2 border-dashed border-gray-300 rounded-xl h-full min-h-[300px] flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-center p-8">
                 Replies will appear using our<br/>Proprietary De-Escalation Engine
              </div>
           )}

           {replies.length > 0 && (
             <>
               <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Suggested Replies</h3>
               {replies.map((reply, i) => (
                  <div 
                    key={i}
                    onClick={() => { navigator.clipboard.writeText(reply); alert('Copied!'); }}
                    className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#e12320] hover:border-[#e12320] cursor-pointer transition-all group relative animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <p className="text-lg font-bold group-hover:text-[#e12320] transition-colors">{reply}</p>
                    <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wider font-black text-black bg-[#e12320] text-white px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                  </div>
                ))}
                <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 mt-4">Click any reply to copy to clipboard</p>
             </>
           )}
        </div>
      </div>
    </div>
  );
};

export default DeEscalator;
