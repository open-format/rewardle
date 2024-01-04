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
    badgeUrl: "https://i.postimg.cc/4yg90byK/avatar.png",
    requirements: [
      {
        actionId: "one_guess",
        description: "Guess in a single go!",
        count: 2,
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
    badgeUrl: "https://i.postimg.cc/4yg90byK/avatar.png",
    requirements: [
      {
        actionId: "naughty_word",
        description: "Complete the naughty_word twice!",
        count: 2,
      },
    ],
  },
];
