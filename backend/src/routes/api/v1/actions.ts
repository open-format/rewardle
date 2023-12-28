import { Hono } from "hono";
import ACTIONS from "../../../constants/actions.json";

enum Status {
  SUCCESS = "success",
  FAILED = "failed",
}

const actions = new Hono();

actions.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ status: Status.FAILED, message: err.message }, 500);
});

actions.get("/", async (c) => {
  return c.json({ status: Status.SUCCESS, missions: ACTIONS });
});

export default actions;
