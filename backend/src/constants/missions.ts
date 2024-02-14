export default [
  {
    id: "New Kid on the Block",
    description: "Login to Rewardle for the first time",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 50,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 50,
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/New%20Kid%20On%20the%20Block.png",
    requirements: [
      {
        actionId: "create_profile",
        description: "Login to Rewardle for the first time",
        count: 1,
      },
    ],
  },
  {
    id: "Identity Established",
    description: "Add your name to your profile",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 50,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 150,
      },
    ],
    badgeUrl: "",
    requirements: [
      {
        actionId: "add_name",
        description: "Add your name to your profile",
        count: 1,
      },
    ],
  },
  {
    id: "10 Wins",
    description: "Win the game a total of 10 times",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 1500,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 200,
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/10%20wins.png",
    requirements: [
      {
        actionId: "win",
        description: "Win the game",
        count: 10,
      },
    ],
  },
  {
    id: "25 Wins",
    description: "Win the game a total of 25 times",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 4000,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 500,
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/25%20wins.png",
    requirements: [
      {
        actionId: "win",
        description: "Win the game",
        count: 25,
      },
    ],
  },
  {
    id: "Half-Century Hero",
    description: "Win the game a total of 50 times",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 10000,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 1000,
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/50%20wins.png",
    requirements: [
      {
        actionId: "win",
        description: "Win the game",
        count: 50,
      },
    ],
  },
  {
    id: "First Time Lucky...",
    description: "Win the game on your first guess once",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 5000,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 2000,
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/First%20time%20lucky.png",
    requirements: [
      {
        actionId: "first_guess",
        description: "Win the game on your first guess",
        count: 1,
      },
    ],
  },
  {
    id: "No Freaking Way",
    description: "Win the game on your first guess 10 times",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 100000,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 20000,
      },
    ],
    badgeUrl: "",
    requirements: [
      {
        actionId: "first_guess",
        description: "Win the game on your first guess",
        count: 10,
      },
    ],
  },
  {
    id: "Animal Lover",
    description: "Guess 3 animal words",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 300,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 200,
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/Animal%20Lover.png",
    requirements: [
      {
        actionId: "guess_an_animal",
        description: "Type and enter an animal during a play",
        count: 3,
      },
    ],
  },
  {
    id: "Do You Own a Zoo?",
    description: "Guess 10 animal words",
    tokens: [
      {
        address: process.env.XP_TOKEN_ID,
        amount: 1500,
      },
      {
        address: process.env.REWARD_TOKEN_ID,
        amount: 1000,
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/Do%20you%20own%20a%20zoo.png",
    requirements: [
      {
        actionId: "guess_an_animal",
        description: "Type and enter an animal during a play",
        count: 10,
      },
    ],
  },
];
