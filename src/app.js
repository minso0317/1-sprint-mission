import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Products API
app.get("/products", async (req, res) => {
  const {
    offset = 0,
    limit = 10,
    order = "newest",
    name,
    description,
  } = req.query;
  let orderBy;
  switch (order) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
    default:
      orderBy = { createdAt: "desc" };
  }

  // const products = await prisma.products.findMany({
  //   orderBy,
  //   where: {
  //     name: name ? { contains: name, mode: "insensitive" } : {},
  //     description: description
  //       ? { contains: description, mode: "insensitive" }
  //       : {},
  //   },
  //   skip: parseInt(offset),
  //   take: parseInt(limit),
  // });

  let where = {};

  if (name) {
    where.name = { contains: name, mode: "insensitive" };
  }

  if (description) {
    where.description = { contains: description, mode: "insensitive" };
  }

  const products = await prisma.product.findMany({
    orderBy,
    where,
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.status(200).send(products);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUniqueOrThrow({
    where: { id },
  });
  res.status(200).send(product);
});

app.post("/products", async (req, res) => {
  const product = await prisma.product.create({
    data: req.body,
  });
  res.status(201).send(product);
});

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: req.body,
  });
  res.status(201).send(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: { id },
  });
  res.status(204).send("Success delete");
});

// Articles API
app.get("/articles", async (req, res) => {
  const {
    offset = 0,
    limit = 10,
    order = "newest",
    title,
    content,
  } = req.query;
  let orderBy;
  switch (order) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
    default:
      orderBy = { createdAt: "desc" };
  }

  // const articles = await prisma.article.findMany({
  //   orderBy,
  //   where: {
  //     title: title ? { contains: title, mode: "insensitive" } : {},
  //     content: content
  //       ? { contains: content, mode: "insensitive" }
  //       : {},
  //   },
  //   skip: parseInt(offset),
  //   take: parseInt(limit),
  // });

  let where = {};

  if (title) {
    where.title = { contains: title, mode: "insensitive" };
  }

  if (content) {
    where.content = { contains: content, mode: "insensitive" };
  }

  const articles = await prisma.article.findMany({
    orderBy,
    where,
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.status(200).send(articles);
});

app.get("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.findUniqueOrThrow({
    where: { id },
  });
  res.status(200).send(article);
});

app.post("/articles", async (req, res) => {
  const article = await prisma.article.create({
    data: req.body,
  });
  res.status(201).send(article);
});

app.patch("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });
  res.status(201).send(article);
});

app.delete("/articles/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id },
  });
  res.status(204).send("Success delete");
});

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
