const express = require("express");
const router = express.Router();
const invSchema = require("../models/Inv");

// Create Facturación_Pagos
router.post("/inv", (req, res) => {
  const inv = invSchema(req.body);
  inv
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;