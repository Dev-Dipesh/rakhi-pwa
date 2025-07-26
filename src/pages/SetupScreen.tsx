import React from 'react';
import { Play, Heart, Sparkles, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { useGift } from '../context/GiftContext';
import { cn } from '../utils/cn';

export default function SetupScreen() {
  const {
    minAmount,
    maxAmount,
    error,
    setMinAmount,
    setMaxAmount,
    startGame,
  } = useGift();

  const isValid = minAmount > 0 && maxAmount > 0 && minAmount <= maxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      startGame();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Rakhi Gift
            </h1>
          </motion.div>
          
          <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
            <Heart className="w-5 h-5 fill-current" />
            <p className="text-lg font-medium">
              Set the gift range for your sister
            </p>
            <Heart className="w-5 h-5 fill-current" />
          </div>
          
          <p className="text-gray-600">Create a magical surprise experience</p>
        </div>

        {/* Form Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="minAmount" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">₹</span>
                </div>
                Minimum Amount (₹)
              </label>
              <input
                id="minAmount"
                type="number"
                min="1"
                value={minAmount}
                onChange={(e) => setMinAmount(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-lg bg-gradient-to-r from-white to-orange-50"
                placeholder="Enter minimum amount"
              />
            </div>

            <div>
              <label htmlFor="maxAmount" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">₹</span>
                </div>
                Maximum Amount (₹)
              </label>
              <input
                id="maxAmount"
                type="number"
                min="1"
                value={maxAmount}
                onChange={(e) => setMaxAmount(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-lg bg-gradient-to-r from-white to-pink-50"
                placeholder="Enter maximum amount"
              />
            </div>

            {error && (
              <motion.div 
                className="bg-red-50 border-2 border-red-200 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="text-red-700 font-medium">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={!isValid}
              className={cn(
                "w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg",
                isValid
                  ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:shadow-xl transform hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              )}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
            >
              <Play className="w-5 h-5" />
              Start the Game!
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800 flex items-center gap-2">
              <Gift className="w-4 h-4 text-orange-600" />
              <span>
                <strong>Note:</strong> The system will generate 3 special gift amounts within your range following traditional patterns.
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}