import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AIWaveButton = () => {
    const buttonRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Update dimensions on mount and resize
    useEffect(() => {
        const updateDimensions = () => {
            if (buttonRef.current) {
                const { width, height } = buttonRef.current.getBoundingClientRect();
                setDimensions({ width: Math.floor(width), height: Math.floor(height) });
            }
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Canvas-based wave animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        let time = 0;
        const waves = [
            { amplitude: 12, frequency: 0.025, speed: 0.06, color: 'rgba(255, 138, 101, 0.8)' }, // Coral
            { amplitude: 10, frequency: 0.035, speed: 0.08, color: 'rgba(255, 204, 128, 0.7)' }, // Light Orange
            { amplitude: 8, frequency: 0.045, speed: 0.1, color: 'rgba(165, 214, 167, 0.6)' } // Leaf Green
        ];

        const drawWaves = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Solid background for visibility
            ctx.fillStyle = 'rgba(255, 245, 157, 1)'; // Soft Yellow
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            waves.forEach(wave => {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);

                for (let x = 0; x < canvas.width; x++) {
                    const y = canvas.height / 2 +
                        Math.sin(x * wave.frequency + time * wave.speed) *
                        wave.amplitude * (isHovered ? 1.5 : 1);
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();

                ctx.fillStyle = wave.color;
                ctx.fill();
            });

            time += 0.12;
            animationRef.current = requestAnimationFrame(drawWaves);
        };

        if (isSpeaking) {
            drawWaves();
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'rgba(255, 138, 101, 0.7)'); // Coral
            gradient.addColorStop(1, 'rgba(255, 204, 128, 0.6)'); // Light Orange
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isSpeaking, dimensions, isHovered]);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 1000 }}
        >
            <motion.div
                ref={buttonRef}
                onClick={() => setIsSpeaking(!isSpeaking)}
                className="relative overflow-hidden rounded-full shadow-lg cursor-pointer"
                style={{
                    width: 'min(200px, 50vw, 50vh)', // Responsive size
                    height: 'min(200px, 50vw, 50vh)',
                    background: 'linear-gradient(135deg, #FF8A65, #FFF59D)', // Coral to Soft Yellow
                    border: '3px solid #FFCC80', // Light Orange border
                    boxSizing: 'border-box'
                }}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: isHovered ? 1.1 : 1, opacity: 1 }}
                transition={{ scale: { duration: 0.4, ease: 'easeOut' }, opacity: { duration: 0.8, ease: 'easeOut', delay: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: 1, opacity: 0.95 }}
                    width={dimensions.width}
                    height={dimensions.height}
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="flex items-center justify-center space-x-3">
                        <motion.svg
                            className={`w-8 h-8 ${isSpeaking ? 'text-[#FF8A65]' : 'text-[#333333] dark:text-[#E0E0E0]'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            animate={{ scale: isSpeaking ? [1, 1.1, 1] : 1 }}
                            transition={{ repeat: isSpeaking ? Infinity : 0, duration: 0.6, ease: 'easeInOut' }}
                        >
                            {isSpeaking ? (
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                            ) : (
                                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                            )}
                        </motion.svg>
                        <motion.span
                            className={`text-lg font-semibold ${isSpeaking ? 'text-[#FF8A65]' : 'text-[#333333] dark:text-[#E0E0E0]'}`}
                            animate={{ y: isSpeaking ? [0, -3, 0] : 0 }}
                            transition={{ repeat: isSpeaking ? Infinity : 0, duration: 0.6, ease: 'easeInOut' }}
                        >
                            {isSpeaking ? 'Stop' : 'Speak'}
                        </motion.span>
                    </div>
                </div>
                {isSpeaking && (
                    <>
                        <motion.div
                            className="absolute inset-0 rounded-full border-3 border-[#FFCC80] dark:border-[#FFA726]"
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: [0, 0.6, 0], scale: [1, 1.3, 1.5] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                            style={{ zIndex: 5 }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border-3 border-[#FFCC80] dark:border-[#FFA726]"
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: [0, 0.4, 0], scale: [1, 1.5, 1.9] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4, ease: 'easeOut' }}
                            style={{ zIndex: 5 }}
                        />
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default AIWaveButton;