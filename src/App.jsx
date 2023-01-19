import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
// eslint-disable-next-line no-unused-vars
import { Winner } from './components/Winner.jsx'
// eslint-disable-next-line no-unused-vars
import { Board } from './components/Board.jsx'
// eslint-disable-next-line no-unused-vars
import { PlayerTurn } from './components/PlayerTurn.jsx'
import { TURNS } from '../constants'
import { checkWinner, checkEndGame } from './logic/board.js'

function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  function resetGame () {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // No actualizamos si ya hay algo
    if (board[index] || winner) return
    // Pintamos el simbolo indicado
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Revisamos si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <Board board={board} updateBoard={updateBoard} />

      <PlayerTurn turn={turn} />

      <Winner winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
