const express = require("express");
const router = express.Router();
const hisSchema = require("../models/his");

// Create Facturación_Pagos
router.post("/his", (req, res) => {
  const his = hisSchema(req.body);
  his
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
