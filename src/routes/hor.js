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



//Metodo get para encontrar la informacion mediante el id

// Metodo put para actualizar al usuario

// metodo elimiar 
 

module.exports = router;