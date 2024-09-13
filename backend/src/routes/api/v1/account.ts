import { User } from "@privy-io/server-auth";
import { Hono } from "hono";

enum Status {
  SUCCESS = "success",
  FAIL = "failed",
}

const account = new Hono<{ Variables: { user: User } }>();

account.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ status: "Failed", message: err.message }, 500);
});

account.post("/fund", async (c) => {
  const user: User = c.get("user");
  const address = user?.wallet?.address;

  if (!address) {
    return c.json({
      success: Status.FAIL,
      data: "No wallet address found",
    });
  }

  if (
    !process.env.ACCOUNT_BALANCE_SERVICE_URL ||
    !process.env.ACCOUNT_BALANCE_SERVICE_AUTH_TOKEN
  ) {
    return c.json({
      success: Status.SUCCESS,
      data: "Configuration error",
    });
  }

  return await fetch(process.env.ACCOUNT_BALANCE_SERVICE_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCOUNT_BALANCE_SERVICE_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      user_address: address,
      amount: process.env.ACCOUNT_BALANCE_AMOUNT ?? "0.2",
    }),
  })
    .then((response) =>
      c.json({ success: Status.SUCCESS, data: response })
    )
    .catch((err) =>
      c.json({ success: Status.FAIL, data: err.message })
    );
});

export default account;
