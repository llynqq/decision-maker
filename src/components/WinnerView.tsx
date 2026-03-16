import React, { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { getOptionTheme } from '../utils/colors';
import { ProcessedOption } from '../App';

const APPLE_SPRING = { type: "spring", bounce: 0, duration: 0.6, restDelta: 0.001 };

const WinnerParticles = () => {
    const particles = useMemo(() => Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        angle: (i / 24) * Math.PI * 2,
        velocity: Math.random() * 80 + 60,
        size: Math.random() * 6 + 4,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2
    })), []);

    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                    animate={{ 
                        opacity: 0, 
                        x: Math.cos(p.angle) * p.velocity * 2.5, 
                        y: Math.sin(p.angle) * p.velocity * 2.5,
                        scale: 1,
                        rotate: p.rotation + 180
                    }}
                    transition={{ 
                        duration: 1.5, 
                        delay: p.delay, 
                        ease: [0.25, 1, 0.5, 1]
                    }}
                    className="absolute bg-white/80 backdrop-blur-md shadow-sm"
                    style={{ 
                        width: p.size, 
                        height: p.size, 
                        borderRadius: p.id % 2 === 0 ? '50%' : '4px' 
                    }}
                />
            ))}
        </div>
    );
};

export const WinnerView: React.FC<{ winner: ProcessedOption; onReset: () => void }> = ({ winner, onReset }) => {
    const triggerHaptic = useHapticFeedback();
    const theme = getOptionTheme(winner.originalIndex);

    useEffect(() => {
        triggerHaptic('success');
    }, [triggerHaptic]);

    return (
        <motion.div
            key="winner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            transition={APPLE_SPRING}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
        >
            <WinnerParticles />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...APPLE_SPRING, delay: 0.1 }}
                className="text-zinc-500 text-[12px] font-bold tracking-[0.25em] uppercase mb-10 relative z-10"
            >
                The Verdict
            </motion.div>

            <div className="relative w-80 h-80 flex items-center justify-center mb-16">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.15, opacity: 0.4 }}
                    transition={{ ...APPLE_SPRING, delay: 0.1 }}
                    className={`absolute inset-[-10%] rounded-full blur-3xl ${theme.blob}`}
                />
                
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ ...APPLE_SPRING, delay: 0.2 }}
                    className="absolute inset-0 rounded-full bg-white/40 backdrop-blur-3xl border border-white/80 shadow-2xl overflow-hidden flex items-center justify-center"
                >
                    <motion.div 
                        className={`absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-30 blur-3xl ${theme.blob}`}
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                        className={`absolute top-0 left-0 w-full h-full opacity-20 blur-2xl mix-blend-overlay ${theme.blob}`}
                        animate={{ rotate: -360, scale: [1, 1.5, 1] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="absolute top-0 left-[15%] right-[15%] h-[35%] bg-gradient-to-b from-white/90 to-transparent rounded-full blur-md opacity-80 pointer-events-none" />
                    <div className="absolute bottom-0 left-[20%] right-[20%] h-[20%] bg-gradient-to-t from-white/50 to-transparent rounded-full blur-lg opacity-60 pointer-events-none" />
                    <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] rounded-full pointer-events-none" />
                    
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ ...APPLE_SPRING, delay: 0.4 }}
                        className="relative z-10 w-full px-8 text-center"
                    >
                        <h2 className={`text-4xl sm:text-[44px] font-bold tracking-tight break-words line-clamp-4 leading-tight drop-shadow-sm ${theme.text}`}>
                            {winner.text}
                        </h2>
                    </motion.div>
                </motion.div>
            </div>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ ...APPLE_SPRING, delay: 0.5 }}
                onClick={() => {
                    triggerHaptic('light');
                    onReset();
                }}
                className="h-16 px-8 rounded-full bg-white/80 backdrop-blur-3xl border border-white/60 shadow-sm flex items-center justify-center gap-3 text-zinc-900 font-semibold text-[17px] hover:bg-white hover:shadow-md transition-all duration-300 relative z-10"
            >
                <RotateCcw size={20} strokeWidth={2.5} className="text-zinc-500" />
                <span>Decide Again</span>
            </motion.button>
        </motion.div>
    );
};
