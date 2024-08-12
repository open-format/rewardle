import { PrismaClient } from "@prisma/client";
import { PrivyClient, User } from "@privy-io/server-auth";
import { Context, Next } from "hono";

const privy = new PrivyClient(
  process.env.PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
);

const prisma = new PrismaClient();

export const privyAuthMiddleware = async (c: Context, next: Next) => {
  const authToken = c.req
    .header("Authorization")
    ?.replace("Bearer ", "");

  if (!authToken) {
    return c.text("unauthorized - no auth token", 401);
  }

  try {
    const verifiedClaims = await privy.verifyAuthToken(authToken);

    if (verifiedClaims.userId) {
      const user = await privy.getUser(verifiedClaims.userId);

      const wallet = user?.wallet?.address;

      if (wallet) {
        await prisma.user.upsert({
          where: { eth_address: wallet },
          update: {},
          create: {
            eth_address: wallet,
          },
        });
      }

      c.set("user", user as User);
    } else {
      return c.text("unauthorized - invalid auth token", 401);
    }
  } catch (error: any) {
    console.error(error.message);
    return c.text("unauthorized", 401);
  }

  await next();
};
