const express = require("express");
const router = express.Router();
const comSchema = require("../models/his"); // Asegúrate de tener correctamente importado el modelo

// Método post para enviar un nuevo Historial del cliente
router.post("/com", (req, res) => {
  const nuevoComentario = new Com(req.body); // Usa el modelo 'His' para crear una nueva instancia
  nuevoComentario
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Método get para obtener todos los historiales
router.get("/com", (req, res) => {
  hisSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Método para buscar el  historial por cliente/nombre
router.get("/his/:cliente", (req, res) => {
  const { cliente } = req.params;

  comSchema.find({ cliente })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

module.exports = router;
