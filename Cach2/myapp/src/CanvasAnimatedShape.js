import React, { useEffect, useRef, useState } from 'react';

const CanvasAnimatedShape = () => {
  const canvasRef = useRef(null);
  const [currentWidth, setCurrentWidth] = useState(10);
  const colors = ["red", "blue", "green", "purple", "orange"];
  const [colorIndex, setColorIndex] = useState(0);
  const maxWidth = 600;
  const minWidth = 10;
  const growthRate = 3; // Tốc độ tăng chiều rộng

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawShape = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Tạo gradient
      const gradient = ctx.createLinearGradient(0, 0, currentWidth, 0);
      gradient.addColorStop(0, colors[colorIndex]);
      gradient.addColorStop(1, "white");

      ctx.fillStyle = gradient;
      ctx.save();
      ctx.translate(150, 130);
      ctx.transform(1, 0, Math.tan(60 * Math.PI / 180), 1, 0, 0); // Thay đổi góc xéo
      ctx.rotate(30 * Math.PI / 180); // Thay đổi góc xoay
      ctx.fillRect(0, 0, currentWidth, 150);
      ctx.restore();
    };

    const animateShape = () => {
      setCurrentWidth(prevWidth => {
        const newWidth = prevWidth >= maxWidth ? minWidth : prevWidth + growthRate; // Sử dụng growthRate
        if (newWidth === minWidth) {
          setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }
        return newWidth;
      });

      drawShape();
      requestAnimationFrame(animateShape);
    };

    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    setCanvasSize();
    animateShape();
    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [currentWidth, colorIndex]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'black' }}
    />
  );
};

export default CanvasAnimatedShape;