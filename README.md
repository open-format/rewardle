# Rewardle

<img width="1341" alt="Screenshot 2024-02-26 at 16 55 16" src="https://github.com/open-format/js/assets/7047410/399b00a1-7fe6-4212-9347-1bbf8af9e469">

Welcome to Rewardle, a Wordle clone that demonstrates how to integrate OPENFORMAT rewards mechanisms into any React application. This project utilises the [GetStarted](https://github.com/open-format/get-started) template.

- **Play**: The Wordle game you know and love, with credit to @alanrsoares for creating [Weirdle](https://github.com/alanrsoares/weirdle), the project we forked and adapted for this demo.
- **Leaderboard**: Compete against other players with a real-time, on-chain leaderboard.
- **Profile**: Add your nickname, view your total XP, $REWARDLE, and completed quests.
- **Quests**: Complete quests to earn XP, $REWARDLE, and badges.

> [!IMPORTANT]  
> This demo is exclusively connects to the Polygon Mumbai testnet. All tokens used are not real, allowing you to have as much fun as possible while ensuring safety. You can review our smart contract and SDK code on our GitHub account: https://github.com/open-format.

## Getting Started

### Prerequisites

- We're using Bun as the JavaScript runtime for its awesome performance - [Bun](https://bun.sh/)
- Node.js 18.17 or later (This is due to Next.js and Prisma relying on Node.js APIs that Bun does not yet implement - [Ref](https://bun.sh/guides/ecosystem/nextjs)). Once Bun supports these APIs this will not longer be required.

### Setup

1. Clone the repository:

```bash
git clone https://github.com/open-format/rewardle.git
```

2. Navigate to the project directory:

```bash
cd rewardle
```

3. Run setup script (Install dependencies,setups local database and generate env files):

```bash
make setup
```

4. Add environment variables to `./backend/.env`

5. Add environment variables to `./frontend/.env.local`

6. Execute development commands:

```bash
bun dev
```

7. Open your browser to view the applications:

   - Backend is running at [http://localhost:8000](http://localhost:8080)
   - React app is available at [http://localhost:3000](http://localhost:3000)
