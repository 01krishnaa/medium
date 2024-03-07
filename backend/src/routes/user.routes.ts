import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    return c.json({ user, msg: "User signed up" });
  } catch (error) {
    return c.json({
      msg: "User can't be created",
      error,
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      },
    });

    if (!user) return c.text("User does not exist");

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token, msg: "User signedup" });
  } catch (error) {
    return c.json({
      msg: "User signin failed",
      error,
    });
  }
});
