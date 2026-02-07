import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimation } from 'framer-motion';
import { Check, X, RefreshCw, Trophy, Loader2 } from 'lucide-react';
import { useGame } from '../context/GameContext';

// Card Interfaces
interface CardData {
  id: string;
  text: string;
  type: "CLICK" | "CAP"; // CLICK = True, CAP = Fake/Hate
  source: string;
  explanation: string;
}

const Card = ({ data, onSwipe }: { data: CardData, onSwipe: (dir: 'left' | 'right') => void }) => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  
  // Dynamic Background Color
  const bg = useTransform(x, [-150, 0, 150], ["#e12320", "#FAF9F6", "#22c55e"]);
  const border = useTransform(x, [-150, 0, 150], ["#e12320", "#000000", "#22c55e"]);

  const handleDragEnd = async (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      // Swipe Right (Click)
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } });
      onSwipe('right');
    } else if (offset < -100 || velocity < -500) {
      // Swipe Left (Cap)
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.2 } });
      onSwipe('left');
    } else {
      // Snap back
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  // Overlay Opacity
  const clickOpacity = useTransform(x, [50, 150], [0, 1]);
  const capOpacity = useTransform(x, [-150, -50], [1, 0]);

  return (
    <motion.div
      animate={controls}
      style={{ x, rotate, opacity, backgroundColor: bg, borderColor: border }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }} // Elastic snap back handled by controls if not swiped
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      className="absolute w-full max-w-sm h-96 border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between cursor-grab active:cursor-grabbing rounded-xl bg-[#FAF9F6] touch-none overflow-hidden"
      initial={{ scale: 0.95, opacity: 0, x: 0 }}
      whileInView={{ scale: 1, opacity: 1, x: 0 }}
    >
        {/* SWIPE OVERLAYS */}
        {/* CLICK (Right Swipe) */}
        <motion.div 
            style={{ opacity: clickOpacity }}
            className="absolute top-8 left-8 border-[4px] border-green-600 text-green-600 -rotate-12 px-2 py-1 rounded w-fit z-10 pointer-events-none"
        >
            <span className="text-4xl font-black uppercase tracking-widest">CLICK</span>
        </motion.div>

        {/* CAP (Left Swipe) */}
        <motion.div 
            style={{ opacity: capOpacity }}
            className="absolute top-8 right-8 border-[4px] border-red-600 text-red-600 rotate-12 px-2 py-1 rounded w-fit z-10 pointer-events-none"
        >
             <span className="text-4xl font-black uppercase tracking-widest">CAP</span>
        </motion.div>


        {/* Card Content */}
        <div>
            <div className="inline-block px-3 py-1 mb-4 border-2 border-black bg-white text-xs font-bold uppercase tracking-widest rounded-md">
                Source: {data.source.slice(0, 25)}{data.source.length > 25 ? '...' : ''}
            </div>
            <h3 className="text-xl sm:text-2xl font-black leading-tight mb-4 select-none pointer-events-none">
                "{data.text}"
            </h3>
        </div>
    </motion.div>
  );
};


