export default [
  {
    id: "Guess in One",
    description: "Guess the word with one go",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 100,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 5,
      },
    ],
    badgeUrl: "https://i.postimg.cc/3wcsFwRt/guess-in-one-badge.png",
    requirements: [
      {
        actionId: "one_guess",
        description: "Guess in a single go!",
        count: 1,
      },
    ],
  },
  {
    id: "Naughty Naughty",
    description: "Log three naughty words",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 100,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 5,
      },
    ],
    badgeUrl: "https://i.postimg.cc/BQ5GfsYv/naughty-word-badge.png",
    requirements: [
      {
        actionId: "naughty_word",
        description: "Complete the naughty_word twice!",
        count: 2,
      },
    ],
  },
  {
    id: "20 Day Streak",
    description: "Play 20 days in a row",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 100,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 5,
      },
    ],
    badgeUrl: "https://i.postimg.cc/cJCq33sK/20-day-streak-badge.png",
    requirements: [
      {
        actionId: "streak_20",
        description: "Add to the streak",
        count: 1,
      },
    ],
  },
  {
    id: "10 Day Streak",
    description: "Play 10 days in a row",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 100,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 5,
      },
    ],
    badgeUrl: "https://i.postimg.cc/0jD1Qq9c/10-day-streak-badge.png",
    requirements: [
      {
        actionId: "streak_10",
        description: "Add to the streak",
        count: 1,
      },
    ],
  },
];
