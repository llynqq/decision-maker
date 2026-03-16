import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { Header } from './Header';
import { ScrollShadow } from './ScrollShadow';
import { OptionItem } from './OptionItem';
import { DecideButton } from './DecideButton';
import { useToast } from './ToastProvider';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

const APPLE_SPRING = { type: "spring", bounce: 0, duration: 0.6, restDelta: 0.001 };
const CONFIG = { MIN_OPTIONS: 2, MAX_OPTIONS: 12 };

interface InputViewProps {
    options: { id: string; text: string }[];
    setOptions: React.Dispatch<React.SetStateAction<{ id: string; text: string }[]>>;
    onDecide: () => void;
    canDecide?: boolean;
}

export const InputView: React.FC<InputViewProps> = ({ options, setOptions, onDecide, canDecide = true }) => {
    const { addToast } = useToast();
    const triggerHaptic = useHapticFeedback();

    const updateOption = useCallback((id: string, text: string) => {
        setOptions(prev => prev.map(opt => opt.id === id ? { ...opt, text } : opt));
    }, [setOptions]);

    const addOption = useCallback(() => {
        if (options.length >= CONFIG.MAX_OPTIONS) {
            addToast(`Maximum ${CONFIG.MAX_OPTIONS} options allowed.`, 'error');
            return;
        }
        triggerHaptic('light');
        const newId = `opt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setOptions(prev => [...prev, { id: newId, text: '' }]);
    }, [options.length, setOptions, addToast, triggerHaptic]);

    const removeOption = useCallback((id: string) => {
        if (options.length <= CONFIG.MIN_OPTIONS) {
            addToast(`Minimum ${CONFIG.MIN_OPTIONS} options required.`, 'error');
            return;
        }
        setOptions(prev => prev.filter(opt => opt.id !== id));
    }, [options.length, setOptions, addToast]);

    return (
        <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
            transition={APPLE_SPRING}
            className="flex flex-col h-full w-full relative"
        >
            <Header />

            <ScrollShadow>
                <div className="flex flex-col w-full">
                    <AnimatePresence mode="popLayout">
                        {options.map((opt, idx) => (
                            <OptionItem
                                key={opt.id}
                                option={opt}
                                index={idx}
                                updateOption={updateOption}
                                removeOption={removeOption}
                                canRemove={options.length > CONFIG.MIN_OPTIONS}
                                onAddNext={addOption}
                            />
                        ))}
                    </AnimatePresence>
                    
                    <motion.div layout transition={APPLE_SPRING} className="flex justify-center mt-2 mb-8">
                        <motion.button
                            animate={{ scale: [1, 1.05, 1], boxShadow: ['0 8px 32px rgba(0,0,0,0.04)', '0 12px 40px rgba(0,0,0,0.08)', '0 8px 32px rgba(0,0,0,0.04)'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            onClick={addOption}
                            className="w-14 h-14 rounded-full bg-white/60 backdrop-blur-3xl border border-white/60 shadow-sm flex items-center justify-center text-zinc-900 hover:bg-white/90 hover:shadow-md transition-all duration-300"
                        >
                            <Plus size={24} strokeWidth={2.5} />
                        </motion.button>
                    </motion.div>
                </div>
            </ScrollShadow>

            <DecideButton onClick={onDecide} disabled={!canDecide} />
        </motion.div>
    );
};
