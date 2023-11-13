const express = require("express");
const router = express.Router();
const horSchema = require("../models/hor");

// Create Facturación_Pagos
router.post("/hor", (req, res) => {
  const hor = horSchema(req.body);
  hor
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;