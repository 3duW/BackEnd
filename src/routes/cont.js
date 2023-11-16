const express = require("express");
const router = express.Router();
const contSchema = require("../models/cont");

// Metodo post envia una nuevas entidades(Nuevos datos)
router.post("/cont", (req, res) => {
  const cont = contSchema(req.body);
  cont
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Metodo get para obtener todos los inventarios 
router.get("/cont", (req, res) => {
  contSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Metodo get para encontrar la informacion mediante el id
router.get("/cont/:id", (req, res) => {
  const { id } = req.params;
  contSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Metodo put para actualizar al usuario

router.put("/cont/:id", (req, res) => {
  const { id } = req.params;
  const { name, gmail, telefono, direccion,mensaje  } = req.body;
  contSchema
    .updateOne({ _id: id}, { $set: { name, gmail, telefono, direccion,mensaje }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// metodo elimiar 
 
router.delete("/cont/:id", (req, res) => {
  const { id } = req.params;
  contSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
