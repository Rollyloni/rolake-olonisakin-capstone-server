const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

router.use((req, res, next) => {
  console.log("orders route incoming request");
  next();
});

//Functions
const readOrdersFile = () => {
  const ordersContent = fs.readFileSync("./data/orders.json");
  return JSON.parse(ordersContent);
};
const writeOrdersFile = (data) => {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/orders.json", stringifiedData);
};

//Routes

router.get("/", (req, res) => {
  const response = readOrdersFile();

  res.status(200).json(response);
});

module.exports = router;
