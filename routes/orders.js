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

//Functions customers
const readCustomersFile = () => {
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

router.post("/", (req, res) => {
  const newOrder = {
    id: uniqid(),
    no: req.body.no,
    style: req.body.style,
    amount: req.body.amount,
    status: req.body.status,
    delivery: req.body.delivery,
    payment: req.body.payment,
    client: req.body.client,
    phone: req.body.phone,
  };
  const ordersContent = readOrdersFile();
  ordersContent.push(newOrder);

  writeOrdersFile(ordersContent);

  const customer = readCustomersFile();
  const foundCustomer = customer.find((client) => {
    return client.phone === req.body.phone;
  });
  foundCustomer.orders.push(newOrder);

  writeCustomersFile(customer);
  res.status(201).json(newOrder);
});

module.exports = router;
