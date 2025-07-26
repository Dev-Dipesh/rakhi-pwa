import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

interface EnvelopeCardProps {
  index: number;
  color: string;
  isSelected: boolean;
  isRevealed: boolean;
  amount?: number;
  onClick: () => void;
  disabled: boolean;
}

const envelopeColors = {
  red: 'bg-gradient-to-br from-rakhi-red via-rakhi-crimson to-rakhi-vermillion shadow-rakhi-red/40',
  green: 'bg-gradient-to-br from-rakhi-emerald via-rakhi-teal to-green-600 shadow-rakhi-emerald/40',
  yellow: 'bg-gradient-to-br from-rakhi-gold via-rakhi-marigold to-rakhi-turmeric shadow-rakhi-gold/40',
};

export default function EnvelopeCard({
  index,
  color,
  isSelected,
  isRevealed,
  amount,
  onClick,
  disabled,
}: EnvelopeCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <motion.button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "relative w-24 h-32 rounded-2xl shadow-lg transition-all duration-300",
          envelopeColors[color as keyof typeof envelopeColors],
          disabled && !isSelected ? "opacity-50" : "",
          !disabled ? "hover:shadow-xl cursor-pointer" : "cursor-not-allowed"
        )}
        initial={false}
        animate={isRevealed ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of envelope */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-white text-2xl">💌</div>
        </div>

        {/* Back of envelope (revealed amount) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-white flex flex-col items-center justify-center shadow-inner"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {isRevealed && (
            <>
              <div className="text-2xl font-bold text-festive-red">₹{amount}</div>
              <div className="text-xs text-gray-600 mt-1">🎁</div>
            </>
          )}
        </div>
      </motion.button>

      <motion.div
        className="mt-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="w-2 h-2 rounded-full bg-gray-300 mx-auto"></div>
      </motion.div>
    </motion.div>
  );
}