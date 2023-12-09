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
 *         Correo:
 *           type: string
 *           description: Correo electrónico del registro
 *         contraseña:
 *           type: string
 *           description: Contraseña del registro
 *       required:
 *         - Correo
 *         - password
 */
// Ingresa login 
/**
 * @swagger
 * /api/logins:
 *   post:
 *     summary: Ingresar a login
 *     tags:
 *       - logins
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/logins'
 *     responses:
 *       '200':
 *         description: Ingreso correctamente
 *       '500':
 *         description: Error al entrar el login
 */
router.post("/logins", (req, res) => {
  const logi = loginSchema(req.body);
  registro.save()
    .then((data) => res.json({ mensaje: "Se ingresa con éxito" }))
    .catch((error) => res.status(500).json({ mensaje: error }));
});

module.exports = router;