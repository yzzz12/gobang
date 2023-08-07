import React, { useEffect, useRef, useState } from 'react';
import ChessBoard from './component/ChessBoard';
import {ROW,COLUMN,CHESS} from './const'
import './style/App.css'
function App() {
  let [black, setBlack] = useState(0)
  let [white, setWhite] = useState(0)
  let canvasRef = useRef<HTMLCanvasElement>(null);
  function init() {
    let canvas = canvasRef.current as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.fillStyle = "#FFF5E9";
    context.fillRect(0, 0, canvas.width, canvas.height);
    let cols = COLUMN - 1;
    let rows = ROW - 1;
    let cell_height = canvas.height / rows;
    let cell_width = canvas.width / cols;
    context.lineWidth = 0.5;
    //横线
    for (let col = 0; col <= cols; col++) {
      let x = col * cell_width;
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
    }
    //竖线
    for (let row = 0; row <= rows; row++) {
      let y = row * cell_height;
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
    }
    //完成描绘
    context.stroke();
  }
  useEffect(() => {
    init(); //初始化绘制棋盘
  }, []);
  function handleWinner(winner: number) {
    winner === CHESS.BLACK ? setBlack(black + 1) : setWhite(white + 1)
  }
  return (
    <div className="App">
      <div>
        <canvas ref={canvasRef} width="700px" height="700px"></canvas>
      </div>
      <ChessBoard handleWinner={handleWinner}></ChessBoard>
      <div className='black'>
        <div className='avator'></div>
        <div className='score'>积分:{black}</div>
      </div>
      <div className='white'>
        <div className='avator'></div>
        <div className='score'>积分:{white}</div>
      </div>
    </div>
  );
}

export default App;
