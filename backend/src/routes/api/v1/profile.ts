import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import validator from "validator";
import { getOnChainProfile } from "../../../utils/profile";

enum Status {
  SUCCESS = "success",
  FAIL = "failed",
}

const profile = new Hono();
const prisma = new PrismaClient();

profile.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ status: "Failed", message: err.message }, 500);
});

profile.get("/me", async (c) => {
  const { sub } = c.get("jwtPayload");

  const user = await prisma.user.findFirstOrThrow({
    where: { eth_address: sub },
  });

  const USER = user.eth_address;
  const NAME = user.nickname;
  const EMAIL = user.email_address;

  const onChainProfile = await getOnChainProfile(USER);

  return c.json({
    status: Status.SUCCESS,
    data: {
      nickname: NAME,
      email: EMAIL,
      eth_address: USER,
      ...onChainProfile,
    },
  });
});

profile.put("/me", async (c) => {
  const { sub } = c.get("jwtPayload");
  const { nickname, email_address } = await c.req.json();

  if (email_address && !validator.isEmail(email_address)) {
    return c.json(
      {
        status: Status.FAIL,
        data: { message: "invalid email address" },
      },
      400
    );
  }

  const user = await prisma.user.update({
    where: { eth_address: sub },
    data: {
      nickname,
      email_address,
    },
  });

  return c.json({ status: Status.SUCCESS, data: user });
});

export default profile;
