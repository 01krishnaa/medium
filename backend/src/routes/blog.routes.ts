import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@kronymous/medium-common2";

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
  console.log(typeof payload.id);
  await next();
});

blogRouter.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ msg: "inputs not correct" });
  }

  const userId = c.get("userId");

  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    return c.json({
      msg: "Can't create post",
      error,
    });
  }
});

blogRouter.put("/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ msg: "inputs not correct" });
  }

  const userId = c.get("userId");

  try {
    const blog = await prisma.post.update({
      where: { authorId: userId, id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    return c.json({
      msg: "Post can not be updated",
      error,
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        authoe: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json(blogs);
  } catch (error) {
    c.status(411);
    return c.json({
      msg: "Blogs fetch error",
      error,
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  const blog = await prisma.post.findFirst({
    where: { id },
    select: {
      title: true,
      content: true,
      id: true,
      authoe: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json(blog);
});
