import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use(async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];

  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  c.set("userId", payload.id);
  await next();
});

blogRouter.post("/qwerty", async (c) => {
  return c.text("tfgyhnjkml");
});

blogRouter.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("payload");

  const body = await c.req.json();
  const userId = c.get("userId");

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json({ id: blog.id });
});

blogRouter.put("/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  const blog = await prisma.post.update({
    where: { authorId: userId, id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ id: blog.id });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany();

  return c.json(blogs);
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  const blog = await prisma.post.findFirst({
    where: { id },
  });

  return c.json(blog);
});
