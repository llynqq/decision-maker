/**
 * Cryptographically secure random integer generator avoiding modulo bias.
 * Returns an integer between 0 (inclusive) and max (exclusive).
 */
export function secureRandomIndex(max: number): number {
    if (max <= 0) return 0;
    
    // Fallback if crypto is not available
    if (typeof window === 'undefined' || !window.crypto || !window.crypto.getRandomValues) {
        return Math.floor(Math.random() * max);
    }

    const randomBuffer = new Uint32Array(1);
    const maxUint32 = 0xFFFFFFFF;
    
    // Calculate the limit to avoid modulo bias
    // We discard any random values greater than or equal to this limit
    const limit = maxUint32 - (maxUint32 % max);
    
    let randomValue;
    do {
        window.crypto.getRandomValues(randomBuffer);
        randomValue = randomBuffer[0];
    } while (randomValue >= limit);

    return randomValue % max;
}
