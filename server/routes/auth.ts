import bcryptjs from "bcryptjs";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { sign, verify } from "hono/jwt";

import { db } from "../db/drizzle";
import { users } from "../db/schema";
import { isAuth } from "../middlewares/is-auth";

const app = new Hono();

app.post(
  "/register",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })
  ),
  async (c) => {
    const values = c.req.valid("json");

    const user = await db.query.users.findFirst({
      where: eq(users.email, values.email),
    });

    if (user) {
      return c.json({ error: "User already exists" }, 400);
    }

    const hashedPassword = await bcryptjs.hash(values.password, 12);

    await db.insert(users).values({
      name: values.name,
      email: values.email,
      password: hashedPassword,
    });

    return c.json({ message: "User registered successfully" }, 201);
  }
);

app.post(
  "/login",
  zValidator(
    "json",
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
  ),
  async (c) => {
    const values = c.req.valid("json");

    const user = await db.query.users.findFirst({
      where: eq(users.email, values.email),
    });

    if (!user) {
      return c.json({ error: "Invalid credentials" }, 400);
    }

    const isPasswordValid = await bcryptjs.compare(
      values.password,
      user.password
    );

    if (!isPasswordValid) {
      return c.json({ error: "Invalid credentials" }, 400);
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = await sign(payload, process.env.JWT_SECRET!);

    setCookie(c, "token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return c.json({ message: "Logged in successfully" });
  }
);

app.get("/me", isAuth, async (c) => {
  const token = getCookie(c, "token");

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const payload = await verify(token, process.env.JWT_SECRET!);

    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.id),
    });

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    return c.json(payload);
  } catch (error) {
    return c.json({ error: "Unauthorized" }, 401);
  }
});

app.post("/logout", async (c) => {
  deleteCookie(c, "token");

  return c.json({ message: "Logged out successfully" });
});

export default app;
