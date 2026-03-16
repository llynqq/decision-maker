import React, { useState, useRef, useCallback, useEffect } from 'react';

export const ScrollShadow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isBottom, setIsBottom] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setIsScrolled(scrollTop > 5);
        setIsBottom(Math.abs(scrollHeight - clientHeight - scrollTop) < 2);
    }, []);

    useEffect(() => {
        handleScroll();
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, [children, handleScroll]);

    let maskImage = 'none';
    if (isScrolled && !isBottom) {
        maskImage = 'linear-gradient(to bottom, transparent, black 24px, black calc(100% - 128px), transparent 100%)';
    } else if (isScrolled && isBottom) {
        maskImage = 'linear-gradient(to bottom, transparent, black 24px, black 100%)';
    } else if (!isScrolled && !isBottom) {
        maskImage = 'linear-gradient(to bottom, black 0%, black calc(100% - 128px), transparent 100%)';
    }

    return (
        <div className={`relative flex-1 w-full overflow-hidden ${className}`}>
            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="absolute inset-0 overflow-y-auto pb-32 pt-2 px-6"
                style={{ 
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none',
                    maskImage,
                    WebkitMaskImage: maskImage
                }}
            >
                {children}
            </div>
        </div>
    );
};
