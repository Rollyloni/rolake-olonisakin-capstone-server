const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

router.use((req, res, next) => {
  console.log("orders route incoming request");
  next();
});

router.get("/", (req, res) => {
  console.log("order received");
});

module.exports = router;
