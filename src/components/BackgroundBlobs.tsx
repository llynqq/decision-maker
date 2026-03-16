import React from 'react';
import { motion } from 'motion/react';

export const BackgroundBlobs = React.memo(() => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#f4f4f8] no-select">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fbfbfd] via-[#f0f0f5] to-[#e6e6f0] bg-[length:400%_400%] animate-gradient-xy opacity-90" />
            
            <motion.div
                animate={{
                    x: ['-5vw', '15vw', '-5vw'],
                    y: ['-5vh', '15vh', '-5vh'],
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] min-w-[300px] min-h-[300px] rounded-full bg-[#ff2d55] opacity-[0.15] blur-[80px] will-change-transform"
            />
            
            <motion.div
                animate={{
                    x: ['10vw', '-15vw', '10vw'],
                    y: ['10vh', '-10vh', '10vh'],
                    scale: [1.2, 0.9, 1.2],
                    rotate: [0, -90, 0]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] min-w-[350px] min-h-[350px] rounded-full bg-[#007aff] opacity-[0.15] blur-[90px] will-change-transform"
            />
            
            <motion.div
                animate={{
                    x: ['15vw', '-5vw', '15vw'],
                    y: ['-10vh', '10vh', '-10vh'],
                    scale: [0.9, 1.3, 0.9],
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[30%] left-[20%] w-[60vw] h-[60vw] min-w-[250px] min-h-[250px] rounded-full bg-[#5856d6] opacity-[0.12] blur-[70px] will-change-transform"
            />

            <motion.div
                animate={{
                    x: ['-10vw', '10vw', '-10vw'],
                    y: ['15vh', '-15vh', '15vh'],
                    scale: [1.1, 0.8, 1.1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] right-[20%] w-[50vw] h-[50vw] min-w-[200px] min-h-[200px] rounded-full bg-[#34c759] opacity-[0.12] blur-[80px] will-change-transform"
            />
        </div>
    );
});
