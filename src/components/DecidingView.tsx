import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { getOptionTheme } from '../utils/colors';
import { ProcessedOption } from '../App';

const APPLE_SPRING = { type: "spring", bounce: 0, duration: 0.6, restDelta: 0.001 };
const CONFIG = { SHUFFLE_DURATION_MS: 2500 };

export const DecidingView: React.FC<{ options: ProcessedOption[]; onComplete: () => void }> = ({ options, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const triggerHaptic = useHapticFeedback();
    
    useEffect(() => {
        let startTime = Date.now();
        let animationFrame: number;
        let lastTick = 0;

        const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / CONFIG.SHUFFLE_DURATION_MS, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const currentDelay = 80 + (easeOut * 350); 
            
            if (elapsed - lastTick > currentDelay) {
                setCurrentIndex(Math.floor(Math.random() * options.length));
                lastTick = elapsed;
                
                if (progress < 0.8) triggerHaptic('light');
            }
            
            if (progress < 1) {
                animationFrame = requestAnimationFrame(tick);
            } else {
                onComplete();
            }
        };
        
        animationFrame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animationFrame);
    }, [options.length, onComplete, triggerHaptic]);

    const currentOption = options[currentIndex] || options[0];
    const theme = getOptionTheme(currentOption.originalIndex);

    return (
        <motion.div
            key="deciding"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(16px)" }}
            transition={APPLE_SPRING}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6"
        >
            <div className="relative w-80 h-80 flex items-center justify-center" style={{ perspective: '1000px' }}>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute inset-[-20%] rounded-full blur-3xl transition-colors duration-200 ${theme.blob}`}
                />
                
                <motion.div
                    animate={{ rotateX: 360, rotateY: 180, rotateZ: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-white/40 shadow-sm border-t-transparent border-b-transparent"
                    style={{ transformStyle: 'preserve-3d' }}
                />
                
                <motion.div
                    animate={{ rotateX: -360, rotateY: 360, rotateZ: -180 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[10%] rounded-full border-2 border-white/60 shadow-sm border-l-transparent border-r-transparent"
                    style={{ transformStyle: 'preserve-3d' }}
                />
                
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                    transition={{ rotate: { duration: 6, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                    className="absolute inset-[20%] bg-white/40 backdrop-blur-3xl shadow-[inset_0_4px_20px_rgba(255,255,255,0.8),_0_16px_48px_rgba(0,0,0,0.1)] border border-white overflow-hidden"
                    style={{ borderRadius: '48% 52% 45% 55% / 55% 45% 58% 42%' }}
                >
                    <motion.div 
                        className={`absolute -inset-1/2 opacity-30 blur-2xl transition-colors duration-200 ${theme.blob}`}
                        animate={{ rotate: 360, scale: [1, 1.5, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                        className={`absolute inset-0 opacity-20 blur-xl transition-colors duration-200 ${theme.blob}`}
                        animate={{ rotate: -360, scale: [1.5, 1, 1.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 to-transparent opacity-60 pointer-events-none" style={{ borderRadius: 'inherit' }} />
                </motion.div>

                <div className="relative z-10 w-full px-12 text-center flex items-center justify-center h-full overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        <motion.span 
                            key={currentOption.id}
                            initial={{ y: 40, opacity: 0, filter: 'blur(8px)', scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
                            exit={{ y: -40, opacity: 0, filter: 'blur(8px)', scale: 1.2 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className={`absolute text-3xl font-bold tracking-tight truncate w-full drop-shadow-md ${theme.text}`}
                        >
                            {currentOption.text}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
            
            <motion.div
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-16 text-zinc-900 font-semibold tracking-widest uppercase text-[13px] backdrop-blur-md px-6 py-2 rounded-full bg-white/30 border border-white/40 shadow-sm"
            >
                Computing Destiny
            </motion.div>
        </motion.div>
    );
};
