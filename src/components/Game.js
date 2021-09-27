import React, { useState } from 'react'
import Board from './Board'
import './Game.css'

export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: [Array(9).fill(null)],
    }
  ]);
  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [selected, setSelected] = useState(0);
  const [isDraw, setIsDraw] = useState(false);
  const [isAscending, setIsAscending] = useState(true);

  const calcWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return line;
      }
    }
    return null;
  };

  const checkDraw = (squares) => {
    const win = calcWinner(squares);
    if (step === 8 && !win) {
      return true;
    }
    return false;
  }

  const winLine = calcWinner(history[step].squares[step]);

  const clickHandler = (i) => {
    const historyMove = history.slice(0, step + 1);
    const current = history[step].squares[step];
    const squares = [...current];
    if (winLine || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O';
    if (checkDraw(squares)) {
      setIsDraw(true);
    }
    setHistory([...historyMove,
    {
      squares: [...historyMove[step].squares, squares],
      pos: {
        x: i % 3,
        y: Math.floor(i / 3)
      },
      player: xIsNext ? 'X' : 'O'
    }]);
    setStep(history[step].squares.length);
    setXIsNext(!xIsNext);
    setSelected(step + 1);
  }

  const jumpTo = (step) => {
    setStep(step);
    setXIsNext(step % 2 === 0);
    setSelected(step);
    setIsDraw(false);
  }

  const moves = history.map((step, i) => {
    return (
      <button key={i} className={selected === i ? "selected" : ''} onClick={() => { jumpTo(i) }}>
        {step.pos ? `${step.player} move to (${step.pos.x}, ${step.pos.y})` : "Go to start"}
      </button>
    )
  })

  const sortHandler = () => {
    setIsAscending(!isAscending);
  }

  const playAgainHandler = () => {
    setStep(0);
    setXIsNext(true);
    setIsDraw(false);
    setSelected(0)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[step].squares[step]}
          winLine={winLine ? winLine : []}
          clickHandler={clickHandler}
        />
        {winLine && (
          <div className="game-alert">
            <p>Winner is {history[step].squares[step][winLine[0]]}</p>
            <button onClick={playAgainHandler}>Play Again</button>
          </div>
        )}
        {isDraw && (
          <div className="game-alert">
            <p>DRAW</p>
            <button onClick={playAgainHandler}>Play Again</button>
          </div>
        )}
      </div>
      <div className="game-info">
        <button onClick={sortHandler}>{isAscending ? "Descending" : "Ascending"}</button>
        <div>
          Next player {xIsNext ? 'X' : 'O'}
        </div>
        <div className="game-step">
          {isAscending ? moves : moves.reverse()}
        </div>
      </div>

    </div>
  )
}
