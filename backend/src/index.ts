import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to OPENFORMAT GetStarted!"));

export default {
  port: 8000,
  fetch: app.fetch,
};
