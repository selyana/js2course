const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/catalog", (req, res) => {
  fs.readFile(path.join(__dirname, "catalog.json"), "utf-8", (err, data) => {
    res.send(JSON.parse(data));
  });
});

app.get("/api/cart", (req, res) => {
  fs.readFile(path.join(__dirname, "cart.json"), "utf-8", (err, data) => {
    res.send(JSON.parse(data));
  });
});

app.post("/api/cart/:goodId", (req, res) => {
  const goodId = parseInt(req.params.goodId);

  if (isNaN(goodId)) {
    return res.status(400).send({ error: "goodID must be a number" });
  }

  // 1. check if goodId is already in cart.
  // 2. if in cart increase counter
  // 3. else add to cart.

  fs.readFile("cart.json", "utf-8", (err, data) => {
    // data == "[]" []
    const goods = JSON.parse(data);

    let inCart = false;
    for (const good of goods) {
      if (good.id === goodId) {
        inCart = true;
        good.quantity++;
        break;
      }
    }

    if (!inCart) {
      goods.push({ id: goodId });
    }
    //
    // [
    //   {
    //      id: number,
    //      quantity: number,
    //   },
    // ]
    //
  });

  // fs.readFile("cart.json", "utf8", (err, data) => {
  //   // const id = ??;
  //   // const goodId = req.params.goodId;
  //   // console.log(goodId);
  //   // // const cart = JSON.parse(data);
  //   res.status(200).send();
  // });
  // res.send();
});

app.delete("/api/cart/:goodId", (req, res) => {
  // TODO:
  res.status(204).send();
});

app.listen(3000);
