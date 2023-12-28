import { Hono } from "hono";
import MISSIONS from "../../../constants/missions.json";

enum Status {
  SUCCESS = "success",
  FAILED = "failed",
}

const missions = new Hono();

missions.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ status: Status.FAILED, message: err.message }, 500);
});

missions.get("/", async (c) => {
  return c.json({ status: Status.SUCCESS, missions: MISSIONS });
});

export default missions;
