import { Hono } from "hono";
import rewards from "./routes/api/v1/rewards";

const app = new Hono().basePath("/api/v1");

app.get("/ping", (c) => c.text("👋"));
app.route("/rewards", rewards);

console.log("hello");

export default {
  port: 8080,
  fetch: app.fetch,
};
