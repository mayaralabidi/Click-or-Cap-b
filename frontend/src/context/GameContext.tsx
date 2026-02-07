import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  incrementScore: (amount: number) => void;
  decrementScore: (amount: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState(0);

  const incrementScore = (amount: number) => setScore(prev => prev + amount);
  const decrementScore = (amount: number) => setScore(prev => Math.max(0, prev - amount)); // Prevent negative score? Or allow it? User said "substitute", assume subtract. Allowing negative makes it harder. Let's floor at 0 for now unless requested otherwise.

  return (
    <GameContext.Provider value={{ score, setScore, incrementScore, decrementScore }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
