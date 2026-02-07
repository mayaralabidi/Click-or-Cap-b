import React, { useState } from 'react';

const API_BASE = 'http://localhost:8000';

const TextAnalysis = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeContent = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/decision/engine`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
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

  const getBadgeStyle = (action: string) => {
    const act = action?.toUpperCase();
    if (act === 'ALLOW') return 'bg-[#22c55e] text-white border-black';
    if (act === 'WARN') return 'bg-[#eab308] text-black border-black';
    return 'bg-[#e12320] text-white border-black';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b-[3px] border-black pb-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-2">Content Analysis Agent</h2>
        <p className="text-xl text-gray-600 font-medium">Analyze text for toxicity, hate speech, and harmful content.</p>
      </div>

      <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <label className="block text-sm font-black uppercase tracking-widest text-black mb-4">Check Text for Toxicity</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste some text here to check if it's safe..."
          className="w-full h-40 bg-gray-50 text-black border-2 border-black p-4 focus:outline-none focus:ring-0 focus:bg-white focus:shadow-[4px_4px_0px_0px_#e12320] transition-all placeholder:text-gray-400 font-medium text-lg resize-none mb-6"
        />
        
        <div className="flex justify-end">
          <button
            onClick={analyzeContent}
            disabled={loading || !text}
            className="neo-btn py-3 px-8 text-lg"
          >
            {loading ? 'Analyzing...' : 'Check Text'}
          </button>
        </div>

        {result && (
          <div className="mt-8 border-[3px] border-black p-6 bg-gray-50 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-4 mb-4 border-b-2 border-black pb-4">
              <span className={`px-4 py-1 text-sm font-black border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${getBadgeStyle(result.action)}`}>
                {result.action.toUpperCase()}
              </span>
              <span className="font-black text-xl">Score: <span className="underline decoration-4 decoration-[#e12320]">{result.score.toFixed(1)}</span></span>
            </div>
            <p className="text-xl font-bold leading-relaxed">{result.reason}</p>
            {result.replacement_content && (
              <div className="mt-6 bg-[#e12320]/5 border-2 border-[#e12320] p-4">
                <p className="text-sm font-black text-[#e12320] uppercase tracking-widest mb-1">Suggestion</p>
                <p className="text-lg italic font-medium">
                  {result.replacement_content}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextAnalysis;