const ClickOrCap = () => {
  const { score, incrementScore, decrementScore, setScore } = useGame();
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const fetchDeck = async () => {
      setLoading(true);
      setError(null);
      setGameOver(false);
      try {
          const res = await fetch('http://localhost:8000/game/deck');
          if (!res.ok) {
              const msg = `API Error: ${res.status} ${res.statusText}`;
              console.error(msg);
              setError(msg);
              setCards([]); 
              return;
          }
          const data = await res.json();
          if (Array.isArray(data)) {
              if (data.length === 0) setError("No cards returned from API.");
              setCards(data);
          } else {
              const msg = "Invalid data format received (not an array)";
              console.error(msg, data);
              setError(msg);
              setCards([]);
          }
      } catch (err: any) {
          const msg = err.message || "Failed to connect to server";
          console.error("Failed to fetch deck details:", err);
          setError(msg);
          setCards([]);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    fetchDeck();
  }, []);
  
  const onSwipe = (dir: 'left' | 'right') => {
      // Remove current card
      const currentCard = cards[0];
      const isCorrect = (dir === 'right' && currentCard.type === 'CLICK') || (dir === 'left' && currentCard.type === 'CAP');
      
      if (isCorrect) {
          incrementScore(100);
      } else {
          decrementScore(50); // Penalty for wrong answer
      }
      
      // Update deck
      const newDeck = cards.slice(1);
      setCards(newDeck);
      if (newDeck.length === 0) setGameOver(true);
  }

  const resetGame = () => {
      setScore(0);
      fetchDeck();
  }

  return (
    <div className="max-w-4xl mx-auto min-h-[80vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95 duration-500 relative">
      
      {/* Header */}
      <div className="text-center space-y-4">
          <h2 className="text-6xl font-black uppercase tracking-tighter text-black">
            Click or <span className="text-[#e12320]">Cap?</span>
          </h2>
          <button 
            onClick={() => setShowInstructions(true)}
            className="text-xs font-bold underline decoration-2 underline-offset-4 hover:text-[#e12320]"
          >
            How to Play?
          </button>
      </div>

      {/* Game Area */}
      <div className="relative w-full max-w-sm h-96 flex items-center justify-center">
          {loading ? (
              <div className="flex flex-col items-center gap-4">
                 <Loader2 size={48} className="animate-spin text-[#e12320]" />
                 <p className="font-bold uppercase tracking-widest">Loading Deck...</p>
              </div>
          ) : (
              <AnimatePresence>
                  {cards.map((card, index) => (
                      index === 0 && (
                          <Card key={card.id} data={card} onSwipe={onSwipe} />
                      )
                  ))}
              </AnimatePresence>
          )}
          
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-red-100 border-[3px] border-red-600 rounded-xl z-20">
               <strong className="text-red-700 text-xl mb-2">Error Loading Deck</strong>
               <p className="font-mono text-sm text-red-900 mb-4 bg-white p-2 border border-red-200 rounded">{error}</p>
               <button onClick={fetchDeck} className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 flex items-center gap-2">
                  <RefreshCw size={16} /> Retry
               </button>
            </div>
          )}

          {/* Game Over */}
          {gameOver && !loading && !error && (
              <div className="absolute inset-0 bg-[#FAF9F6] border-[3px] border-black p-8 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl z-10">
                  <Trophy size={64} className="text-[#e12320] mb-6" />
                  <h3 className="text-3xl font-black uppercase mb-2">Game Over!</h3>
                  <p className="text-xl font-bold mb-6">Final Score: {score}</p>
                  <button onClick={resetGame} className="neo-btn flex items-center gap-2 rounded-xl">
                      <RefreshCw size={20} /> Play Again
                  </button>
              </div>
          )}
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white border-[3px] border-black p-8 max-w-md w-full shadow-[8px_8px_0px_0px_#e12320] rounded-xl relative animate-in zoom-in-95 duration-200">
                  <button onClick={() => setShowInstructions(false)} className="absolute top-4 right-4 hover:rotate-90 transition-transform">
                      <X size={24} />
                  </button>
                  
                  <h3 className="text-3xl font-black uppercase mb-6 text-center">How to Play</h3>
                  
                  <div className="space-y-6">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 border-2 border-green-600 flex items-center justify-center rounded-lg text-green-700">
                              <Check size={24} strokeWidth={3} />
                          </div>
                          <div>
                              <h4 className="font-black text-lg">Swipe RIGHT for CLICK</h4>
                              <p className="text-sm font-medium text-gray-600">If you think the headline is REAL news.</p>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-100 border-2 border-red-600 flex items-center justify-center rounded-lg text-red-700">
                              <X size={24} strokeWidth={3} />
                          </div>
                          <div>
                              <h4 className="font-black text-lg">Swipe LEFT for CAP</h4>
                              <p className="text-sm font-medium text-gray-600">If you think it's FAKE, Satire, or Hate Speech.</p>
                          </div>
                      </div>

                      <div className="bg-gray-100 p-4 rounded-lg border-2 border-black border-dashed">
                          <p className="text-center font-bold text-sm">
                              Correct: <span className="text-green-600">+100 pts</span> <br/>
                              Wrong: <span className="text-red-600">-50 pts</span>
                          </p>
                      </div>
                  </div>

                  <button 
                    onClick={() => setShowInstructions(false)}
                    className="w-full mt-8 bg-black text-white py-3 font-bold uppercase tracking-widest hover:bg-[#e12320] transition-colors rounded-lg border-2 border-transparent hover:border-black"
                  >
                      Start Playing
                  </button>
              </div>
          </div>
      )}

    </div>
  );
};

export default ClickOrCap;
