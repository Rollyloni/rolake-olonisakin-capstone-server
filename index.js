const express = require("express");
const app = express();
const cors = require("cors");
const ordersRoute = require("./routes/orders");
const customersRoute = require("./routes/customers");

// const inventoriesRoute = require("./routes/inventories");

require("dotenv").config();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// // routes here
app.use("/orders", ordersRoute);
app.use("/customers", customersRoute);

// app.use("/", inventoriesRoute);

// // routes here
// app.use("/inventories", inventoriesRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
