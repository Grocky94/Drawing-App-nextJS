import { useEffect, useRef, useState } from 'react';

export const useDraw = (onDraw) => {
  const [drawing, setDrawing] = useState(false);

  const canvasRef = useRef(null);
  const prevPoint = useRef(null);

  const startDrawing = () => setDrawing(true);
  const stopDrawing = () => {
    setDrawing(false);
    prevPoint.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const drawHandler = (e) => {
      if (!drawing) return;

      e.preventDefault(); // Prevent scrolling on touch devices

      const currentPoint = computePointInCanvas(e);

      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      let x, y;
      if (e.type.startsWith('touch')) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }

      return { x, y };
    };

    // Add event listeners for both mouse and touch events
    canvasRef.current?.addEventListener('mousedown', startDrawing);
    canvasRef.current?.addEventListener('mousemove', drawHandler);
    window.addEventListener('mouseup', stopDrawing);

    canvasRef.current?.addEventListener('touchstart', startDrawing);
    canvasRef.current?.addEventListener('touchmove', drawHandler);
    window.addEventListener('touchend', stopDrawing);

    // Remove event listeners
    return () => {
      canvasRef.current?.removeEventListener('mousedown', startDrawing);
      canvasRef.current?.removeEventListener('mousemove', drawHandler);
      window.removeEventListener('mouseup', stopDrawing);

      canvasRef.current?.removeEventListener('touchstart', startDrawing);
      canvasRef.current?.removeEventListener('touchmove', drawHandler);
      window.removeEventListener('touchend', stopDrawing);
    };
  }, [onDraw, drawing]);

  return { canvasRef, clear };
};
