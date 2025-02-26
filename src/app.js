import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { assert } from "superstruct";
import {
  CreateProduct,
  PatchProduct,
  CreateArticle,
  PatchArticle,
  CreateComment,
  PatchComment,
} from "./structs.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === "StructError" ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        res.sendStatus(404);
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

// Products API
app.get(
  "/products",
  asyncHandler(async (req, res) => {
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
      include: {
        comments: true,
      },
    });
    res.status(200).send(products);
  })
);

app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
      include: {
        comments: true,
      },
    });
    res.status(200).send(product);
  })
);

app.post(
  "/products",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProduct);
    req.body;
    const product = await prisma.product.create({
      data: req.body,
      include: {
        comments: true,
      },
    });
    res.status(201).send(product);
  })
);

app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchProduct);
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });
    res.status(201).send(product);
  })
);

app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.status(204).send("Success delete");
  })
);

// Articles API
app.get(
  "/articles",
  asyncHandler(async (req, res) => {
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
      include: {
        comments: true,
      },
    });
    res.status(200).send(articles);
  })
);

app.get(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
      include: {
        comments: true,
      },
    });

    res.status(200).send(article);
  })
);

app.post(
  "/articles",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateArticle);
    const article = await prisma.article.create({
      data: req.body,
    });
    res.status(201).send(article);
  })
);

app.patch(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchArticle);
    const { id } = req.params;
    const article = await prisma.article.update({
      where: { id },
      data: req.body,
    });
    res.status(201).send(article);
  })
);

app.delete(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id },
    });
    res.status(204).send("Success delete");
  })
);

// Comments API
app.get(
  "/comments",
  asyncHandler(async (req, res) => {
    const { cursor } = req.query;
    const take = 3;

    const comments = await prisma.comment.findMany({
      take: take,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
      orderBy: {
        createdAt: "asc",
      },
    });

    const nextCursor = comments.length === take ? comments[take - 1].id : null;

    res.status(200).json({ comments, nextCursor });
  })
);

app.get(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.comment.findUniqueOrThrow({
      where: { id },
    });
    res.status(200).send(comment);
  })
);

app.post(
  "/comments",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateComment);

    const comment = await prisma.comment.create({
      data: req.body,
    });
    res.status(201).send(comment);
  })
);

app.patch(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateComment);
    const { id } = req.params;

    const comment = await prisma.comment.update({
      where: { id },
      data: req.body,
    });
    res.status(201).send(comment);
  })
);

app.delete(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.comment.delete({
      where: { id },
    });
    res.status(204).send("Success delete");
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
