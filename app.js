// console.log('hello from backend');

// const information = require("./modules/info");
// console.log(information);

const { request } = require("express");
const { response } = require("express");
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const parse = require("nodemon/lib/cli/parse");
const products = require("./data");

const index = require("./index");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = 5000;

app.get("/cia/yra/mano/routas", (request, response) => {
  response.send(products);
});

app.get("/cia/yra/mano/routas/:id", (req, res) => {
  const product = products.find((prod) => prod.id === parseInt(req.params.id));

  if (!product) {
    res.status(404).send("Product not found");
  }
  res.send(product);
});

app.post("/cia/yra/mano/routas", (req, res) => {
  const newProduct = {
    id: 5,
    title: "Watch",
  };
  products.push(newProduct);
  res.send(products);
});

app.put("/cia/yra/mano/routas/:id", (req, res) => {
  const product = products.find((prod) => prod.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).send("Product not found");
  }
  product.title = req.body.title;
  res.send(product);
});

app.delete("/cia/yra/mano/routas/:id", (req, res) => {
  const product = products.find(prod === parseInt(req.params.id));

  if (!product) {
    res.status(404).send("Product not found");
  }

  const productIndex = products.indexOf(product);
  products.splice(productIndex, 1);
  res.send(product);
});

app.listen(PORT || 8000, () => {
  console.log("Server is running on port: " + PORT);
});

console.log(products);
