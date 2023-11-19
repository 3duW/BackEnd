const express = require("express");
const router = express.Router();
const contSchema = require("../models/cont");
const cont = require("../models/cont");

// Metodo post envia una nuevas entidades(Nuevos datos)
router.post("/cont", (req, res) => {
  const cont = contSchema(req.body);
  cont
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Metodo get para buscar todas las informaciones 

router.get("/cont", (req, res) => {
  cont.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Metodo get para encontrar la informacion mediante el dni
router.get("/cont/:dni", (req, res) => {
  const { dni } = req.params;
  cont.findOne({ dni })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// Metodo put para buscarlos mediante el dni y cambiar la direccion
router.put("/cont/:dni/direccion", (req, res) => {
  const { dni } = req.params;
  const { direccion } = req.body;

  cont.findOneAndUpdate({ direccion })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// Metodo put para actualizar mediante telefono

router.put("/cont/:telefono", (req, res) => {
  const { telefono } = req.params;
  cont.findOne({ telefono })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// metodo elimiar mediante dni
router.delete("/cont/:dni", (req, res) => {
  const { dni } = req.params;
  cont.findOneAndDelete({ dni })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
