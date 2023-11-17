const express = require("express");
const router = express.Router();
const Fac = require("../models/fac"); 

// Método post para enviar una nueva factura
router.post("/fac", (req, res) => {
  const nuevaFactura = new Fac(req.body); 
  nuevaFactura
  .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// Método get para obtener todas las facturas
router.get("/fac", (req, res) => {
  Fac.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Método para eliminar una factura por su número de factura
router.delete("/fac/:num_factura", (req, res) => {
  const { num_factura } = req.params;

  Fac.findOneAndDelete({ num_factura })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
