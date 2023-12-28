import { PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const prisma = new PrismaClient();

const auth = new Hono();
const SECRET = "it-is-very-secret";

enum Status {
  SUCCESS = "success",
  FAILED = "failed",
}

auth.post("/challenge", async (c) => {
  const { eth_address } = await c.req.json();
  const challenge = `Sign this message: ${Date.now()}`;

  await prisma.challenge.create({
    data: { eth_address, challenge },
  });

  return c.json({ challenge });
});

auth.post("/verify", async (c) => {
  const ACCESS_EXPIRES_IN = Math.floor(Date.now() / 1000) + 60; // Current time in seconds + 28 days
  const REFRESH_EXPIRES_IN = Math.floor(Date.now() / 1000) + 60 * 60; // Current time in seconds + 28 days
  const { eth_address, signature } = await c.req.json();

  const result = await prisma.challenge.findFirstOrThrow({
    where: { eth_address },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log({ result });

  const originalChallenge = result ? result.challenge : null;

  if (!originalChallenge) {
    return c.json(
      { status: "error", message: "Challenge not found" },
      404
    );
  }

  try {
    const signerAddress = ethers.utils.verifyMessage(
      originalChallenge,
      signature
    );

    if (signerAddress.toLowerCase() === eth_address.toLowerCase()) {
      await prisma.challenge.delete({
        where: { id: result.id },
      });

      const accessToken = await sign(
        { sub: eth_address, exp: ACCESS_EXPIRES_IN },
        SECRET
      );
      const refreshToken = await sign(
        { sub: eth_address, exp: REFRESH_EXPIRES_IN },
        SECRET
      );

      const user = await prisma.user.upsert({
        where: { eth_address }, // Unique identifier for the record
        update: {},
        create: {
          eth_address,
        }, // Fields for the new record if it doesn't exist
      });

      if (user) {
        await prisma.token.create({
          data: {
            userId: user.id,
            accessToken,
            refreshToken,
          },
        });

        return c.json({
          status: Status.SUCCESS,
          accessToken,
          refreshToken,
        });
      } else {
        return c.json(
          { status: Status.FAILED, message: "User not found" },
          404
        );
      }
    } else {
      // Signature is invalid
      return c.json(
        { status: Status.FAILED, message: "Invalid signature" },
        401
      );
    }
  } catch (e) {
    return c.json(
      { status: Status.FAILED, message: "Verification failed" },
      500
    );
  }
});

auth.post("/refresh-token", async (c) => {
  const ACCESS_EXPIRES_IN = Math.floor(Date.now() / 1000) + 60; // Current time in seconds + 28 days

  const { refreshToken } = await c.req.json();

  const tokenRecord = await prisma.token.findFirst({
    where: { refreshToken },
    include: { user: true }, // Include the user relation here
  });

  if (!tokenRecord) {
    return c.json(
      { status: Status.FAILED, message: "Invalid token" },
      401
    );
  }

  const newAccessToken = await sign(
    {
      sub: tokenRecord.user.eth_address,
      exp: ACCESS_EXPIRES_IN,
    },
    SECRET
  );

  await prisma.token.update({
    where: { id: tokenRecord.id },
    data: { accessToken: newAccessToken },
  });

  return c.json({
    status: Status.SUCCESS,
    refreshToken,
    accessToken: newAccessToken,
  });
});

export default auth;
