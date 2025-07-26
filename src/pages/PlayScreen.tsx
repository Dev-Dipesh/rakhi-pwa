import { X, RotateCcw, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useGift } from '../context/GiftContext';
import EnvelopeCard from '../components/EnvelopeCard';
import Confetti from '../components/Confetti';

const colors = ['red', 'green', 'yellow'];

export default function PlayScreen() {
  const {
    envelopeAmounts,
    selectedEnvelope,
    revealedAmount,
    selectEnvelope,
    playAgain,
    resetGame,
  } = useGift();

  const isRevealed = selectedEnvelope !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative">
      <Confetti isActive={isRevealed} />
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Choose Your Gift</h1>
            <p className="text-purple-600 text-sm">Sister's Special Moment</p>
          </div>
        </motion.div>
        
        <motion.button
          onClick={resetGame}
          className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all border border-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <X className="w-6 h-6 text-gray-600" />
        </motion.button>
      </div>

      {/* Main Content Container - Fixed height to prevent scrolling */}
      <div className="flex flex-col items-center justify-center px-4 py-8 min-h-[calc(100vh-120px)] relative z-10">
        
        {/* Instructions */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {!isRevealed ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                Select an envelope to reveal your gift
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </h2>
              <p className="text-lg text-purple-700 font-medium">
                Each envelope contains a special surprise
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-red-600 mb-2">
                Congratulations!
              </h2>
              <p className="text-xl text-pink-600 font-semibold">
                Your love has been rewarded!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Envelopes - Centered and contained */}
        <motion.div
          className="flex justify-center gap-6 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {envelopeAmounts.map((amount, index) => (
            <EnvelopeCard
              key={index}
              index={index}
              color={colors[index]}
              isSelected={selectedEnvelope === index}
              isRevealed={selectedEnvelope === index}
              amount={amount}
              onClick={() => selectEnvelope(index)}
              disabled={isRevealed && selectedEnvelope !== index}
            />
          ))}
        </motion.div>

        {/* Reveal Message - Fixed position */}
        {isRevealed && (
          <motion.div
            className="text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-200">
              <motion.h2 
                className="text-5xl font-bold text-red-600 mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ₹{revealedAmount}
              </motion.h2>
              
              <div className="mb-6">
                <p className="text-xl text-pink-600 font-bold mb-2 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 fill-current" />
                  You're a priceless blessing!
                  <Heart className="w-5 h-5 fill-current" />
                </p>
                <p className="text-lg text-gray-700">
                  May this Rakhi bring you endless joy!
                </p>
              </div>

              <motion.button
                onClick={playAgain}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-5 h-5" />
                Play Again!
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}