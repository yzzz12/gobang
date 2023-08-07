import React, { useState, useEffect } from 'react'
import Control from './Control'
import History from './History'
import {ROW,CHESS} from '../const'
import '../style/ChessBoard.css'
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
    let border = Array(ROW).fill(null)
    let [playArr, setPlayArr] = useState<number[][]>(Array.from(new Array(ROW)).map(() => new Array(ROW).fill(0)))
    let [curChess,setCurChess] = useState<IChess[]>([])
    let [flag, setFlag] = useState(true)
    let [play, setPlay] = useState(false)
    let [history,sethistory] = useState<Ihistory[]>([])
    let [ctrl,setCtrl]=useState({
        play:false,
        store:true,
        withdraw:true
    })
    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!play) return
        setCtrl({
            play:false,
            store:false,
            withdraw:false
        })
        let row: number = Number(e.currentTarget.getAttribute('data-row'))
        let col: number = Number(e.currentTarget.getAttribute('data-col'))
        // console.log(row, col);
        if (playArr[row][col] === CHESS.NULL) {
            if (flag) {
                let tmp = JSON.parse(JSON.stringify(playArr))
                tmp[row][col] = CHESS.BLACK
                setPlayArr(tmp)              
                setFlag(false)
                setCurChess([...curChess,{row,col}])            
            }
            else {
                let tmp = JSON.parse(JSON.stringify(playArr))
                tmp[row][col] = CHESS.WHITE
                setPlayArr(tmp)
                setFlag(true)
                setCurChess([...curChess,{row,col}])          
            }
        }
        // console.log("curChess",curChess);
        // console.log("playArr", playArr);
        // console.log('history',history);
    }
    useEffect(()=>{
        let chess = curChess[curChess.length-1]
        if(chess === undefined) return
        judge(chess.row,chess.col)
    },[curChess])
    function judge(row: number, col: number) {
        //上下
        let rowCount = 0
        for (let i = row - 1; i >= 0; i--) {
            if (playArr[i][col] !== playArr[row][col]) break
            rowCount += 1
        }
        for (let i = row + 1; i < ROW; i++) {
            if (playArr[i][col] !== playArr[row][col]) break
            rowCount += 1
        }
        //左右
        let colCount = 0
        for (let i = col - 1; i >= 0; i--) {
            if (playArr[row][i] !== playArr[row][col]) break
            colCount += 1
        }
        for (let i = col + 1; i < ROW; i++) {
            if (playArr[row][i] !== playArr[row][col]) break
            colCount += 1
        }
        //左斜
        let leftCount = 0
        for (let i = row - 1, j = col + 1; i >= 0 && j < ROW; i--, j++) {
            if (playArr[i][j] !== playArr[row][col]) break
            leftCount += 1
        }
        for (let i = row + 1, j = col - 1; i < ROW && j >= 0; i++, j--) {
            if (playArr[i][j] !== playArr[row][col]) break
            leftCount += 1
        }
        //右斜
        let rightCount = 0
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (playArr[i][j] !== playArr[row][col]) break
            rightCount += 1
        }
        for (let i = row + 1, j = col + 1; i < ROW && j < ROW; i++, j++) {
            if (playArr[i][j] !== playArr[row][col]) break
            rightCount += 1
        }
        if (rowCount >= 4 || colCount >= 4 || leftCount >= 4 || rightCount >= 4) {
            setTimeout(() => {
                if (window.confirm(`${playArr[row][col] === CHESS.BLACK ? '黑棋' : '白棋'}赢了，是否再来一局？`)) {
                    // window.location.reload()
                    setPlay(true)
                    setPlayArr(Array.from(new Array(ROW)).map(() => new Array(ROW).fill(0)))
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
        }
    }
    //开始
    function handlePlay() {
        setPlay(true)
        setPlayArr(Array.from(new Array(ROW)).map(() => new Array(ROW).fill(0)))
        setFlag(true)
        setCurChess([])
    }
    //悔棋
    function handleWithdraw(){
        if(curChess.length === 0) return 
        // console.log("curChess",curChess);
        let chess = curChess[curChess.length-1]
        setCurChess(
            curChess.filter((chess,index)=> index !== curChess.length-1)
        )
        setFlag(!flag)
        let tmp = JSON.parse(JSON.stringify(playArr))
        tmp[chess.row][chess.col] = CHESS.NULL
        setPlayArr(tmp)
        // console.log('lll',curChess);
        if(curChess.length === 1){
            setCtrl({
                play:false,
                store:true,
                withdraw:true
            })
        }
        
    }
    //保存
    function handleStore(){
        let h = JSON.parse(JSON.stringify(history))
        if(history.length === 10) h.shift()     
        let tmp = JSON.parse(JSON.stringify(playArr))
        sethistory([...h,{playArr:tmp,curChess,flag,play}])
        // console.log("history",history);      
    }
    //切换历史状态
    function handleChange(h:Ihistory){
        // console.log('hh',h);
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
                                    playArr[rowIndex][colIndex] !== CHESS.NULL ? (playArr[rowIndex][colIndex] === CHESS.BLACK ? <div className="chessboard-cell-black"></div> : <div className="chessboard-cell-white"></div>) : <div className='chessboard-cell' data-row={rowIndex} data-col={colIndex} onClick={handleClick}></div>
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
