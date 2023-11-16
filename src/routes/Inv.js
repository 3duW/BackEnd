const express = require("express");
const router = express.Router();
const invSchema = require("../models/Inv");

// Metodo post envia una nuevas entidades(Nuevos datos)
router.post("/inv", (req, res) => {
  const inv = invSchema(req.body);
  inv
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// Metodo get para obtener todos los inventarios 
router.get("/inv", (req, res) => {
  invSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Metodo get para encontrar la informacion mediante el id
router.get("/inv/:id", (req, res) => {
  const { id } = req.params;
  invSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Metodo put para actualizar al usuario

router.put("/inv/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, stock_actual, unidad_medida , precio_unitario} = req.body;
  invSchema
    .updateOne({ _id: id}, { $set: { nombre,stock_actual, unidad_medida, precio_unitario } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// metodo elimiar 
 
router.delete("/inv/:id", (req, res) => {
  const { id } = req.params;
  invSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});



module.exports = router;