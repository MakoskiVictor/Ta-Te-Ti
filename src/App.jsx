/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Winner } from './components/Winner.jsx'
import { Board } from './components/Board.jsx'
import { PlayerTurn } from './components/PlayerTurn.jsx'
import { Restart } from './components/Restart.jsx'
import { TURNS } from '../constants'
import { checkWinner, checkEndGame } from './logic/board.js'

function App () {
  const [board, setBoard] = useState(() => {
    // Usamos una func para evitar renderizaciones innecesarias
    const boardFromStorage = window.localStorage.getItem('board')
    return JSON.parse(boardFromStorage) ?? Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  function resetGame () {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
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
    // Guardamos la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
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
      <Restart resetGame={resetGame} />

      <Board board={board} updateBoard={updateBoard} />

      <PlayerTurn turn={turn} />

      <Winner winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
