const express = require("express");
const router = express.Router();
const facSchema = require("../models/fac");

// Metodo post envia una nuevas entidades(Nuevos datos)
router.post("/fac", (req, res) => {
  const fac = facSchema(req.body);
  fac
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Metodo get para obtener todos los inventarios 
router.get("/fac", (req, res) => {
  facSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Metodo get para encontrar la informacion mediante el id
router.get("/fac/:id", (req, res) => {
  const { id } = req.params;
  facSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Metodo put para actualizar al usuario

router.put("/fac/:id", (req, res) => {
  const { id } = req.params;
  const { cliente, factura, monto, metodo_pago  } = req.body;
  facSchema
    .updateOne({ _id: id}, { $set: { cliente, factura, monto, metodo_pago } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// metodo elimiar 
 
router.delete("/fac/:id", (req, res) => {
  const { id } = req.params;
  facSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
