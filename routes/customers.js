const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

router.use((req, res, next) => {
  console.log("customers route incoming request");
  next();
});

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
  const response = readCustomersFile();

  res.status(200).json(response);
});

router.get("/:id", (req, res) => {
  const response = readCustomersFile();

  const foundCustomer = response.find((customer) => {
    return customer.id === req.params.id;
  });

  res.status(200).json(foundCustomer);
});

router.post("/", (req, res) => {
  const newCustomer = {
    id: uniqid(),
    name: req.body.name,
    address: req.body.address,
    location: req.body.location,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
    clientSince: req.body.clientSince,
  };
  const customersContent = readCustomersFile();
  customersContent.push(newCustomer);

  writeCustomersFile(customersContent);

  res.status(201).json(newCustomer);
});

module.exports = router;
