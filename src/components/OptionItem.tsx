import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { getOptionTheme } from '../utils/colors';

interface Option {
    id: string;
    text: string;
}

interface OptionItemProps {
    option: Option;
    index: number;
    updateOption: (id: string, text: string) => void;
    removeOption: (id: string) => void;
    canRemove: boolean;
    onAddNext: () => void;
}

const APPLE_SPRING = { type: "spring", bounce: 0, duration: 0.6, restDelta: 0.001 };

export const OptionItem: React.FC<OptionItemProps> = ({ option, index, updateOption, removeOption, canRemove, onAddNext }) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const triggerHaptic = useHapticFeedback();

    const isExpanded = isFocused || option.text.trim().length > 0;
    const theme = getOptionTheme(index);

    const handleExpand = () => {
        if (!isExpanded) {
            triggerHaptic('light');
            setIsFocused(true);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            triggerHaptic('light');
            inputRef.current?.blur();
            onAddNext();
        }
    };

    return (
        <motion.div
            layout="position"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20, filter: "blur(8px)" }}
            transition={APPLE_SPRING}
            className="flex justify-center w-full mb-4"
        >
            <motion.div
                layout
                onClick={handleExpand}
                transition={APPLE_SPRING}
                className={`relative flex items-center overflow-hidden backdrop-blur-3xl border transition-all duration-300 ${theme.bg} ${theme.border} ${theme.hover} ${theme.shadow} ${
                    isExpanded 
                        ? 'w-full h-16 rounded-[32px] px-5 shadow-lg' 
                        : 'w-16 h-16 rounded-full justify-center cursor-pointer'
                }`}
            >
                <motion.div 
                    layout 
                    transition={APPLE_SPRING} 
                    className={`font-medium flex-shrink-0 transition-colors flex items-center justify-center no-select ${theme.text} ${
                        isExpanded ? 'w-6 text-[15px]' : 'w-full text-xl'
                    }`}
                >
                    {index + 1}
                </motion.div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(4px)", x: -10 }}
                            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                            exit={{ opacity: 0, filter: "blur(4px)", x: -10 }}
                            transition={{ duration: 0.3, delay: 0.05 }}
                            className="flex-1 flex items-center h-full ml-2"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={option.text}
                                onChange={(e) => updateOption(option.id, e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onKeyDown={handleKeyDown}
                                placeholder={`Choice ${index + 1}`}
                                className={`w-full bg-transparent border-none outline-none placeholder:opacity-50 font-medium text-[17px] truncate ${theme.text}`}
                                enterKeyHint="next"
                            />
                            
                            {canRemove && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    onPointerDown={(e) => { 
                                        e.preventDefault(); 
                                        triggerHaptic('medium');
                                        removeOption(option.id); 
                                    }}
                                    className="ml-2 w-8 h-8 flex-shrink-0 rounded-full bg-black/5 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-black/10 transition-colors"
                                >
                                    <X size={16} strokeWidth={2.5} />
                                </motion.button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};
