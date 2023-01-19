// eslint-disable-next-line no-unused-vars
import { Square } from './Square'
import { TURNS } from '../../constants'
export function PlayerTurn ({ turn }) {
  return (
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
  )
}
