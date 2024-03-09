import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@kronymous/medium-common2";

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

  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ msg: "inputs not correct" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ user,token, msg: "User signed up" });
  } catch (error) {
    return c.json({
      msg: "User signup failed",
      error,
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ msg: "inputs not correct" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
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
