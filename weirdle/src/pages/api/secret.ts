import { randomInt } from "crypto";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import data from "db/db.json";
import { withSession } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

dayjs.extend(dayOfYear);

export type SecretApiResponse = {
  secret: string;
};

export type Request = NextApiRequest & { session: Session };

export async function handler(
  req: Request,
  res: NextApiResponse<SecretApiResponse>
) {
  const { length, items } = data;
  const { random } = req.query;

  const dayOfYear = dayjs().dayOfYear();
  let secret = items[dayOfYear % length];

  if (random) {
    secret = items[randomInt(length)];
  }

  req.session.set("secret", secret);
  await req.session.save();

  res.status(200).json({ secret });
}

export default withSession(handler);
