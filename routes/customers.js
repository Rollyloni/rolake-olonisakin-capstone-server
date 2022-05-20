const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

router.use((req, res, next) => {
  console.log("customers route incoming request");
  next();
});

//Functions
const readOrdersFile = () => {
  const customersContent = fs.readFileSync("./data/customers.json");
  return JSON.parse(customersContent);
};
const writeCustomersFile = (data) => {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/customers.json", stringifiedData);
};

//Routes

router.get("/", (req, res) => {
  const response = readOrdersFile();

  res.status(200).json(response);
});

module.exports = router;
