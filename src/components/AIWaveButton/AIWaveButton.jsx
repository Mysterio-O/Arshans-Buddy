import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';

const AIWaveButton = ({ isSpeaking }) => {
    const buttonRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 200, height: 60 });

    // Update dimensions when component mounts
    useEffect(() => {
        if (buttonRef.current) {
            const { width, height } = buttonRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    }, []);

    // Simple canvas-based wave animation (no WebGL)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set explicit canvas size
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        let time = 0;
        const waves = [
            { amplitude: 10, frequency: 0.02, speed: 0.05, color: 'rgba(165, 214, 167, 0.6)' },
            { amplitude: 8, frequency: 0.03, speed: 0.07, color: 'rgba(255, 245, 157, 0.5)' },
            { amplitude: 6, frequency: 0.04, speed: 0.09, color: 'rgba(179, 229, 252, 0.4)' }
        ];

        const drawWaves = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            waves.forEach(wave => {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);

                for (let x = 0; x < canvas.width; x++) {
                    const y = canvas.height / 2 +
                        Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();

                ctx.fillStyle = wave.color;
                ctx.fill();
            });

            time += 0.1;
            animationRef.current = requestAnimationFrame(drawWaves);
        };

        if (isSpeaking) {
            drawWaves();
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw a simple background when not speaking
            ctx.fillStyle = 'rgba(165, 214, 167, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isSpeaking, dimensions]);

    // Button animation on mount
    useEffect(() => {
        if (buttonRef.current) {
            gsap.from(buttonRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.8)',
                delay: 0.3
            });
        }
    }, []);

    // Hover animation
    useEffect(() => {
        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                scale: isHovered ? 1.05 : 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }, [isHovered]);

    return (
        <motion.div
            ref={buttonRef}
            className="relative overflow-hidden rounded-full shadow-lg cursor-pointer"
            style={{
                width: '200px',
                height: '200px',
                minWidth: '200px',
                minHeight: '60px'
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.95 }}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-70"
                style={{ zIndex: 0 }}
                width={dimensions.width}
                height={dimensions.height}
            />

            <div className="relative z-10 w-full h-full flex items-center justify-center bg-gradient-to-r from-leaf-green to-muted-blue-green dark:from-soft-yellow dark:to-warm-yellow">
                <div className="flex items-center justify-center space-x-3">
                    <svg
                        className={`w-6 h-6 ${isSpeaking ? 'text-red-400' : 'text-white dark:text-primary-dark'}`}
                        fill="currentColor"
                        viewBox="0 0 10 10"
                    >
                        {isSpeaking ? (
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                        ) : (
                            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                        )}
                    </svg>

                    {/* <span className="text-lg font-medium text-white dark:text-primary-dark">
                        {isSpeaking ? 'Stop' : 'Speak'}
                    </span> */}
                </div>
            </div>

            {/* Animated circles for speaking state */}
            {isSpeaking && (
                <>
                    <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-leaf-green dark:border-soft-yellow"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: [0, 0.5, 0], scale: [1, 1.2, 1.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ zIndex: 5 }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-leaf-green dark:border-soft-yellow"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: [0, 0.3, 0], scale: [1, 1.4, 1.8] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        style={{ zIndex: 5 }}
                    />
                </>
            )}

            {/* Debug info - remove in production */}
            <div className="absolute top-0 right-0 bg-black text-white text-xs p-1 opacity-70 z-20">
                {Math.round(dimensions.width)}x{Math.round(dimensions.height)}
            </div>
        </motion.div>
    );
};

export default AIWaveButton;