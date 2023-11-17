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

//Metodo get para encontrar la informacion mediante el id

// Metodo put para actualizar al usuario
// metodo elimiar 
 


module.exports = router;
