import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { insertNoteSchema, notebooks, notes } from "../db/schema";
import { and, eq } from "drizzle-orm";

import { isAuth } from "../middlewares/is-auth";
import { db } from "../db/drizzle";

const app = new Hono();

app.post(
  "/",
  zValidator(
    "json",
    insertNoteSchema.pick({
      title: true,
      content: true,
      notebookId: true,
    })
  ),
  isAuth,
  async (c) => {
    const values = c.req.valid("json");
    const auth = c.var.auth;

    const notebook = await db.query.notebooks.findFirst({
      where: and(
        eq(notebooks.userId, auth.id),
        eq(notebooks.id, Number(values.notebookId))
      ),
    });

    if (!notebook) {
      return c.json({ error: "Notebook not found" }, 404);
    }

    await db.insert(notes).values({
      title: values.title,
      content: values.content,
      notebookId: Number(values.notebookId),
    });

    return c.json({ message: "Note created" });
  }
);

app.get(
  ":notebookId/:id",
  zValidator(
    "param",
    z.object({
      notebookId: z.string(),
      id: z.string(),
    })
  ),
  isAuth,
  async (c) => {
    const { id, notebookId } = c.req.valid("param");
    const auth = c.var.auth;

    console.log({ id, notebookId, userId: auth.id });

    const notebook = await db.query.notebooks.findFirst({
      where: and(
        eq(notebooks.userId, auth.id),
        eq(notebooks.id, Number(notebookId))
      ),
    });

    if (!notebook) {
      return c.json({ error: "Notebook not found" }, 404);
    }

    const data = await db.query.notes.findFirst({
      where: and(
        eq(notes.id, Number(id)),
        eq(notes.notebookId, Number(notebookId))
      ),
    });

    if (!data) {
      return c.json({ error: "Note not found" }, 404);
    }

    return c.json({ data });
  }
);

app.get(
  "/:notebookId",
  zValidator(
    "param",
    z.object({
      notebookId: z.string(),
    })
  ),
  isAuth,
  async (c) => {
    const { notebookId } = c.req.valid("param");
    const auth = c.var.auth;

    const notebook = await db.query.notebooks.findFirst({
      where: and(
        eq(notebooks.userId, auth.id),
        eq(notebooks.id, Number(notebookId))
      ),
    });

    if (!notebook) {
      return c.json({ error: "Notebook not found" }, 404);
    }

    const data = await db.query.notes.findMany({
      where: eq(notes.notebookId, Number(notebookId)),
    });

    if (!data) {
      return c.json({ error: "Notes not found" }, 404);
    }

    return c.json({ data });
  }
);

app.delete(
  ":id",
  zValidator(
    "param",
    z.object({
      id: z.string(),
    })
  ),
  isAuth,
  async (c) => {
    const { id } = c.req.valid("param");
    const auth = c.var.auth;

    const data = await db.query.notes.findFirst({
      where: eq(notes.id, Number(id)),
    });

    if (!data) {
      return c.json({ error: "Note not found" }, 404);
    }

    const notebook = await db.query.notebooks.findFirst({
      where: and(
        eq(notebooks.userId, auth.id),
        eq(notebooks.id, data.notebookId)
      ),
    });

    if (notebook?.userId !== auth.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await db.delete(notes).where(eq(notes.id, Number(id)));

    return c.json({ message: "Note deleted" });
  }
);

export default app;
