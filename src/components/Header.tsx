import React from 'react';
import { motion } from 'motion/react';

export const Header = () => (
    <header className="w-full pt-[max(env(safe-area-inset-top),3rem)] pb-6 px-6 flex flex-col items-center justify-center flex-shrink-0 relative z-20 no-select">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            className="text-center"
        >
            <h1 className="text-[34px] font-bold tracking-tight leading-tight text-zinc-900">
                Decide
            </h1>
            <p className="text-zinc-500 text-[15px] mt-1 font-medium tracking-wide">
                Add options and let fate decide.
            </p>
        </motion.div>
    </header>
);
