import React from 'react'
import Square from './Square'
import './Board.css'

export default function Board(props) {
  return (
    <div className="board">
      {props.squares.map((square, i) => {
        return <Square
          key={i}
          isWinLine={props.winLine.includes(i) ? true : false}
          value={square}
          clickHandler={() => { props.clickHandler(i) }}
        />
      })}
    </div>
  )
}
