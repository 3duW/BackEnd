const express = require("express");
const router = express.Router();
const registerSchema = require("../models/register");

/**
 * @swagger
 * components:
 *   schemas:
 *     registros:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombres completos del registro
 *         telefono:
 *           type: string
 *           description: Número de teléfono del registro
 *         dni:
 *           type: string
 *           description: DNI del registro
 *         correo:
 *           type: string
 *           description: Correo electrónico del registro
 *         password:
 *           type: string
 *           description: Contraseña del registro
 *       required:
 *         - nombre
 *         - telefono
 *         - dni
 *         - Correo
 *         - password
 */
// Mostrar todos los registros
/**
 * @swagger
 * /api/registros:
 *   get:
 *     summary: Obtener todos los registros
 *     tags:
 *       - registros
 *     responses:
 *       '200':
 *         description: Lista de todos los registros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/registros'
 */
router.get("/registros", (req, res) => {
  registerSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Mostrar un registro por DNI
/**
 * @swagger
 * /api/registros/{dni}:
 *   get:
 *     summary: Obtener un registro por DNI
 *     tags:
 *       - registros
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
 *               $ref: '#/components/schemas/registros'
 *       '404':
 *         description: Registro no encontrado
 */

router.get("/registros/:dni", (req, res) => {
  const { dni } = req.params;
  registerSchema.findOne({ dni })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar un registro por DNI
/**
 * @swagger
 * /api/registros/{dni}:
 *   put:
 *     summary: Actualizar un registro por DNI
 *     tags:
 *       - registros
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
 *             $ref: '#/components/schemas/registros'
 *     responses:
 *       '200':
 *         description: Registro actualizado correctamente
 *       '404':
 *         description: Registro no encontrado o no se pudo actualizar
 */

router.put("/registros/:dni", (req, res) => {
  const { dni } = req.params;
  const { nombre, telefono, Correo, password } = req.body;

  registerSchema.findOneAndUpdate(
    { dni },
    { nombre, telefono, Correo, password },
    { new: true }
  )
    .then((data) => res.json({ mensaje: "Se actualizaron con éxito los datos" }))
    .catch((error) => res.json({ mensaje: error }));
});

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
/**
 * @swagger
 * /api/registros/login:
 *   post:
 *     summary: Iniciar sesión verificando correo y contraseña
 *     tags:
 *       - registros
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del registro
 *               password:
 *                 type: string
 *                 description: Contraseña del registro
 *             required:
 *               - correo
 *               - password
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *       '401':
 *         description: Credenciales incorrectas
 *       '500':
 *         description: Error al intentar iniciar sesión
 */
router.post("/registros/login", async (req, res) => {
  const { correo, password } = req.body;

  // Verificar si existe un usuario con el mismo correo electrónico y contraseña
  const usuario = await registerSchema.findOne({ correo, password });

  if (!usuario) {
    return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }

  // Si las credenciales son correctas, devuelve un estado 200
  return res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
});
/**
 * @swagger
 * /api/registros/{password}:
 *   delete:
 *     summary: Eliminar un suministro por contraseña
 *     tags:
 *       - registros
 *     parameters:
 *       - in: path
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Suministro eliminado correctamente
 *       404:
 *         description: El suministro no fue encontrado
 */
router.delete("/registros/:password", (req, res) => {
  const { password } = req.params;

  registerSchema.findOneAndDelete({ password })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});



module.exports = router;