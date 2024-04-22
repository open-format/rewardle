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
        address: "0x2AABee409FFE5AB24eC9c90FBF3749499956dcA6",
        amount: 1,
        uri: "ipfs://QmV91BXk33HQiNPobCb2bY2YZ7KuGVmgDp8HFxuEMerzRX",
      },
    ],
    badgeUrl:
      "https://ipfs.io/ipfs/QmXLQXY9ihBYHdds3ScXmD6ZQ1R6WBJdMVbaVW1qX8TDt5",
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
        address: "0x5Fa49ed6a4A3Fe038C9079d2a7C2b6BbCf863355",
        amount: 1,
        uri: "ipfs://QmX3X9e8YK9WGyDyhZLkhexCjcDQPPZqq6Scpv73jbELp4",
      },
    ],
    badgeUrl:
      "https://ipfs.io/ipfs/QmeQBtkc1gviiAcatWecHV6GxFVwcpEe6YWuYGGN7N69dw",
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
        address: "0x9a97c6E843a41A68B1e64be29Bebf6275Ed36ae0",
        amount: 1,
        uri: "ipfs://QmUrXShFath31QPLbjXg7hAF6nSTjzxubAradqWsRNetmA",
      },
    ],
    badgeUrl:
      "https://ipfs.io/ipfs/QmPHkLw2NA9vCseZEZBytdfzuZwZfr9rzA1wSBuxGtSnhG",
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
        address: "0xA7208e23b7Bea95B0761aD59a2F88aB142f57583",
        amount: 1,
        uri: "ipfs://QmXB55VuB7P4ZvR5iYPo99JM8QQbBVHjuHf6FsXgUZ4PkR",
      },
    ],
    badgeUrl:
      "https://ipfs.io/ipfs/QmTFxVnkHpsTAmauszUGanSNKBu2ofbdQFQk3Mp7zNAj1x",
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
        address: "0x63cB9989651adEd7810E06b4EdE4d4ed541CA712",
        amount: 1,
        uri: "ipfs://QmV8Zy8tmYJpxQUFT6gJq2rem4m25vR8xLjqEyKpnPSoRq",
      },
    ],
    badgeUrl:
      "https://ipfs.io/ipfs/QmVHp63QoBY4f5gHFbpJbdpa6fukKBWWs7X1hM7xgHj1Gg",
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
        address: "0xa7Fa163c0F5431fA35f4b915013F4a928AB52569",
        amount: 1,
        uri: "ipfs://Qmbqusq6kf7GNGTSCRUxBRPd6vyyRFSiHCApKgsJChJbbB",
      },
    ],
    badgeUrl:
      "https://ipfs.io/ipfs/QmfEGVL52ZUp35SWXi7C5w3WKJAUb2jt7sHnYavbxC3vsB",
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
        address: "0x353876bb58D469740d48D34d3a7900380F2C2648",
        amount: 1,
        uri: "ipfs://QmQDa93bLvZPRZUXx1K1GbcAj8R9HCXVKF1rRdzKu23ifG",
      },
    ],
    badgeUrl:
      "https://ipfs.io/ipfs/QmNTs1pa9knqm88uXhFmaxc2ZmWbKdgEL3XbEAkXr7MndY",
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
        address: "0xD77D288e4d2886cdf91961A58b457d8026987FFE",
        amount: 1,
        uri: "ipfs://QmXW1cFnovJDRL6kzd1qPHxfmkhK3d1UFMSrugxX7ZYYBV",
      },
    ],
    badgeUrl:
      "https://ipfs.io/ipfs/QmddiWsEaHyq5Y7bW1mFrrv4aYKYG16VE9md1umBSFpvPG",
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
        address: "0xd0Ea27C430a577AEBab344D5D1f1BDbd8ede046E",
        amount: 1,
        uri: "ipfs://QmTzCC5vfSXZDmwuDSSaUMXHzfwuBcwjAh74LM5FTfdXPp",
      },
    ],
    badgeUrl:
      "https://ipfs.io/ipfs/QmVvRQS5Xv7dr5SDSg8AGzEuGMjY2X9y1UvP56WKwJcik1",
    requirements: [
      {
        actionId: "guess_an_animal",
        description: "Type and enter an animal during a play",
        count: 10,
      },
    ],
  },
];
