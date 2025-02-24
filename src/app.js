import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
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

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
