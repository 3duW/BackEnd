const express = require("express");
const router = express.Router();
const hisSchema = require("../models/his");

// Método post para enviar un nuevo Historial del cliente
router.post("/his", (req, res) => {
  const his = hisSchema(req.body); 
  his.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Método get para obtener todos los historiales
router.get("/his", (req, res) => { 
  hisSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Método get para encontrarlo mediante num_servicio 
router.get("/his/:num_servicio", (req, res) => {
  const { num_servicio } = req.params;
  hisSchema.findOne({ num_servicio })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
