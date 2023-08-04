import React from 'react'
import { Ihistory } from './ChessBoard'
import '../style/History.css'
type props = {
  history: Ihistory[]
  handleChange:(h:Ihistory)=>void
}
export default function History({history,handleChange}:props) {
  // function change(e:any){
  //   // console.log(e);
    
  //   // console.log(history);
  //   // console.log(e.currentTarget.getAttribute('data-h'));
    
  //   // handleChange()
    
  // }
  return (
    <>
      <div className='history'>
        <span>棋盘信息</span>
          {
            history.map((h,index) => <div className='status' key={index} onClick={()=>{handleChange(h);
            }} >
              {`棋盘${index+1}`}

            </div>)
          }
       
      </div>
    </>

  )
}
