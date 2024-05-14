import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

type Auth = {
  Variables: {
    auth: {
      id: number;
      name: string;
      email: string;
    };
  };
};

export const isAuth = createMiddleware<Auth>(async (c, next) => {
  const token = getCookie(c, "token");

  if (!token) {
    return c.json({ error: "Not authenticated" }, 401);
  }

  try {
    const payload = await verify(token, process.env.JWT_SECRET!);

    c.set("auth", payload);
    await next();
  } catch (error) {
    return c.json({ error: "Not authenticated" }, 401);
  }
});
