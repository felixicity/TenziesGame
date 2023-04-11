import React from 'react'
import Dot from './dot'
import './tenzies.css'


const Die = (props) => {

    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
    }
   
  const value = props.value
  const die = value.map(num => value.length === 5 ? <Dot className = "five" /> : <Dot/>)

  return (
    <div style = {style}  
        className='die-face' 
        onClick = {props.holdDice}
    >
       <div className = {
        value.length === 5 ? "dot5":
        value.length === 4 ? "dot4":
        value.length === 3 ? "dot3":
        value.length === 2 ? "dot2": 
        value.length === 1 ?"dot1" :
        "die-num" 
        }> 
          {die}
       </div>
    </div>
  )
}

export default Die