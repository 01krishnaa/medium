import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


const app = new Hono().basePath("/api/v1");



app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/user/signup", (c) => {
  return c.text("signup");
});

app.post("/user/signin", (c) => {
  return c.text("signin");
});

app.post("/blog", (c) => {
  return c.text("blog");
});

app.put("/blog", (c) => {
  return c.text("blog");
});

app.get("/blog/:id", (c) => {
  const { id } = c.req.param();
  console.log(id);
  return c.text("get blog");
});

app.get("/blog/bulk", (c) => {
  return c.text("blog");
});

export default app;
