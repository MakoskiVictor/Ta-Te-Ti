/* eslint-disable no-unused-vars */
import { Square } from './Square.jsx'
import { Restart } from './Restart.jsx'

export function Winner ({ winner, resetGame }) {
  if (winner === null) return null
  const winnerText = winner === false ? 'Empate' : 'Ganó: '

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>
        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <Restart resetGame={resetGame} />
        </footer>
      </div>
    </section>
  )
}
