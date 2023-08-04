import React, { useEffect, useRef, useState } from 'react';
import './style/App.css'
// import { useEffect, useState,useMemo} from 'react'
import ChessBoard from './component/ChessBoard';
// import Button from './component/Button'
function App() {
  let [black,setBlack] = useState(0)
  let [white,setWhite] = useState(0)
  let canvasRef = useRef<HTMLCanvasElement>(null);
  function init() {
    let canvas = canvasRef.current as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.fillStyle = "#FFF5E9";
    context.fillRect(0, 0, canvas.width, canvas.height);
    let grid_cols = 14;
    let grid_rows = 14;
    let cell_height = canvas.height / grid_rows;
    let cell_width = canvas.width / grid_cols;
    context.lineWidth = 0.5;
    //横线
    for (let col = 0; col <= grid_cols; col++) {
      let x = col * cell_width;
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
    }
    //竖线
    for (let row = 0; row <= grid_rows; row++) {
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

  function handleWinner(winner:number){
    // window.confirm(`${winner === 1 ? '黑':'白'}赢了`)
    // console.log('ww');
    winner === 1 ? setBlack(black + 1) : setWhite(white + 1)
    
  }
  return (
    <div className="App">
      
    <div><canvas ref={canvasRef} width="700px" height="700px"></canvas></div>
        

        <ChessBoard handleWinner={handleWinner}></ChessBoard>
        <div className='black'>
          <div className='avator'></div>
          <div className='score'>积分:{black}</div>
        </div>
        <div className='white'>
          <div className='avator'></div>
          <div className='score'>积分:{white}</div>
        </div>
        {/* <Button></Button> */}
     

    </div>
  );
}

export default App;
