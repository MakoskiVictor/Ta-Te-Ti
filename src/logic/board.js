import { WINNER_COMBOS } from '../../constants'

export const checkWinner = (boardToCheck) => {
  // Revisamos las combinaciones para ver si hay un ganador
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // Si no hay winner
  return null
}

export function checkEndGame (boardToCheck) {
  const tie = !boardToCheck.includes(null)
  return tie
}
