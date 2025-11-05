import express from "express";
import cors from "cors";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_PATH = join(__dirname, "products.json");

const readProducts = () => {
  const raw = readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
};

const writeProducts = (products) => {
  writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
};

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/products", (req, res) => {
  const products = readProducts();
  const category = req.query.category;
  const q = req.query.q?.toString().toLowerCase();

  let filtered = products;
  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }
  if (q) {
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q),
    );
  }

  res.json(filtered);
});

app.get("/api/products/:id", (req, res) => {
  const products = readProducts();
  const product = products.find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

app.post("/api/products", (req, res) => {
  const products = readProducts();
  const product = { ...req.body, id: randomUUID(), rating: 5, reviews: [] };
  products.unshift(product);
  writeProducts(products);
  res.status(201).json(product);
});

app.put("/api/products/:id", (req, res) => {
  const products = readProducts();
  const index = products.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products[index] = { ...products[index], ...req.body };
  writeProducts(products);
  res.json(products[index]);
});

app.delete("/api/products/:id", (req, res) => {
  const products = readProducts();
  const filtered = products.filter((item) => item.id !== req.params.id);
  writeProducts(filtered);
  res.status(204).send();
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`NeoCart Express API listening on port ${port}`);
});
