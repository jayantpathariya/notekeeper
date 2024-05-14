import { Hono } from "hono";
import { logger } from "hono/logger";

import auth from "./routes/auth";
import notebooks from "./routes/notebooks";
import notes from "./routes/notes";

const app = new Hono().basePath("/api");

app.use(logger());

app.route("/auth", auth).route("/notebooks", notebooks).route("/notes", notes);

export default app;
