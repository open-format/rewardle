import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import actions from "./routes/api/v1/actions";
import auth from "./routes/api/v1/auth";
import missions from "./routes/api/v1/missions";
import profile from "./routes/api/v1/profile";
import rewards from "./routes/api/v1/rewards";

const app = new Hono().basePath("/api/v1");

app.use(
  "/profile/*",
  cors({
    origin: ["http://localhost:3000"],
  }),
  jwt({
    secret: "it-is-very-secret",
  })
);

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/ping", (c) => c.text("👋"));

app.route("/auth", auth);
app.route("/rewards", rewards);
app.route("/profile", profile);
app.route("/missions", missions);
app.route("/actions", actions);

export default {
  port: 8080,
  fetch: app.fetch,
};
