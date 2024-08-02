import { PrismaClient } from "@prisma/client";
import { User } from "@privy-io/server-auth";
import { Hono } from "hono";
import { getOnChainProfile } from "../../../utils/profile";

enum Status {
  SUCCESS = "success",
  FAIL = "failed",
}

const profile = new Hono<{ Variables: { user: User } }>();
const prisma = new PrismaClient();

profile.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ status: "Failed", message: err.message }, 500);
});

profile.get("/me", async (c) => {
  const user: User = c.get("user");
  const address = user?.wallet?.address;
  let onChainProfile;
  let dbUser: { nickname: string | null } = { nickname: null };

  if (address) {
    // get the user's nickname from the database
    dbUser = await prisma.user.findFirstOrThrow({
      where: { eth_address: address },
      select: { nickname: true },
    });

    onChainProfile = await getOnChainProfile(address);
  }

  return c.json({
    status: Status.SUCCESS,
    data: {
      nickname: dbUser?.nickname ?? null,
      email: user.email?.address,
      eth_address: address,
      ...onChainProfile,
    },
  });
});

profile.put("/me", async (c) => {
  const user: User = c.get("user");
  const { nickname } = await c.req.json();

  if (user?.wallet?.address) {
    const updatedUser = await prisma.user.update({
      where: { eth_address: user.wallet.address },
      data: {
        nickname,
      },
    });

    return c.json({ status: Status.SUCCESS, data: updatedUser });
  } else {
    return c.json({
      status: Status.FAIL,
      data: "No wallet address found",
    });
  }
});

export default profile;
