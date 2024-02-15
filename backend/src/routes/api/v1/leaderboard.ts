import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { Hono } from "hono";
import { leaderboardData } from "../../../queries/leaderboard";
import { sdk } from "../../../services/SDK";
import {
  convertToTimestamps,
  generateLeaderboard,
} from "../../../utils/leaderboard";

enum Status {
  SUCCESS = "success",
  FAILED = "failed",
}

const leaderboard = new Hono();
const prisma = new PrismaClient();

leaderboard.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ status: Status.FAILED, message: err.message }, 500);
});

leaderboard.get("/", async (c) => {
  // Optional: add custom start/end UNIX timestamps as query params
  // e.g /leaderboard?start=0&end=99999999
  const { start, end } = c.req.query();

  // Calculate the start and end of the current week
  const startOfWeek = dayjs().startOf("week");
  const endOfWeek = startOfWeek.endOf("week");

  // Convert start and end dates of the week to timestamps
  const { startTimestamp, endTimestamp } = convertToTimestamps(
    startOfWeek,
    endOfWeek
  );

  const data = await sdk.subgraph.rawRequest(leaderboardData, {
    start: start ?? startTimestamp,
    end: end ?? endTimestamp,
    appId: process.env.APPLICATION_ID,
  });

  let leaderboard = generateLeaderboard(data);

  const allUsers = await prisma.user.findMany();
  const usersMap = new Map(
    allUsers.map((user) => [
      user.eth_address.toLowerCase(),
      user.nickname,
    ])
  );

  leaderboard = leaderboard.map((entry) => ({
    ...entry,
    user: usersMap.get(entry.user) || "Anonymous",
  }));

  return c.json({ status: Status.SUCCESS, data: leaderboard });
});

export default leaderboard;
