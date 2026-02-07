import { Shield, EyeOff, FileText, ArrowLeft, Settings, Ghost, Wand2, Eraser, ScanSearch } from 'lucide-react';
import { useState } from 'react';
import ResultsPanel from './audit/ResultsPanel';
import type { AuditResponse } from '../types/audit';

type ViewState = 'main' | 'audit' | 'hider' | 'text';

const ExtensionPreview = () => {
  const [view, setView] = useState<ViewState>('main');
  
  // Static Preview Data
  const auditEnabled = true;
  const hiderEnabled = true;
  const textChangerEnabled = false;
  // Simulating loading state for preview
  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [hiderMode, setHiderMode] = useState('sensor');
  const [showAuditResults, setShowAuditResults] = useState(false);
  
  const saveHiderMode = (mode: string) => setHiderMode(mode);

  const MOCK_AUDIT_DATA: AuditResponse = {
    analysis_id: 'mock-1',
    axes: {
      toxicity: { score: 78, severity: 'HIGH', markers: ['identity-based harassment', 'dehumanizing language'], interpretation: 'High toxicity detected. Language targets specific groups.', action_options: ['Report', 'Block'] },
      veracity: { score: 34, severity: 'LOW', markers: ['Fear-mongering', 'No sources'], interpretation: 'Low veracity. Content uses emotional manipulation.', fact_check_url: '#' },
      authenticity: { score: 62, severity: 'MODERATE', markers: ['Synthetic patterns'], interpretation: 'Possible AI generation detected.' }
    },
    overall_trust_impact: -15,
    ysci_category: 'Fighting Disinformation'
  };

  // Simulate fetch
  if (trustScore === null) {
      setTimeout(() => setTrustScore(67), 1000);
  }

  // Reusable sub-page layout
  const SubPage = ({ title, onBack, description }: { title: string, onBack: () => void, description?: string }) => (
    <div className="w-full h-full flex flex-col pt-2 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-6 border-b-[3px] border-black pb-4">
        <button 
          onClick={(e) => { e.preventDefault(); onBack(); }}
          type="button"
          className="hover:bg-gray-200 p-2 rounded-full transition-colors border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-0.5 active:shadow-none bg-white"
        >
          <ArrowLeft size={20} className="text-black" />
        </button>
        <h2 className="text-xl font-black uppercase tracking-tight">{title}</h2>
      </div>
      
      <div className="flex-1 bg-white border-[3px] border-black p-6 shadow-[4px_4px_0px_0px_#e12320] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#FAF9F6] border-2 border-black rounded flex items-center justify-center mb-4">
            <Settings size={32} className="text-gray-400" />
          </div>
          <p className="text-black font-black uppercase text-lg mb-2">Configure</p>
          <p className="text-gray-500 font-bold text-sm">
            {description || "Settings for this feature will appear here in the next update."}
          </p>
      </div>
    </div>
  );

  return (
    <div className="w-[320px] h-[600px] bg-[#FAF9F6] p-5 font-space relative flex flex-col items-center">
      {view === 'main' ? (
        <>
          {/* 1. Static Profile Section */}
          <div className="flex flex-col items-center mb-8 w-full relative group">
            <div className="w-20 h-20 rounded-full border-[3px] border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#e12320] mb-3 overflow-hidden">
                <div className="w-full h-full bg-[#78a240] flex items-center justify-center border-2 border-black">
                    <span className="text-4xl font-black text-white">S</span>
                </div>
            </div>
            <h2 className="text-lg font-black uppercase tracking-tight text-black leading-none">
                PREVIEW USER
            </h2>
          </div>

          {/* 2. Score Section */}
          <div className="w-full bg-white border-[3px] border-black p-4 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden flex-1 flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#e12320]" />
            {trustScore === null ? (
               <div className="flex flex-col items-center justify-center h-[72px] animate-pulse">
                  <div className="h-12 w-24 bg-gray-200 rounded mb-2"></div>
               </div>
            ) : (
               <span className="block text-7xl font-black text-black leading-none mb-2 animate-in zoom-in duration-300">
                 {trustScore}
               </span>
            )}
            <span className="text-sm font-black uppercase tracking-[0.3em] text-[#e12320]">Trust Score</span>
            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-black/5 rounded-full blur-xl" />
          </div>

          {/* 3. Feature Cards Section */}
          <div className="grid grid-cols-3 gap-3 w-full pb-2">
            {/* Card 1: Audit */}
            <div className={`p-2 border-[2px] border-black flex flex-col items-center justify-between h-36 transition-all duration-300 ${auditEnabled ? 'bg-white shadow-[4px_4px_0px_0px_#e12320]' : 'bg-gray-100 opacity-80'}`}>
                <div 
                  onClick={() => setView('audit')}
                  className="w-10 h-10 rounded border-2 border-black flex items-center justify-center bg-[#FAF9F6] cursor-pointer hover:bg-gray-200 transition-colors"
                >
                    <Shield size={20} className={auditEnabled ? "text-black" : "text-gray-400"} />
                </div>
                <span className="font-bold text-xs uppercase tracking-tight mt-2 mb-auto">Audit</span>
                <div className="flex items-center gap-2">
                    <div className={`w-10 h-5 border-2 border-black rounded-full relative transition-colors ${auditEnabled ? 'bg-[#e12320]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white border-2 border-black rounded-full transition-all ${auditEnabled ? 'left-[18px]' : 'left-0.5'}`} />
                    </div>
                    <button onClick={() => setView('audit')} className="hover:rotate-45 transition-transform text-gray-400 hover:text-black">
                      <Settings size={14} />
                    </button>
                </div>
            </div>

            {/* Card 2: Hider */}
            <div 
              onClick={() => setView('hider')}
              className={`p-2 border-[2px] border-black flex flex-col items-center justify-between h-36 transition-all duration-300 cursor-pointer ${hiderEnabled ? 'bg-white shadow-[4px_4px_0px_0px_#e12320]' : 'bg-gray-100 opacity-80'}`}
            >
                <div 
                  onClick={() => setView('hider')}
                  className="w-10 h-10 rounded border-2 border-black flex items-center justify-center bg-[#FAF9F6] cursor-pointer hover:bg-gray-200 transition-colors"
                >
                    <EyeOff size={20} className={hiderEnabled ? "text-black" : "text-gray-400"} />
                </div>
                <span className="font-bold text-xs uppercase tracking-tight mt-2">Hider</span>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-auto">{hiderMode}</span>
                <div className="flex items-center gap-2">
                    <div className={`w-10 h-5 border-2 border-black rounded-full relative transition-colors ${hiderEnabled ? 'bg-[#e12320]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white border-2 border-black rounded-full transition-all ${hiderEnabled ? 'left-[18px]' : 'left-0.5'}`} />
                    </div>
                    <button onClick={() => setView('hider')} className="hover:rotate-45 transition-transform text-gray-400 hover:text-black">
                      <Settings size={14} />
                    </button>
                </div>
            </div>

            {/* Card 3: Text Changer */}
            <div className={`p-2 border-[2px] border-black flex flex-col items-center justify-between h-36 transition-all duration-300 ${textChangerEnabled ? 'bg-white shadow-[4px_4px_0px_0px_#e12320]' : 'bg-gray-100 opacity-80'}`}>
                <div 
                   onClick={() => setView('text')}
                   className="w-10 h-10 rounded border-2 border-black flex items-center justify-center bg-[#FAF9F6] cursor-pointer hover:bg-gray-200 transition-colors"
                >
                    <FileText size={20} className={textChangerEnabled ? "text-black" : "text-gray-400"} />
                </div>
                <span className="font-bold text-[10px] uppercase tracking-tight mt-2 mb-auto text-center leading-tight">Text Change</span>
                <div className="flex items-center gap-2">
                    <div className={`w-10 h-5 border-2 border-black rounded-full relative transition-colors ${textChangerEnabled ? 'bg-[#e12320]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white border-2 border-black rounded-full transition-all ${textChangerEnabled ? 'left-[18px]' : 'left-0.5'}`} />
                    </div>
                    <button onClick={() => setView('text')} className="hover:rotate-45 transition-transform text-gray-400 hover:text-black">
                      <Settings size={14} />
                    </button>
                </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {view === 'audit' && (
             <div className="w-full h-full flex flex-col pt-2 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 mb-6 border-b-[3px] border-black pb-4">
                  <button 
                    onClick={() => setView('main')}
                    className="hover:bg-gray-200 p-2 rounded-full transition-colors border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-0.5 active:shadow-none bg-white"
                  >
                    <ArrowLeft size={20} className="text-black" />
                  </button>
                  <h2 className="text-xl font-black uppercase tracking-tight">Audit Shield</h2>
                </div>
                
                <div className="flex-1 bg-white border-[3px] border-black p-6 shadow-[4px_4px_0px_0px_#e12320] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-[#FAF9F6] border-2 border-black rounded flex items-center justify-center mb-4">
                      <ScanSearch size={32} className="text-black" />
                    </div>
                    <p className="text-black font-black uppercase text-lg mb-4">Simulate Audit</p>
                    <button 
                      onClick={() => setShowAuditResults(true)}
                      className="neo-btn py-2 px-6 w-full shadow-[3px_3px_0px_0px_#000] mb-4 flex items-center justify-center gap-2 group"
                    >
                      <span>Run Scan</span>
                      <Shield size={16} className="group-hover:rotate-12 transition-transform"/>
                    </button>
                    <p className="text-gray-500 font-bold text-xs">
                      This will verify the content on the current page for toxicity, veracity, and authenticity.
                    </p>
                </div>
             </div>
          )}
          {showAuditResults && (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
               {/* Override fixed positioning for preview context if possible, or just let it overlay */}
               <ResultsPanel data={MOCK_AUDIT_DATA} onClose={() => setShowAuditResults(false)} />
            </div>
          )}
          {view === 'hider' && (
            <div className="w-full h-full flex flex-col pt-2 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-4 border-b-[3px] border-black pb-4">
                <button 
                  onClick={() => setView('main')}
                  className="hover:bg-gray-200 p-2 rounded-full transition-colors border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-0.5 active:shadow-none bg-white"
                >
                  <ArrowLeft size={20} className="text-black" />
                </button>
                <h2 className="text-xl font-black uppercase tracking-tight">Content Hider</h2>
              </div>

              {/* Description at Top */}
              <div className="mb-6 text-center px-2">
                 <p className="text-sm font-bold text-gray-600 leading-tight">
                   Protect your workspace by automatically hiding sensitive or inflammatory content from your feed.
                 </p>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-1 pb-4">
                 {/* Hider Mode Selection */}
                 
                 {/* 1. Sensor Mode */}
                 <div 
                   onClick={() => saveHiderMode('sensor')}
                   className={`p-4 border-[3px] border-black transition-all cursor-pointer flex items-center gap-4 ${hiderMode === 'sensor' ? 'bg-[#FAF9F6] shadow-[4px_4px_0px_0px_#e12320]' : 'bg-white opacity-60 hover:opacity-100'}`}
                 >
                   <div className={`w-10 h-10 border-2 border-black flex items-center justify-center ${hiderMode === 'sensor' ? 'bg-[#e12320] text-white' : 'bg-gray-100 text-black'}`}>
                      <Ghost size={20} className="fill-current" />
                   </div>
                   <div className="text-left">
                     <h3 className="font-black uppercase text-sm">Sensor</h3>
                     <p className="text-xs font-bold text-gray-500">Keeps first letter + *** <br/>(e.g. "b***")</p>
                   </div>
                 </div>

                 {/* 2. Substitute Mode */}
                 <div 
                   onClick={() => saveHiderMode('substitute')}
                   className={`p-4 border-[3px] border-black transition-all cursor-pointer flex items-center gap-4 ${hiderMode === 'substitute' ? 'bg-[#FAF9F6] shadow-[4px_4px_0px_0px_#e12320]' : 'bg-white opacity-60 hover:opacity-100'}`}
                 >
                   <div className={`w-10 h-10 border-2 border-black flex items-center justify-center ${hiderMode === 'substitute' ? 'bg-[#e12320] text-white' : 'bg-gray-100 text-black'}`}>
                      <Wand2 size={20} />
                   </div>
                   <div className="text-left">
                     <h3 className="font-black uppercase text-sm">Substitute</h3>
                     <p className="text-xs font-bold text-gray-500">Replaces bad words with safe synonyms</p>
                   </div>
                 </div>

                 {/* 3. Hide Mode */}
                 <div 
                   onClick={() => saveHiderMode('hide')}
                   className={`p-4 border-[3px] border-black transition-all cursor-pointer flex items-center gap-4 ${hiderMode === 'hide' ? 'bg-[#FAF9F6] shadow-[4px_4px_0px_0px_#e12320]' : 'bg-white opacity-60 hover:opacity-100'}`}
                 >
                   <div className={`w-10 h-10 border-2 border-black flex items-center justify-center ${hiderMode === 'hide' ? 'bg-[#e12320] text-white' : 'bg-gray-100 text-black'}`}>
                      <Eraser size={20} />
                   </div>
                   <div className="text-left">
                     <h3 className="font-black uppercase text-sm">Hide</h3>
                     <p className="text-xs font-bold text-gray-500">Completely removes the word<br/>(e.g. "")</p>
                   </div>
                 </div>
              </div>
            </div>
          )}
          {view === 'text' && <SubPage title="Text Replace" onBack={() => setView('main')} />}
        </>
      )}
    </div>
  );
};

export default ExtensionPreview;
