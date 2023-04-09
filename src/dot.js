import React from 'react'
import './tenzies.css'

const Dot = (props) => {
  return (
    <div className= {props.className == "five" ? "dot five" : "dot"}>
      
    </div>
  )
}

export default Dot