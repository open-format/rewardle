# OPENFORMAT Get Started Template!

## Getting Started

### Prerequisites

- We're using Bun as the JavaScript runtime for its awesome performance - [Bun](https://bun.sh/)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/open-format/get-started.git
```

2. Navigate to the project directory:

```bash
cd get-started
```

3. Install dependencies:

```bash
bun install
```

4. Execute development commands:

```bash
bun dev
```

5. Open your browser to view the applications:
   - Backend is running at [http://localhost:8000](http://localhost:8000)
   - React app is available at [http://localhost:3000](http://localhost:3000)

## Database

For the database, we recommend using [Supabase](https://supabase.com) and setting up a Postgres database there. With Supabase, we manage authentication and provide the option to sign up using an email address and a magic link.

The database schema includes a `profiles` table, where user profile data such as nickname and email address are stored. The `profiles`.`auth_user_id` column references the internal Supabase `users` table, where authentication data is kept. Additionally, there is a `wallets` table for storing users' Web3 wallet addresses and a wallet private key, which is required for the magic link signup method. In this scenario, we store and manage a Web3 wallet for the user, and the private key is necessary to authorize transactions.

### Entity-Relationship Diagram

![Entity-Relationship Diagram](database-schema-erd.png)

### Database Schema SQL

```sql
-- Create the enum type
CREATE TYPE user_type_enum AS ENUM ('web3', 'magic_link');

-- Create Profiles Table
CREATE TABLE "profiles" (
  "id" SERIAL PRIMARY KEY,
  "auth_user_id" UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  "nickname" VARCHAR(255),
  "email_address" VARCHAR(255) UNIQUE,
  "user_type" user_type_enum NOT NULL DEFAULT 'web3'
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Indexes for Profiles Table
CREATE UNIQUE INDEX "profiles_nickname_key" ON "profiles" ("nickname");
CREATE INDEX "idx_nickname" ON "profiles" ("nickname");
CREATE INDEX "idx_email_address" ON "profiles" ("email_address");

-- Create Wallets Table
CREATE TABLE "wallets" (
  "eth_address" VARCHAR(42) PRIMARY KEY,
  "profile_id" INT UNIQUE NOT NULL,
  "private_key" VARCHAR(64),
  FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id")
);

ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Indexes for Wallets Table
CREATE INDEX "idx_wallets_profile_id" ON "wallets" ("profile_id");

-- Function to update email_address in profiles on update of auth.users email
CREATE FUNCTION public.update_user_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET email_address = NEW.email
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

-- Trigger to call update_user_email function on email update
CREATE TRIGGER on_auth_user_email_updated
AFTER UPDATE OF email ON auth.users
FOR EACH ROW
WHEN (OLD.email IS DISTINCT FROM NEW.email)
EXECUTE PROCEDURE public.update_user_email();
```

### Supabase setup

Supabase offer a good [free price plan](https://supabase.com/pricing) that includes unlimited API requests, social OAuth providers, and sufficient database storage to get you started. Here are the steps to set up your database there:

1. Create an account with [Supabase](https://supabase.com).

2. Create a new project from the [Dashboard](https://supabase.com/dashboard). Use a strong database password and keep it safe!

3. Once the project has been created, on the next page, take note of the `anon` and `service_role` keys in the API settings, as well as the project URL and JWT secret. These will be used in your application to interact with Supabase services and should be defined in your backend `.env` file. Please keep these credentials secure and never commit them to version control.

4. Go to the 'SQL Editor' linked in the left navigation. Copy and paste the schema SQL from above and execute it against your new project database.

Here's a README outline for your developers on how to use the Token System. This guide will explain the structure and usage of `actions.json`, `missions.json`, and the `tokenSystem` class.

---

## Token System Usage Guide

### Overview

The Token System is designed to calculate and trigger rewards based on user actions and completed missions. It utilises two main configuration files: `actions.json` and `missions.json`, and a core class `TokenSystem`.

### `actions.json` - Action Configurations

This file sets up the actions that users can perform to earn rewards.

| Key           | Type   | Description                                          |
| ------------- | ------ | ---------------------------------------------------- |
| `id`          | String | Unique identifier for the action.                    |
| `amount`      | Number | The reward amount associated with the action.        |
| `description` | String | A brief description of the action.                   |
| `address`     | String | Ethereum token address related to the action reward. |

#### Structure Example:

```json
[
  {
    "id": "test_action",
    "amount": 10,
    "description": "trigger_test_action",
    "address": "0x373b1bfaac988e4b6b5b73e65778f3b1c4a8da6a"
  }
]
```

### `missions.json` - Mission Configurations

This file defines missions that users can complete for additional rewards.

| Key            | Type   | Description                                                                         |
| -------------- | ------ | ----------------------------------------------------------------------------------- |
| `id`           | String | Unique identifier for the mission.                                                  |
| `description`  | String | Detailed description of the mission.                                                |
| `tokens`       | Array  | List of tokens (with addresses and amounts) associated with completing the mission. |
| `requirements` | Array  | List of requirements (actions and counts) needed to complete the mission.           |

#### `tokens` Array Structure

| Key       | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| `address` | String | Ethereum token address related to the mission reward. |
| `amount`  | Number | Amount of the token to be rewarded.                   |

#### `requirements` Array Structure

| Key        | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `actionId` | String | ID of the action required for the mission.        |
| `count`    | Number | Number of times the action needs to be completed. |

#### Structure Example:

```json
[
  {
    "id": "Test Mission",
    "description": "Complete two test actions to complete the Test Mission",
    "tokens": [
      {
        "address": "0x77c4eac06807538e2eeaedb0d2d2e9d05e421385",
        "amount": 5
      },
      {
        "address": "0x373b1bfaac988e4b6b5b73e65778f3b1c4a8da6a",
        "amount": 5
      }
    ],
    "requirements": [
      {
        "actionId": "test_action",
        "count": 3
      }
    ]
  }
]
```

## `tokenSystem` - Main Logic

The `TokenSystem` class is responsible for integrating the actions and missions with the reward logic.

### Core Functions:

- `getUser(address: string)`: Retrieves a user object with relevant information based on the given address.
- `handleCompletedAction(address: string, actionId: string)`: Handles the logic when a user completes an action.
- `calculateUserXP(completedActions: string[])`: Calculates the total XP of a user based on completed actions.
- `calculateCompletedMissions(completedActions: string[])`: Determines which missions have been completed by the user.
- `getActionById(id: string)`: Fetches action configuration by ID.
- `getMissionById(id: string)`: Fetches mission configuration by ID.

### Example Usage:

```typescript
import TokenSystem from "./path/to/TokenSystem";
import { OpenFormatSDK } from "@openformat/sdk";

const sdk = new OpenFormatSDK({
  network: Chains.polygonMumbai,
  starId: process.env.APPLICATION_ID as string,
  signer: process.env.PRIVATE_KEY,
});

const tokenSystem = new TokenSystem(sdk);

// Example: Get user info
const userInfo = await tokenSystem.getUser("0xUserAddress...");

// Example: Handle completed action
const updatedUser = await tokenSystem.handleCompletedAction(
  "0xUserAddress...",
  "actionId"
);
```
