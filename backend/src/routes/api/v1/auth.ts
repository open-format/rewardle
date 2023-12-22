import { PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const prisma = new PrismaClient();

const auth = new Hono();

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

      await prisma.user.upsert({
        where: { eth_address }, // Unique identifier for the record
        update: {},
        create: {
          eth_address,
        }, // Fields for the new record if it doesn't exist
      });

      const secret = "it-is-very-secret";
      const expirationTime = Math.floor(Date.now() / 1000) + 60; // Current time in seconds + 28 days

      const token = await sign(
        { sub: eth_address, exp: expirationTime },
        secret
      );

      return c.json({
        status: Status.SUCCESS,
        token: token,
      });
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

export default auth;
