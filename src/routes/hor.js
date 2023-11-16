const express = require("express");
const router = express.Router();
const horSchema = require("../models/hor");

// Metodo post envia una nuevas entidades(Nuevos datos)
router.post("/hor", (req, res) => {
  const hor = horSchema(req.body);
  hor
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//Metodo get para obtener todos los inventarios 

router.get("/hor", (req, res) => {
  horSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Metodo get para encontrar la informacion mediante el id
router.get("/hor/:id", (req, res) => {
  const { id } = req.params;
  horSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Metodo put para actualizar al usuario

router.put("/hor/:id", (req, res) => {
  const { id } = req.params;
  const { empleado, dia_semana, horario } = req.body;
  horSchema
    .updateOne({ _id: id}, { $set: { empleado, dia_semana, horario } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// metodo elimiar 
 
router.delete("/hor/:id", (req, res) => {
  const { id } = req.params;
  horSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;