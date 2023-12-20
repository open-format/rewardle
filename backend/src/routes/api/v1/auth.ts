import { Hono } from "hono";
import dotenv from "dotenv";

dotenv.config();
const auth = new Hono();

// JWT secret from environment variable
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined!");
}
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const ethers = require("ethers");
const crypto = require("crypto");

// NodeCache for storing challenges
import NodeCache from "node-cache";

// Cache issued Challenges. Create a new cache instance with a default TTL (time-to-live) of 10 minutes
const challengesCache = new NodeCache({
  stdTTL: parseInt(process.env.AUTH_CACHE_TTL || "600", 10),
});
const storeChallenge = (publicAddress: any, challenge: any) => {
  return challengesCache.set(publicAddress, challenge);
};

// Retrieve a challenge
const getChallenge = (publicAddress: any) => {
  return challengesCache.get(publicAddress);
};

// Remove a challenge
const removeChallenge = (publicAddress: any) => {
  return challengesCache.del(publicAddress);
};

// Cache invalid (logged out) refresh tokens. Create a new cache instance with a default TTL (time-to-live) of 7 Days
const usedRefreshTokensCache = new NodeCache({
  stdTTL: 7 * 24 * 60 * 60,
});
const storeUsedRefreshToken = (token: any) => {
  return usedRefreshTokensCache.set(token, true);
};

// Retrieve a usedRefreshToken
const getUsedRefreshToken = (token: any) => {
  return challengesCache.get(token);
};

// Generate a Challenge which is stored against the ETH address for X seconds
// Randomise it and store it server-side associated with the public address.
auth.post("/challenge", async (req, res) => {
  const { publicAddress } = req.body;
  // Store this against the public address. Make it truly random (Generate a salt / nonce )
  const crypto = require("crypto");
  const randomValue = crypto.randomBytes(32).toString("hex");
  const nonce = `${publicAddress}.${Date.now()}.${crypto
    .randomBytes(4)
    .toString("hex")}`;

  const combined = `${randomValue}.${nonce}`;
  const challenge = crypto.createHash("sha256").update(combined).digest("hex");

  // Store the challenge in the Node cache
  storeChallenge(publicAddress, challenge);

  return res.send({ challenge });
});

auth.post("/verify", async (req, res) => {
  const { signature, publicAddress, userMessage } = req.body;

  if (!signature || !publicAddress || !userMessage) {
    return res.status(400).send({
      error: "Request should have signature and publicAddress",
    });
  }

  // Get the challenge from the cache store
  const challenge = getChallenge(publicAddress);
  if (typeof challenge !== "string") {
    console.log("retreiving challenge failed");
    return res.status(401).send({ error: "Signature verification failed" });
  }
  // Remove challenge from cache as it's single use
  removeChallenge(publicAddress);

  try {
    // Recover the signer from the signature
    // Prepend the userMessage. This is the human readable text as provided.
    const signer = ethers.utils.verifyMessage(
      userMessage + challenge,
      signature
    );

    if (signer.toLowerCase() === publicAddress.toLowerCase()) {
      // Generate JWT with nonce and publicAddress
      const nonce = `${Date.now()}.${crypto.randomBytes(4).toString("hex")}`;

      const accessToken = jwt.sign(
        { publicAddress, nonce, type: "access" },
        JWT_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_LIFETIME, // Single-use
        }
      );

      const refreshToken = jwt.sign(
        { publicAddress, nonce, type: "refresh" },
        JWT_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_LIFETIME, // valid for a week for refreshing without message signing
        }
      );

      //@TODO Temporarily Store the refreshToken in a the database, along with the user's publicAddress and other meta info
      // Validation, Token rotation, Auditing, Revocation
      return res.send({ accessToken, refreshToken });
    } else {
      console.log("signing failed");
      return res.status(401).send({ error: "Signature verification failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Error processing the request" });
  }
});

auth.post("/refresh_token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).send("Refresh token required");
  }

  if (getUsedRefreshToken(refreshToken)) {
    return res.status(401).send("Invalid token");
  }
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    if (decoded.type !== "refresh") {
      return res.status(401).send("Invalid token type");
    }

    // Generate JWT with nonce and publicAddress
    const nonce = `${Date.now()}.${crypto.randomBytes(4).toString("hex")}`;

    const newAccessToken = jwt.sign(
      { publicAddress: decoded.publicAddress, nonce, type: "access" },
      JWT_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFETIME, // single-use
      }
    );

    return res.send({ accessToken: newAccessToken });
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid refresh token");
  }
});

auth.post("/logout", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).send("Refresh token required");
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    if (decoded.type !== "refresh") {
      return res.status(401).send("Invalid token type");
    }

    // Invalidate the refreshToken
    storeUsedRefreshToken(refreshToken);
    // @TODO If refresh token is stored in a database, delete it.

    return res.status(200).send("Logged out successfully");
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid refresh token");
  }
});

export default router;
