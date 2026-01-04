const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

//Customer Creation
router.post("/", async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json(customer);
});

//Get All Customers Detail
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

//Get Specific Customer Details By Id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json(customer);
});

//Update Customer Details
router.put("/:id", async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

//Delete Customer By Id
router.delete("/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer deleted" });
});

module.exports = router;