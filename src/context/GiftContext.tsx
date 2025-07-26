import { createContext, useContext, useState, type ReactNode } from 'react';
import { generateValidGifts } from '../utils/generateValidGifts';

interface GiftContextType {
  mode: 'setup' | 'play';
  minAmount: number;
  maxAmount: number;
  envelopeAmounts: number[];
  selectedEnvelope: number | null;
  revealedAmount: number | null;
  error: string | null;
  setMinAmount: (amount: number) => void;
  setMaxAmount: (amount: number) => void;
  startGame: () => void;
  selectEnvelope: (index: number) => void;
  playAgain: () => void;
  resetGame: () => void;
}

const GiftContext = createContext<GiftContextType | undefined>(undefined);

interface GiftProviderProps {
  children: ReactNode;
}

export function GiftProvider({ children }: GiftProviderProps) {
  const [mode, setMode] = useState<'setup' | 'play'>('setup');
  const [minAmount, setMinAmount] = useState<number>(1);
  const [maxAmount, setMaxAmount] = useState<number>(101);
  const [envelopeAmounts, setEnvelopeAmounts] = useState<number[]>([]);
  const [selectedEnvelope, setSelectedEnvelope] = useState<number | null>(null);
  const [revealedAmount, setRevealedAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startGame = () => {
    try {
      setError(null);
      const amounts = generateValidGifts(minAmount, maxAmount);
      setEnvelopeAmounts(amounts);
      setMode('play');
      setSelectedEnvelope(null);
      setRevealedAmount(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const selectEnvelope = (index: number) => {
    if (selectedEnvelope === null && envelopeAmounts[index]) {
      setSelectedEnvelope(index);
      setRevealedAmount(envelopeAmounts[index]);
    }
  };

  const playAgain = () => {
    try {
      setError(null);
      const amounts = generateValidGifts(minAmount, maxAmount);
      setEnvelopeAmounts(amounts);
      setSelectedEnvelope(null);
      setRevealedAmount(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const resetGame = () => {
    setMode('setup');
    setEnvelopeAmounts([]);
    setSelectedEnvelope(null);
    setRevealedAmount(null);
    setError(null);
  };

  const value: GiftContextType = {
    mode,
    minAmount,
    maxAmount,
    envelopeAmounts,
    selectedEnvelope,
    revealedAmount,
    error,
    setMinAmount,
    setMaxAmount,
    startGame,
    selectEnvelope,
    playAgain,
    resetGame,
  };

  return <GiftContext.Provider value={value}>{children}</GiftContext.Provider>;
}

export function useGift() {
  const context = useContext(GiftContext);
  if (context === undefined) {
    throw new Error('useGift must be used within a GiftProvider');
  }
  return context;
}