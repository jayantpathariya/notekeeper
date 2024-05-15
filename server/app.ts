import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import auth from "./routes/auth";
import notebooks from "./routes/notebooks";
import notes from "./routes/notes";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  serveStatic({
    root: "./public",
  })
);

app
  .basePath("/api")
  .route("/auth", auth)
  .route("/notebooks", notebooks)
  .route("/notes", notes);

export default app;
