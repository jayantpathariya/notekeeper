import { z } from "zod";
import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { db } from "../db/drizzle";
import { isAuth } from "../middlewares/is-auth";
import { insertNotebookSchema, notebooks } from "../db/schema";

const app = new Hono();

app.post(
  "/",
  zValidator(
    "json",
    insertNotebookSchema.pick({
      title: true,
    })
  ),
  isAuth,
  async (c) => {
    const values = c.req.valid("json");
    const auth = c.var.auth;

    const notebook = await db
      .insert(notebooks)
      .values({
        title: values.title,
        userId: auth.id,
      })
      .returning();

    return c.json(notebook);
  }
);

app.get("/", isAuth, async (c) => {
  const auth = c.var.auth;

  const data = await db.query.notebooks.findMany({
    where: eq(notebooks.userId, auth.id),
    with: {
      notes: true,
    },
  });

  return c.json({ data });
});

app.get(
  "/:id",
  zValidator(
    "param",
    z.object({
      id: z.string(),
    })
  ),
  isAuth,
  async (c) => {
    const id = c.req.valid("param").id;
    const auth = c.var.auth;

    const data = await db.query.notebooks.findFirst({
      where: and(eq(notebooks.id, Number(id)), eq(notebooks.userId, auth.id)),
      with: {
        notes: true,
      },
    });

    if (!data) {
      return c.json({ error: "Notebook not found" }, 404);
    }

    return c.json({ data });
  }
);

app.post(
  "/:id",
  zValidator(
    "param",
    z.object({
      id: z.string(),
    })
  ),
  zValidator(
    "json",
    insertNotebookSchema.pick({
      title: true,
    })
  ),
  isAuth,
  async (c) => {
    const { id } = c.req.valid("param");
    const { title } = c.req.valid("json");
    const auth = c.var.auth;

    const notebook = await db.query.notebooks.findFirst({
      where: and(eq(notebooks.id, Number(id)), eq(notebooks.userId, auth.id)),
    });

    if (!notebook) {
      return c.json({ error: "Notebook not found" }, 404);
    }

    await db
      .update(notebooks)
      .set({ title })
      .where(and(eq(notebooks.id, Number(id)), eq(notebooks.userId, auth.id)));

    return c.json({ message: "Notebook updated" });
  }
);

app.delete(
  "/:id",
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

    const notebook = await db.query.notebooks.findFirst({
      where: and(eq(notebooks.id, Number(id)), eq(notebooks.userId, auth.id)),
    });

    if (!notebook) {
      return c.json({ error: "Notebook not found" }, 404);
    }

    if (notebook.userId !== auth.id) {
      return c.json({ error: "Not authorized" }, 401);
    }

    await db
      .delete(notebooks)
      .where(and(eq(notebooks.id, Number(id)), eq(notebooks.userId, auth.id)));

    return c.json({ message: "Notebook deleted" });
  }
);

export default app;
