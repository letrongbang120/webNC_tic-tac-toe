import React from 'react'

import './Square.css'

export default function Square(props) {
  return (
    <div
      className={props.isWinLine ? "square win" : "square"}
      // className="square"
      onClick={props.clickHandler}
    >
      {props.value}
    </div>
  )
}
