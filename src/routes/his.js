const express = require("express");
const router = express.Router();
const hisSchema = require("../models/his");

//Metodo post envia una nuevas entidades(Nuevos datos)
router.post("/his", (req, res) => {
  const his = hisSchema(req.body);
  his
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//Metodo get para obtener todos los inventarios 
router.get("/his", (req, res) => {
  hisSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Metodo get para encontrar la informacion mediante el id
router.get("/his/:id", (req, res) => {
  const { id } = req.params;
  hisSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Metodo put para actualizar al usuario

router.put("/his/:id", (req, res) => {
  const { id } = req.params;
  const { cliente, fecha_pedido, servicio, estado_pedido  } = req.body;
  hisSchema
    .updateOne({ _id: id}, { $set: { cliente, fecha_pedido, servicio, estado_pedido } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// metodo elimiar 
 
router.delete("/his/:id", (req, res) => {
  const { id } = req.params;
  hisSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


module.exports = router;
