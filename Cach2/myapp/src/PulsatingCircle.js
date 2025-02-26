import React, { useRef, useEffect } from 'react';

const PulsatingCircle = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const scaleRef = useRef(1);

    const drawCircle = (scale) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        context.clearRect(0, 0, width, height);
        context.fillStyle = 'yellow';
        context.beginPath();
        context.arc(width / 2, height / 2, 50 * scale, 0, Math.PI * 2);
        context.fill();
    };

    const animate = () => {
        scaleRef.current += 0.04;

        // Reset scale when it reaches a maximum value
        if (scaleRef.current >= 5) {
            scaleRef.current = 1; // Đặt lại scale về 1
        }

        drawCircle(scaleRef.current);
        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ backgroundColor: 'blue', display: 'block', width: '100%', height: '100%' }} />;
};

export default PulsatingCircle;