import React, { useState } from 'react'
import '../style/Control.css'
type props = {
  ctrl:{
    play:boolean,
    store:boolean,
    withdraw:boolean
  }
  handlePlay: ()=> void
  handleWithdraw: ()=> void
  handleStore: ()=> void
}
export default function Button({ctrl,handlePlay,handleWithdraw,handleStore}:props) {
  let [reset,setReset] = useState(true)
  function play(){
    setReset(false)  
    handlePlay()
  }
  function withdraw(){
    handleWithdraw()
  }
  function store(){
    handleStore()
  }
  return (
    <div>
        <button className='play' onClick={play} disabled={ctrl.play}>
          {reset ? '开始' : '重新开始'}
        </button>
        <button className='store' onClick={store} disabled={ctrl.store}>保存棋盘</button>
        <button className='withdraw' onClick={withdraw} disabled={ctrl.store}>悔棋</button>
    </div>
  )
}
