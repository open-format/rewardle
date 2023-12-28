import { Hono } from "hono";
import { cors } from "hono/cors";
import rewards from "./routes/api/v1/rewards";

const app = new Hono().basePath("/api/v1");

app.use("*", cors({ origin: ["http://localhost:3000"] }));

app.get("/ping", (c) => c.text("👋"));
app.route("/rewards", rewards);

export default {
  port: 8080,
  fetch: app.fetch,
};
