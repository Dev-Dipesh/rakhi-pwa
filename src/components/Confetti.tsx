import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  emoji?: string;
}

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
}

const confettiColors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b',
  '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#e84393'
];

const festiveEmojis = ['🎉', '🎊', '✨', '💖', '🌟', '🎋', '💝', '🌺', '🎁'];

const generateConfettiPiece = (id: number): ConfettiPiece => ({
  id,
  x: Math.random() * window.innerWidth,
  y: -10,
  color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  size: Math.random() * 8 + 4,
  rotation: Math.random() * 360,
  emoji: Math.random() > 0.7 ? festiveEmojis[Math.floor(Math.random() * festiveEmojis.length)] : undefined,
});

export default function Confetti({ isActive, duration = 3000 }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!isActive) {
      setPieces([]);
      return;
    }

    const interval = setInterval(() => {
      setPieces(prev => [
        ...prev.slice(-50), // Keep only last 50 pieces for performance
        ...Array.from({ length: 3 }, (_, i) => generateConfettiPiece(Date.now() + i))
      ]);
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setTimeout(() => setPieces([]), 2000); // Clear after animation ends
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, duration]);

  if (!isActive && pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          initial={{
            x: piece.x,
            y: piece.y,
            rotate: piece.rotation,
            scale: 1,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: piece.rotation + 720,
            scale: 0.8,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: "easeOut",
          }}
          style={{
            left: 0,
            top: 0,
          }}
        >
          {piece.emoji ? (
            <span className="text-2xl">{piece.emoji}</span>
          ) : (
            <div
              className="rounded-full"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}