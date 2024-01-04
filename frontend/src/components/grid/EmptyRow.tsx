import { solution } from '../../lib/words'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(solution.value.length))

  return (
    <div className="mb-1 flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
