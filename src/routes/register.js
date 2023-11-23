const express = require("express");
const router = express.Router();
const registerSchema = require("../models/register");

/**
 * @swagger
 * components:
 *   schemas:
 *     Registro:
 *       type: object
 *       properties:
 *         nombres_completos:
 *           type: string
 *           description: Nombres completos del registro
 *         telefono:
 *           type: string
 *           description: Número de teléfono del registro
 *         dni:
 *           type: string
 *           description: DNI del registro
 *         Correo_Electronico:
 *           type: string
 *           description: Correo electrónico del registro
 *         contraseña:
 *           type: string
 *           description: Contraseña del registro
 *       required:
 *         - nombres_completos
 *         - telefono
 *         - dni
 *         - Correo_Electronico
 *         - contraseña
 */
// Mostrar todos los registros
/**
 * @swagger
 * /api/register:
 *   get:
 *     summary: Obtener todos los registros
 *     tags:
 *       - Registro
 *     responses:
 *       '200':
 *         description: Lista de todos los registros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Registro'
 */
router.get("/register", (req, res) => {
  registerSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Mostrar un registro por DNI
/**
 * @swagger
 * /api/register/{dni}:
 *   get:
 *     summary: Obtener un registro por DNI
 *     tags:
 *       - Registro
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         description: DNI del registro a obtener
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Datos del registro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registro'
 *       '404':
 *         description: Registro no encontrado
 */

router.get("/register/:dni", (req, res) => {
  const { dni } = req.params;
  registerSchema.findOne({ dni })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar un registro por DNI
/**
 * @swagger
 * /api/register/{dni}:
 *   put:
 *     summary: Actualizar un registro por DNI
 *     tags:
 *       - Registro
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         description: DNI del registro a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registro'
 *     responses:
 *       '200':
 *         description: Registro actualizado correctamente
 *       '404':
 *         description: Registro no encontrado o no se pudo actualizar
 */

router.put("/register/:dni", (req, res) => {
  const { dni } = req.params;
  const { nombres_completos, telefono, Correo_Electronico } = req.body;

  registerSchema.findOneAndUpdate(
    { dni },
    { nombres_completos, telefono, Correo_Electronico },
    { new: true }
  )
    .then((data) => res.json({ mensaje: "Se actualizaron con éxito los datos" }))
    .catch((error) => res.json({ mensaje: error }));
});

// Crear un nuevo registro 
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Crear un nuevo registro
 *     tags:
 *       - Registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registro'
 *     responses:
 *       '200':
 *         description: Nuevo registro creado correctamente
 *       '500':
 *         description: Error al crear el registro
 */
router.post("/register", (req, res) => {
  const registro = registerSchema(req.body);
  registro.save()
    .then((data) => res.json({ mensaje: "Se creó un nuevo registro con éxito" }))
    .catch((error) => res.status(500).json({ mensaje: error }));
});

module.exports = router;