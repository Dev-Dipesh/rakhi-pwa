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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-x-hidden max-w-full">
      <Confetti isActive={isRevealed} />
      
      {/* Header */}
      <div className="flex justify-between items-center p-3 sm:p-6 relative z-10 max-w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0"
        >
          <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-3 h-3 sm:w-5 sm:h-5 text-white fill-current" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-2xl font-bold text-gray-800 truncate">Choose Your Gift</h1>
            <p className="text-purple-600 text-xs sm:text-sm truncate">Sister's Special Moment</p>
          </div>
        </motion.div>
        
        <motion.button
          onClick={resetGame}
          className="p-1.5 sm:p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all border border-gray-200 flex-shrink-0 ml-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </motion.button>
      </div>

      {/* Main Content Container - Responsive height */}
      <div className="flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-8 min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-120px)] relative z-10">
        
        {/* Instructions */}
        <motion.div
          className="text-center mb-16 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {!isRevealed ? (
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 flex items-center justify-center gap-1 sm:gap-2 px-2">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0" />
                <span className="text-center">Select an envelope to reveal your gift</span>
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0" />
              </h2>
              <p className="text-sm sm:text-lg text-purple-700 font-medium px-4">
                Each envelope contains a special surprise
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-4xl font-bold text-red-600 mb-1 sm:mb-2 px-2">
                Congratulations!
              </h2>
              <p className="text-base sm:text-xl text-pink-600 font-semibold px-4">
                Your love has been rewarded!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Envelopes - Centered and contained */}
        <motion.div
          className="flex justify-center gap-2 sm:gap-6 mb-8 sm:mb-12"
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

        {/* Reveal Message - Responsive position */}
        {isRevealed && (
          <motion.div
            className="text-center max-w-xs sm:max-w-md w-full mx-1 sm:mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-pink-200">
              <motion.h2 
                className="text-2xl sm:text-5xl font-bold text-red-600 mb-2 sm:mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ₹{revealedAmount}
              </motion.h2>
              
              <div className="mb-4 sm:mb-6">
                <p className="text-sm sm:text-xl text-pink-600 font-bold mb-1 sm:mb-2 flex items-center justify-center gap-1 sm:gap-2 px-2">
                  <Heart className="w-3 h-3 sm:w-5 sm:h-5 fill-current flex-shrink-0" />
                  <span>You're a priceless blessing!</span>
                  <Heart className="w-3 h-3 sm:w-5 sm:h-5 fill-current flex-shrink-0" />
                </p>
                <p className="text-sm sm:text-lg text-gray-700 px-2">
                  May this Rakhi bring you endless joy!
                </p>
              </div>

              <motion.button
                onClick={playAgain}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                Play Again!
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}