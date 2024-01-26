export default [
  {
    id: "test_action",
    amount: 5,
    description: "trigger_test_action",
    address: process.env.XP_TOKEN_ID,
  },
  {
    id: "winner",
    amount: 10,
    description: "You guessed the wordle",
    address: process.env.XP_TOKEN_ID,
  },
  {
    id: "one_guess",
    amount: 30,
    description: "Guess in one!",
    address: process.env.XP_TOKEN_ID,
  },
  {
    id: "naughty_word",
    amount: 50,
    description: "Get naughty word",
    address: process.env.XP_TOKEN_ID,
  },
];
