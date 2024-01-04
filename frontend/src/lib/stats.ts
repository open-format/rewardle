import { MAX_CHALLENGES } from '../constants/settings'
import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage
} from './localStorage'
import { triggerReward } from './reward'

// In stats array elements 0-5 are successes in 1-6 trys

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  count: number
) => {
  // Count is number of incorrect guesses before end.
  const stats = { ...gameStats }

  stats.totalGames += 1

  if (stats.totalGames === 3) {
    alert('TRIGGER REWARD: You have completes 3 games')
  }

  if (count >= MAX_CHALLENGES) {
    // A fail situation
    stats.currentStreak = 0
    stats.gamesFailed += 1
  } else {
    stats.winDistribution[count] += 1
    stats.currentStreak += 1

    // let xpReward = (7 - count) * 10

    // alert(
    //   `TRIGGER REWARD: Received ${xpReward}XP for completing in ${
    //     count + 1
    //   } guesses`
    // )

    if(count == 0){
      alert("QUEST COMPLETE: Guess in One");
      triggerReward("one_guess");
    }

    if (stats.bestStreak < stats.currentStreak) {
      // alert(`TRIGGER REWARD: New Best Streak!`)
      stats.bestStreak = stats.currentStreak
    }
  }

  stats.successRate = getSuccessRate(stats)

  saveStatsToLocalStorage(stats)
  return stats
}

const defaultStats: GameStats = {
  winDistribution: Array.from(new Array(MAX_CHALLENGES), () => 0),
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  successRate: 0,
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}

const getSuccessRate = (gameStats: GameStats) => {
  const { totalGames, gamesFailed } = gameStats

  return Math.round(
    (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
  )
}
