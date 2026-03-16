import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertCircle } from 'lucide-react';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

interface ToastContextType {
    addToast: (message: string, type?: 'info' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<{ id: number; message: string; type: 'info' | 'error' }[]>([]);
    const triggerHaptic = useHapticFeedback();

    const addToast = useCallback((message: string, type: 'info' | 'error' = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        
        if (type === 'error') triggerHaptic('error');
        else triggerHaptic('light');

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, [triggerHaptic]);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-12 left-0 right-0 z-[100] flex flex-col items-center pointer-events-none gap-2 px-4">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(8px)" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                            className="bg-white/80 backdrop-blur-3xl border border-white/60 shadow-lg px-5 py-3 rounded-full text-zinc-900 font-medium text-[14px] flex items-center gap-2.5"
                        >
                            {toast.type === 'error' && <AlertCircle size={18} className="text-red-500" />}
                            {toast.type === 'info' && <Check size={18} className="text-blue-500" />}
                            <span>{toast.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};
