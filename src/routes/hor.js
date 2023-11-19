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
// Método get para obtener todos los historiales
router.get("/hor", (req, res) => { 
  horSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// Método get para encontrarlo mediante dia_semana
router.get("/hor/:dia_semana", (req, res) => {
  const { dia_semana } = req.params;
  horSchema.findOne({ dia_semana })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// Metodo put para buscarlos mediante el dni y cambiar la direccion y el telofono
router.put("/hor/:dia_semana/empleado", (req, res) => {
  const { dia_semana } = req.params;
  const { empleado } = req.body;

  horSchema.findOneAndUpdate({ dia_semana }, { empleado })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
 

module.exports = router;