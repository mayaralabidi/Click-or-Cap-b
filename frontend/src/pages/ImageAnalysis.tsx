import React, { useState } from 'react';
import { Upload, X, AlertTriangle, ShieldCheck, Ban, Loader2 } from 'lucide-react';

const API_BASE = 'http://localhost:8000';

const ImageAnalysis = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setResult(null); // Reset result on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/decision/analyze-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_data: image
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Analysis failed');
      }
      setResult(data);
    } catch (error: any) {
      alert('Error analyzing image: ' + (error.message || String(error)));
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (action: string) => {
      switch (action) {
          case 'HIDE': return { icon: Ban, color: 'text-white', bg: 'bg-[#e12320]', border: 'border-black', label: 'HIDE CONTENT' };
          case 'WARN': return { icon: AlertTriangle, color: 'text-black', bg: 'bg-[#eab308]', border: 'border-black', label: 'WARNING' };
          default: return { icon: ShieldCheck, color: 'text-white', bg: 'bg-[#22c55e]', border: 'border-black', label: 'SAFE' };
      }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b-[3px] border-black pb-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-2">Hate Speech Image Detector 📸</h2>
        <p className="text-xl text-gray-600 font-medium">Upload a screenshot or meme to check for visual hate speech symbols or text.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
              <div 
                onClick={() => document.getElementById('fileInput')?.click()}
                className={`border-[3px] border-dashed border-black bg-gray-50 rounded-none h-96 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-[#e12320]/5 hover:border-[#e12320] group relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0px_0px_#e12320] ${image ? 'border-solid' : ''}`}
              >
                  {image ? (
                      <div className="relative w-full h-full p-4 flex items-center justify-center bg-white">
                          <img src={image} alt="Preview" className="max-w-full max-h-full object-contain" />
                          <button 
                            onClick={(e) => { e.stopPropagation(); setImage(null); setResult(null); }}
                            className="absolute top-4 right-4 bg-black text-white p-2 border-2 border-white hover:bg-[#e12320] transition-colors shadow-[4px_4px_0px_0px_white]"
                          >
                              <X size={20} />
                          </button>
                      </div>
                  ) : (
                      <div className="text-center p-6">
                          <div className="w-20 h-20 bg-black text-white border-[3px] border-black flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_#e12320]">
                              <Upload size={32} />
                          </div>
                          <p className="text-2xl font-black uppercase tracking-tighter text-black">Click to upload</p>
                          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Supports JPG, PNG</p>
                      </div>
                  )}
                  <input type="file" id="fileInput" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </div>

              <button
                onClick={analyzeImage}
                disabled={!image || loading}
                className="w-full neo-btn py-4 text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && <Loader2 className="animate-spin" />}
                {loading ? 'Analyzing...' : 'Analyze Image'}
              </button>
          </div>

          {/* Results Section */}
          <div className="relative h-full">
             {!result && !loading && (
                 <div className="h-full flex items-center justify-center border-[3px] border-dashed border-gray-300 bg-gray-50 text-gray-400 font-bold uppercase tracking-widest text-xl p-12 text-center">
                     Analysis results will appear here
                 </div>
             )}
            
             {result && (
                 <div className="bg-white border-[3px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col justify-between">
                     {(() => {
                         const config = getStatusConfig(result.action);
                         return (
                             <>
                                <div>
                                    <div className={`inline-flex items-center gap-3 px-6 py-2 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${config.bg} ${config.color} mb-8`}>
                                        <config.icon size={24} strokeWidth={3} />
                                        <span className="font-black text-xl uppercase tracking-widest">{config.label}</span>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-sm text-gray-500 font-black uppercase tracking-widest">Toxicity Score</span>
                                                <span className="text-4xl font-black text-black">{result.score}/100</span>
                                            </div>
                                            <div className="h-6 bg-gray-100 border-2 border-black p-0.5">
                                                <div 
                                                    className={`h-full ${config.bg} border-r-2 border-black transition-all duration-1000 ease-out`} 
                                                    style={{ width: `${result.score}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-black text-black uppercase tracking-widest mb-2 border-b-2 border-black inline-block">Detection Reason</h4>
                                            <p className="text-black text-2xl font-bold leading-tight mt-2">{result.reason}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 border-2 border-black mt-8">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Detailed Analysis</h4>
                                    <p className="text-gray-800 text-lg font-medium leading-relaxed">{result.analysis}</p>
                                </div>
                             </>
                         )
                     })()}
                 </div>
             )}
          </div>
      </div>
    </div>
  );
};

export default ImageAnalysis;
