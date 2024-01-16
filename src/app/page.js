"use client"
import { useState } from 'react';
import { useDraw } from './hooks/useDraw';
import styles from "./page.module.css"
const Page = () => {
  const [color, setColor] = useState('');
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const colorHandler = (e) => {
    setColor(e.target.dataset.color)
  }

  function drawLine({ prevPoint, currentPoint, ctx }) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Canvas</h1>
      <div style={{ width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '10px' }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", border: "1px solid black", height: "200px" }}>
            <div className={styles.colorpick} style={{ backgroundColor: "#00FF00" }} data-color="#00FF00" onClick={colorHandler}></div>
            <div className={styles.colorpick} style={{ backgroundColor: "#6600FF" }} data-color="#6600FF" onClick={colorHandler}></div>
            <div className={styles.colorpick} style={{ backgroundColor: "#FF6600" }} data-color="#FF6600" onClick={colorHandler}></div>
            <div className={styles.colorpick} style={{ backgroundColor: "#FFFF00" }} data-color="#FFFF00" onClick={colorHandler}></div>
            <div className={styles.colorpick} style={{ backgroundColor: "#FF0000" }} data-color="#FF0000" onClick={colorHandler}></div>
            <div className={styles.colorpick} style={{ backgroundColor: "#0000FF" }} data-color="#0000FF" onClick={colorHandler}></div>
            <div className={styles.colorpick} style={{ backgroundColor: "#000" }} data-color="#000" onClick={colorHandler}></div>
          </div>
          <button type='button' style={{ padding: '8px', borderRadius: '4px', border: '1px solid black' }} onClick={clear}>
            Clear canvas
          </button>
        </div>
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={650}
          height={550}
          style={{ border: '1px solid black', borderRadius: '4px' }}
        />
      </div>
    </>
  );
};

export default Page;
