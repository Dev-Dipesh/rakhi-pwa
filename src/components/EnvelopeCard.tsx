import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';
import { Heart } from 'lucide-react';

interface EnvelopeCardProps {
  index: number;
  color: string;
  isSelected: boolean;
  isRevealed: boolean;
  amount?: number;
  onClick: () => void;
  disabled: boolean;
}

const envelopeStyles = {
  red: {
    envelope: 'bg-red-500',
    flap: 'border-red-600',
    shadow: 'shadow-red-300/50',
    ring: 'ring-red-400',
  },
  green: {
    envelope: 'bg-emerald-500',
    flap: 'border-emerald-600',
    shadow: 'shadow-green-300/50',
    ring: 'ring-green-400',
  },
  yellow: {
    envelope: 'bg-amber-500',
    flap: 'border-amber-600',
    shadow: 'shadow-yellow-300/50',
    ring: 'ring-yellow-400',
  }
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
  const style = envelopeStyles[color as keyof typeof envelopeStyles];

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: disabled ? 0 : [0, -8, 0],
      }}
      transition={{ 
        opacity: { duration: 0.6, delay: index * 0.1 },
        y: { 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.1
        }
      }}
      onClick={onClick}
    >
      {/* Main Envelope Container */}
      <div className="relative">
        {/* Envelope Body - rectangular base */}
        <motion.div
          className={cn(
            "relative w-36 h-24 rounded-lg",
            style.envelope,
            `${style.shadow} shadow-lg`,
            disabled && !isSelected ? "opacity-50" : "",
            isSelected ? `ring-4 ${style.ring} ring-opacity-60` : "",
            !disabled ? "hover:shadow-xl" : ""
          )}
          whileHover={!disabled ? { scale: 1.02 } : {}}
        >
          {/* Back triangular flap - diamond shape rotated 45deg */}
          <div 
            className={cn(
              "absolute w-16 h-16 rotate-45 rounded-tl-lg -top-8 left-1/2 -translate-x-1/2",
              style.envelope
            )}
          />
          
          {/* Card inside envelope */}
          <motion.div
            className="absolute inset-3 bg-white rounded-md shadow-inner border border-gray-200 flex flex-col items-center justify-center overflow-visible"
            animate={{
              y: isRevealed ? -32 : 0
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Dashed border decoration */}
            <div className="absolute inset-2 border-2 border-dashed border-gray-400 rounded-sm" />
            
            {!isRevealed ? (
              // Unopened card content
              <div className="text-center z-10">
                <div className="text-lg font-bold text-gray-800 mb-1">
                  Gift
                </div>
                <div className="w-6 h-6 bg-red-500 mx-auto relative">
                  {/* CSS Heart shape */}
                  <div className="absolute w-6 h-6 bg-red-500 rotate-45 rounded-tl-full rounded-tr-none rounded-bl-none rounded-br-full" />
                  <div className="absolute w-6 h-6 bg-red-500 -right-3 rotate-45 rounded-tl-none rounded-tr-full rounded-bl-full rounded-br-none" />
                </div>
              </div>
            ) : (
              // Revealed card content
              <motion.div
                className="text-center z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="text-xl font-bold text-red-600 mb-1">
                  ₹{amount}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 text-red-500 fill-current" />
                  <span className="text-red-600 text-xs font-bold">WINNER</span>
                  <Heart className="w-3 h-3 text-red-500 fill-current" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        
        {/* Front triangular flaps */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          {/* Left triangle */}
          <div 
            className={cn(
              "absolute w-0 h-0 -left-9",
              "border-r-[18px] border-r-transparent",
              "border-t-[12px] border-t-transparent", 
              "border-b-[12px] border-b-transparent",
              style.flap.replace('border-', 'border-l-[18px] border-l-')
            )}
          />
          {/* Right triangle */}
          <div 
            className={cn(
              "absolute w-0 h-0 -right-9",
              "border-l-[18px] border-l-transparent",
              "border-t-[12px] border-t-transparent",
              "border-b-[12px] border-b-transparent", 
              style.flap.replace('border-', 'border-r-[18px] border-r-')
            )}
          />
        </div>
        
        {/* Shadow under envelope */}
        <motion.div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-3 bg-black/20 rounded-full blur-sm"
          animate={{
            scaleX: [1, 0.85, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1
          }}
        />
      </div>

      {/* Indicator dot */}
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.1 }}
      >
        <div 
          className={cn(
            "w-3 h-3 rounded-full mx-auto shadow-sm",
            style.envelope,
            isSelected ? `ring-2 ${style.ring}` : ""
          )}
        />
      </motion.div>
    </motion.div>
  );
}