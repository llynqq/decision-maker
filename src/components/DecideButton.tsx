import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

export const DecideButton: React.FC<{ onClick: () => void; disabled: boolean }> = ({ onClick, disabled }) => {
    const triggerHaptic = useHapticFeedback();

    const handleClick = () => {
        if (!disabled) {
            triggerHaptic('heavy');
            onClick();
        }
    };

    return (
        <div className="absolute bottom-[max(env(safe-area-inset-bottom),2rem)] left-6 right-6 flex justify-center z-30 no-select">
            <motion.button
                whileTap={{ scale: disabled ? 1 : 0.96 }}
                onClick={handleClick}
                disabled={disabled}
                className={`w-full h-[60px] rounded-full flex items-center justify-center gap-2.5 font-semibold text-[17px] transition-all duration-300 overflow-hidden relative ${
                    disabled 
                        ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' 
                        : 'bg-zinc-900 text-white shadow-[0_16px_32px_rgba(24,24,27,0.2)] hover:bg-zinc-800 hover:shadow-[0_20px_40px_rgba(24,24,27,0.3)] animate-breathe'
                }`}
            >
                {!disabled && (
                    <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                        className="absolute inset-0 z-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                    />
                )}
                
                <Sparkles size={20} className={`relative z-10 ${disabled ? 'opacity-50' : 'text-white/90'}`} />
                <span className="relative z-10 tracking-wide">Decide</span>
            </motion.button>
        </div>
    );
};
