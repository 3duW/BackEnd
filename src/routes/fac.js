const express = require("express");
const router = express.Router();
const facSchema = require("../models/fac");

// Create Facturación_Pagos
router.post("/fac", (req, res) => {
  const fac = facSchema(req.body);
  fac
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
