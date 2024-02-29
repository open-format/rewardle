# Backend

This is the backend application. It currently handles:

- On-chain rewards
- XP Leaderboard generation
- Basic Web3 JWT authentication
- Profile creation and updates

## API Endpoints

### Endpoints

#### Authentication

| Endpoint            | Method | Description                            |
| ------------------- | ------ | -------------------------------------- |
| /auth/verify        | POST   | Verifies user authentication.          |
| /auth/challenge     | POST   | Initiates an authentication challenge. |
| /auth/refresh-token | POST   | Refreshes the authentication token.    |

#### Profile

| Endpoint    | Method | Description                   |
| ----------- | ------ | ----------------------------- |
| /profile/me | PUT    | Updates the user's profile.   |
| /profile/me | GET    | Retrieves the user's profile. |

#### Token System

| Endpoint                      | Method | Description                                  |
| ----------------------------- | ------ | -------------------------------------------- |
| /rewards/token-system/trigger | POST   | Triggers the token system for a user action. |
| /actions                      | GET    | Retrieves available actions.                 |
| /missions                     | GET    | Retrieves available missions.                |

#### Leaderboard

| Endpoint     | Method | Description                |
| ------------ | ------ | -------------------------- |
| /leaderboard | GET    | Gets the leaderboard data. |

#### Utility

| Endpoint | Method | Description        |
| -------- | ------ | ------------------ |
| /ping    | GET    | Health check ping. |

## Database

We've implemented a basic sqlite database using Prisma, which by default, is stored locally as a file (dev.db) in the [prisma](./backend/prisma/) folder. Run `npx prisma studio` to view the database in the browser.

### Tables

#### User

| Field         | Type     | Description                                      |
| ------------- | -------- | ------------------------------------------------ |
| id            | Int      | Unique identifier for the user, autoincremented. |
| eth_address   | String   | Unique Ethereum address of the user.             |
| nickname      | String?  | Optional nickname of the user.                   |
| email_address | String?  | Optional, unique email address of the user.      |
| createdAt     | DateTime | Timestamp of when the user was created.          |
| tokens        | Token[]  | List of tokens associated with the user.         |

#### Challenge

| Field       | Type     | Description                                           |
| ----------- | -------- | ----------------------------------------------------- |
| id          | Int      | Unique identifier for the challenge, autoincremented. |
| eth_address | String   | Ethereum address related to the challenge.            |
| challenge   | String   | Description or details of the challenge.              |
| createdAt   | DateTime | Timestamp of when the challenge was created.          |

#### Token

| Field         | Type     | Description                                       |
| ------------- | -------- | ------------------------------------------------- |
| id            | Int      | Unique identifier for the token, autoincremented. |
| userId        | Int      | Identifier of the user associated with the token. |
| access_token  | String   | Unique access token.                              |
| refresh_token | String   | Unique refresh token.                             |
| createdAt     | DateTime | Timestamp of when the token was created.          |
| updatedAt     | DateTime | Timestamp of when the token was last updated.     |
| user          | User     | User object the token is associated with.         |

## Docker

###Local
`make build`
`make up`
`make down`
`make logs`

###Staging
`make staging build`
`make staging up`
`make staging down`
`make staging logs`

#Production
`make production build`
`make production up`
`make production down`
`make production logs`
