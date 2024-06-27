const express = require("express");
const app = express();


app.use(express.json());

let products = [];

app.get("/", (req, res) => {
  res.send("Bienvenido a la gestión de productos");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

app.post("/products", (req, res) => {
  const { name, quantity, price } = req.body;

  if (!name || !quantity || !price) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  const newProduct = { id, name, quantity, price };

  products.push(newProduct);
  res.status(201).json({ message: "Producto creado con éxito", product: newProduct });
});

app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, quantity, price } = req.body;

  let updated = false;
  products = products.map((product) => {
    if (product.id === id) {
      product.name = name || product.name;
      product.quantity = quantity || product.quantity;
      product.price = price || product.price;
      updated = true;
    }
    return product;
  });

  if (updated) {
    res.json({ message: "Producto actualizado correctamente" });
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = products.length;
  products = products.filter((product) => product.id !== id);

  if (products.length < initialLength) {
    res.json({ message: "Producto eliminado correctamente" });
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`servidor en puerto ${PORT}`));

