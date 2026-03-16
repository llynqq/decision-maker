import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { BackgroundBlobs } from './components/BackgroundBlobs';
import { InputView } from './components/InputView';
import { DecidingView } from './components/DecidingView';
import { WinnerView } from './components/WinnerView';
import { ToastProvider } from './components/ToastProvider';
import { useLocalStorage } from './hooks/useLocalStorage';
import { secureRandomIndex } from './utils/random';

const APP_STATES = {
    INPUT: 'INPUT',
    DECIDING: 'DECIDING',
    WINNER: 'WINNER'
};

const CONFIG = { LOCAL_STORAGE_KEY: 'apple-vision-decide-options' };

export interface Option {
    id: string;
    text: string;
}

export interface ProcessedOption extends Option {
    originalIndex: number;
}

export default function App() {
    const [options, setOptions] = useLocalStorage<Option[]>(CONFIG.LOCAL_STORAGE_KEY, [
        { id: 'opt-1', text: '' },
        { id: 'opt-2', text: '' }
    ]);
    const [appState, setAppState] = useState(APP_STATES.INPUT);
    const [winner, setWinner] = useState<ProcessedOption | null>(null);

    const processedOptions: ProcessedOption[] = options.map((opt, idx) => ({
        ...opt,
        originalIndex: idx,
        text: opt.text.trim() === '' ? `${idx + 1}` : opt.text.trim()
    }));

    const canDecide = processedOptions.length >= 2;

    const handleDecide = useCallback(() => {
        if (canDecide) {
            setAppState(APP_STATES.DECIDING);
        }
    }, [canDecide]);

    const handleComplete = useCallback(() => {
        const randomIndex = secureRandomIndex(processedOptions.length);
        setWinner(processedOptions[randomIndex]);
        setAppState(APP_STATES.WINNER);
    }, [processedOptions]);

    const handleReset = useCallback(() => {
        setAppState(APP_STATES.INPUT);
        setWinner(null);
    }, []);

    return (
        <ToastProvider>
            <BackgroundBlobs />
            <div className="w-full h-full sm:w-[400px] sm:h-[800px] sm:max-h-[90vh] relative flex flex-col sm:rounded-[40px] sm:shadow-2xl sm:border sm:border-white/50 overflow-hidden sm:bg-white/10 sm:backdrop-blur-xl">
                <AnimatePresence mode="wait">
                    {appState === APP_STATES.INPUT && (
                        <InputView
                            key="input-view"
                            options={options}
                            setOptions={setOptions}
                            onDecide={handleDecide}
                            canDecide={canDecide}
                        />
                    )}
                    {appState === APP_STATES.DECIDING && (
                        <DecidingView
                            key="deciding-view"
                            options={processedOptions}
                            onComplete={handleComplete}
                        />
                    )}
                    {appState === APP_STATES.WINNER && winner && (
                        <WinnerView
                            key="winner-view"
                            winner={winner}
                            onReset={handleReset}
                        />
                    )}
                </AnimatePresence>
            </div>
        </ToastProvider>
    );
}
