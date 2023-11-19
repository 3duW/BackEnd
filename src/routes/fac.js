const express = require("express");
const router = express.Router();
const facSchema = require("../models/fac"); 
const fac = require("../models/fac");

// Método post para enviar una nueva factura
router.post("/fac", (req, res) => {
  const fac = facSchema(req.body); 
  fac
  .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// Método get para obtener todas las facturas
router.get("/fac", (req, res) => {
  fac.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//Metodo get para encontrar la informacion mediante factura
router.get("/fac:num_factura", (req, res) => {
  const { num_factura } = req.params;
  fac.findOne({ num_factura })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//Metodo put para buscarlo mediante num_facturacion y  cambiarl el monto y metodo_pago
router.get("/fac:num_factura", (req, res) => {
  const { num_factura } = req.params;
  fac.findOne({ num_factura })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
