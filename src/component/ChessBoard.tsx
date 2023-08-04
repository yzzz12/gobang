import React, { useState, useEffect } from 'react'
import '../style/ChessBoard.css'
import Control from './Control'
import History from './History'
type props = {
    handleWinner: (winner: number) => void
}
interface IChess{
    row:number,
    col:number
}
 export interface Ihistory{
    playArr:number[][],
    curChess:IChess[],
    flag:boolean,
    play:boolean
}
export default function ChessBoard({ handleWinner }: props) {
    let border = Array(15).fill(null)
    let [playArr, setPlayArr] = useState<number[][]>(Array.from(new Array(15)).map(() => new Array(15).fill(0)))
    // let curChess=[{}] 
    let [curChess,setCurChess] = useState<IChess[]>([])
    let [flag, setFlag] = useState(true)
    // let gameOver = 0
    // let [gameOver,setGameOver] = useState(0)
    let [play, setPlay] = useState(false)
    let [history,sethistory] = useState<Ihistory[]>([])
    let [ctrl,setCtrl]=useState({
        play:false,
        store:true,
        withdraw:true
    })
    // let [row,setRow] = useState(0)
    // let [col,setCol] = useState(0)
    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!play) return
        setCtrl({
            play:false,
            store:false,
            withdraw:false
        })
        let row: number = Number(e.currentTarget.getAttribute('data-row'))
        let col: number = Number(e.currentTarget.getAttribute('data-col'))
        // setRow(Number(e.currentTarget.getAttribute('data-row')))
        // setCol(Number(e.currentTarget.getAttribute('data-col')))
        console.log(row, col);
        if (playArr[row][col] === 0) {
            if (flag) {
                // let a = playArr
                let a = JSON.parse(JSON.stringify(playArr))
                a[row][col] = 1
                setPlayArr(a)
                
                setFlag(false)
                setCurChess([...curChess,{row,col}])
               
                
            }
            else {
                // let a = playArr
                let a = JSON.parse(JSON.stringify(playArr))
                a[row][col] = 2
                setPlayArr(a)
                setFlag(true)
                setCurChess([...curChess,{row,col}])
                
            }
        }
        console.log("curChess",curChess);
        console.log("playArr", playArr);
        console.log('history',history);
        // setTimeout(()=>{
        //     judge(row, col)
        // },1000)

        // judge(row, col)
        // handleWinner(judge(row, col))
        // if(judge(row, col)){
        //     window.confirm(`${playArr[row][col] === 1 ? '黑':'白'}赢了`)
        // }
    }
    useEffect(()=>{
        let chess = curChess[curChess.length-1]
        if(chess === undefined) return
        // console.log('chess',chess!);
        
        // console.log('chess',chess.row,chess.col);
        
        judge(chess.row,chess.col)
    },[curChess])

    function judge(row: number, col: number) {
        // if(playArr[row][col] === 0) return
        //上下
        let rowCount = 0
        for (let i = row - 1; i >= 0; i--) {
            if (playArr[i][col] !== playArr[row][col]) break
            rowCount += 1
        }
        for (let i = row + 1; i < 15; i++) {
            if (playArr[i][col] !== playArr[row][col]) break
            rowCount += 1
        }
        // console.log("rowCount=", rowCount);
        // if (rowCount >= 4) {
        //     console.log(playArr[row][col], 'wwwwwwwwww');
        // }
        //左右
        let colCount = 0
        for (let i = col - 1; i >= 0; i--) {
            if (playArr[row][i] !== playArr[row][col]) break
            colCount += 1
        }
        for (let i = col + 1; i < 15; i++) {
            if (playArr[row][i] !== playArr[row][col]) break
            colCount += 1
        }
        // console.log("colCount=", colCount);
        // if (colCount >= 4) {
        //     console.log(playArr[row][col], 'wwwwwwwwww');
        // }
        //左斜
        let leftCount = 0
        for (let i = row - 1, j = col + 1; i >= 0 && j < 15; i--, j++) {
            if (playArr[i][j] !== playArr[row][col]) break
            leftCount += 1
        }
        for (let i = row + 1, j = col - 1; i < 15 && j >= 0; i++, j--) {
            if (playArr[i][j] !== playArr[row][col]) break
            leftCount += 1
        }
        // console.log("leftCount=",leftCount);
        // if (leftCount >= 4) {
        //     console.log(playArr[row][col], 'wwwwwwwwww');
        // }
        //右斜
        let rightCount = 0
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (playArr[i][j] !== playArr[row][col]) break
            rightCount += 1
        }
        for (let i = row + 1, j = col + 1; i < 15 && j < 15; i++, j++) {
            if (playArr[i][j] !== playArr[row][col]) break
            rightCount += 1
        }
        // console.log("rightCount=",rightCount);
        // if (rightCount >= 4) {
        //     console.log(playArr[row][col], 'wwwwwwwwww');
        // }
        if (rowCount >= 4 || colCount >= 4 || leftCount >= 4 || rightCount >= 4) {
            // if(playArr[row][col] === 1){

            // }
            // setGameOver(playArr[row][col])
            // gameOver = playArr[row][col]
            // console.log("gameOver",gameOver);

            // console.log("wwwwwwwwwwwww");

            // window.confirm(`${playArr[row][col] === 1 ? '黑':'白'}赢了`)
            setTimeout(() => {
                if (window.confirm(`${playArr[row][col] === 1 ? '黑棋' : '白棋'}赢了，是否再来一局？`)) {
                    // window.location.reload()
                    setPlay(true)
                    setPlayArr(Array.from(new Array(15)).map(() => new Array(15).fill(0)))
                    setFlag(true)
                    setCurChess([])
                    // return
                }

                else {
                    setPlay(false)
                }
                setCtrl({
                    play:false,
                    store:true,
                    withdraw:true
                })

            }, 100)
            handleWinner(playArr[row][col])
            // return playArr[row][col]
        }
    }
    function handlePlay() {
        setPlay(true)
        setPlayArr(Array.from(new Array(15)).map(() => new Array(15).fill(0)))
        setFlag(true)
        setCurChess([])
        // setGameOver(0)
    }
    function handleWithdraw(){
        if(curChess.length === 0) return 
        console.log("curChess",curChess);
        let chess = curChess[curChess.length-1]
        setCurChess(
            curChess.filter((chess,index)=> index !== curChess.length-1)
        )
        setFlag(!flag)
        // let a = playArr
        let a = JSON.parse(JSON.stringify(playArr))
        a[chess.row][chess.col] = 0
        setPlayArr(a)
        console.log('lll',curChess);
        if(curChess.length === 1){
            setCtrl({
                play:false,
                store:true,
                withdraw:true
            })
        }
        
    }
    function handleStore(){
        // console.log('history playarr',playArr);
        let h = JSON.parse(JSON.stringify(history))
        if(history.length === 10){
            
            h.shift()

        }
        let a = JSON.parse(JSON.stringify(playArr))
        sethistory([...h,{playArr:a,curChess,flag,play}])
        console.log("history",history);
        
    }
    function handleChange(h:Ihistory){
        console.log('hh',h);
        setPlayArr(h.playArr)
        setCurChess(h.curChess)
        setFlag(h.flag)
        setPlay(h.play)
        
    }
    return (
        <>
            <div className="chessboard">
                {border.map((col, colIndex) => (
                    <div className="chessboard-col" key={`col + ${colIndex}`}>
                        {border.map((row, rowIndex) => (
                            <div className="chessboard-row" key={`row + ${rowIndex}`}>
                                {
                                    playArr[rowIndex][colIndex] !== 0 ? (playArr[rowIndex][colIndex] === 1 ? <div className="chessboard-cell-black"></div> : <div className="chessboard-cell-white"></div>) : <div className='chessboard-cell' data-row={rowIndex} data-col={colIndex} onClick={handleClick}></div>
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <History history={history} handleChange={handleChange}></History>
            <Control ctrl={ctrl} handlePlay={handlePlay} handleWithdraw={handleWithdraw} handleStore={handleStore}></Control>
        </>
    )
}
