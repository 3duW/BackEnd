const express = require("express");
const router = express.Router();
const loginSchema = require("../models/login");

/**
 * @swagger
 * components:
 *   schemas:
 *     registros:
 *       type: object
 *       properties:
 *         Correo_Electronico:
 *           type: string
 *           description: Correo electrónico del registro
 *         contraseña:
 *           type: string
 *           description: Contraseña del registro
 *       required:
 *         - Correo
 *         - contraseña
 */
// Crear un nuevo registro 
/**
 * @swagger
 * /api/registros:
 *   post:
 *     summary: Crear un nuevo registro
 *     tags:
 *       - registros
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/registros'
 *     responses:
 *       '200':
 *         description: Nuevo registro creado correctamente
 *       '500':
 *         description: Error al crear el registro
 */
router.post("/registros", (req, res) => {
  const registro = registerSchema(req.body);
  registro.save()
    .then((data) => res.json({ mensaje: "Se creó un nuevo registro con éxito" }))
    .catch((error) => res.status(500).json({ mensaje: error }));
});

module.exports = router;