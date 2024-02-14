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
      {
        address: "0xa74d59189c20a45a048c03fe3ef0f3bd4a868d20",
        amount: 1,
        uri: "ipfs://QmV91BXk33HQiNPobCb2bY2YZ7KuGVmgDp8HFxuEMerzRX",
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/New%20Kid%20On%20the%20Block.png",
    requirements: [
      {
        actionId: "login",
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
      {
        address: "0x69584508dbab5e1f98acb7d441eb23d7f0ae7fd0",
        amount: 1,
        uri: "ipfs://QmX3X9e8YK9WGyDyhZLkhexCjcDQPPZqq6Scpv73jbELp4",
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/2.png",
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
      {
        address: "0x8925d2aff7cabd4f287ab25f914fa0013c8a91a1",
        amount: 1,
        uri: "ipfs://QmUrXShFath31QPLbjXg7hAF6nSTjzxubAradqWsRNetmA",
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
      {
        address: "0x508071cc6a73450b5697d09ff6b8988af07c2bb1",
        amount: 1,
        uri: "ipfs://QmXB55VuB7P4ZvR5iYPo99JM8QQbBVHjuHf6FsXgUZ4PkR",
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
      {
        address: "0xfc83ae5816c0a9c4c31d0895622b702961aa1ee4",
        amount: 1,
        uri: "ipfs://QmV8Zy8tmYJpxQUFT6gJq2rem4m25vR8xLjqEyKpnPSoRq",
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
      {
        address: "0xde30e342623541a09c8dca4714ba8f89adff87d7",
        amount: 1,
        uri: "ipfs://Qmbqusq6kf7GNGTSCRUxBRPd6vyyRFSiHCApKgsJChJbbB",
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
      {
        address: "0xc3e31c8d94022732462e1758f466c8f1673c25b6",
        amount: 1,
        uri: "ipfs://QmQDa93bLvZPRZUXx1K1GbcAj8R9HCXVKF1rRdzKu23ifG",
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/7.png",
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
      {
        address: "0xfa3dcf6d1467069cbd00cb0b56af999be89e1323",
        amount: 1,
        uri: "ipfs://QmXW1cFnovJDRL6kzd1qPHxfmkhK3d1UFMSrugxX7ZYYBV",
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
      {
        address: "0xc97f0f513820359741bd628752681d75f321a96b",
        amount: 1,
        uri: "ipfs://QmTzCC5vfSXZDmwuDSSaUMXHzfwuBcwjAh74LM5FTfdXPp",
      },
    ],
    badgeUrl:
      "https://duqswponteoedwsylzwn.supabase.co/storage/v1/object/public/badges/10.png",
    requirements: [
      {
        actionId: "guess_an_animal",
        description: "Type and enter an animal during a play",
        count: 10,
      },
    ],
  },
];
