const express = require("express");
const router = express.Router();
const PlaniSchema = require("../models/Plani");

/**
 * @swagger
 * components:
 *   schemas:
 *     Planificacion:
 *       type: object
 *       properties:
 *         cliente:
 *           type: string
 *           description: Nombre del cliente
 *         dni:
 *           type: number
 *           description: DNI del cliente
 *         fecha_recogida:
 *           type: string
 *           format: date
 *           description: Fecha de recogida
 *         hora_recogida:
 *           type: string
 *           description: Hora de recogida
 *         fecha_entrega:
 *           type: string
 *           format: date
 *           description: Fecha de entrega
 *         hora_entrega:
 *           type: string
 *           description: Hora de entrega
 *       required:
 *         - cliente
 *         - dni
 *         - fecha_recogida
 *         - hora_recogida
 *         - fecha_entrega
 *         - hora_entrega
 *       example:
 *         cliente: "Nombre del Cliente"
 *         dni: 1234567890
 *         fecha_recogida: "2023-11-20"
 *         hora_recogida: "10:00 AM"
 *         fecha_entrega: "2023-11-25"
 *         hora_entrega: "12:00 PM"
 */

// Recuperar documentos por DNI
/**
 * @swagger
 * /api/plani:
 *   get:
 *     summary: Recuperar todos los documentos de planificación
 *     tags:
 *       - Planificacion
 *     responses:
 *       200:
 *         description: Devuelve todos los documentos de planificación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Planificacion"
 */
router.get("/plani", (req, res) => {
  PlaniSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// Ruta PUT para actualizar una planificación por DNI
/**
 * @swagger
 * /api/plani/{dni}:
 *   put:
 *     summary: Actualizar una planificación existente
 *     tags:
 *       - Planificacion
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de dni a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *               fecha_recogida:
 *                 type: string
 *                 format: date
 *               hora_recogida:
 *                 type: string
 *                 format: time
 *               fecha_entrega:
 *                 type: string
 *                 format: date
 *               hora_entrega:
 *                 type: string
 *                 format: time
 *     responses:
 *       200:
 *         description: Planificación actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Planificacion"
 *       404:
 *         description: La planificación no fue encontrada o no se pudo actualizar
 */
router.put("/plani/:dni", (req, res) => {
  const { dni } = req.params;
  const { cliente, fecha_recogida, hora_recogida, fecha_entrega, hora_entrega } = req.body;
  PlaniSchema.findOneAndUpdate(
    { dni },
    { cliente, fecha_recogida, hora_recogida, fecha_entrega, hora_entrega },
    { new: true }
  )
    .then((data) => res.json({ mensaje: "Cambios realizados correctamente en la planificación" }))
    .catch((error) => res.status(404).json({ message: "La planificación no fue encontrada o no se pudo actualizar" }));
});
/**
 * @swagger
 * /api/plani/dni/{dni}:
 *   get:
 *     summary: Recuperar documentos por DNI
 *     tags:
 *       - Planificacion
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: number
 *         required: true
 *         description: DNI del cliente para buscar documentos
 *     responses:
 *       200:
 *         description: Devuelve documentos correspondientes al DNI proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Planificacion"
 *       404:
 *         description: No se encontraron documentos por el DNI proporcionado
 */
router.get("/plani/dni/:dni", (req, res) => {
  const { dni } = req.params;
  PlaniSchema.find({ dni })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
/**
 * @swagger
 * /api/plani:
 *   post:
 *     summary: Crear nueva planificación
 *     tags:
 *       - Planificacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Planificacion"
 *     responses:
 *       201:
 *         description: Nueva planificación creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Planificacion"
 *       400:
 *         description: La solicitud es incorrecta o está incompleta.
 */
router.post("/plani", (req, res) => {
  const nuevaPlanificacion = new PlaniSchema(req.body);
  nuevaPlanificacion
    .save()
    .then((data) => res.status(201).json({dato:"dato agregado correctamente"}))
    .catch((error) => res.status(400).json({ message: "no se encontraron los datos " }));
});

// Ruta DELETE para eliminar una planificación por DNI
/**
 * @swagger
 * /api/plani/{dni}:
 *   delete:
 *     summary: Eliminar Planificacion por número de dni
 *     tags:
 *       - Planificacion
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: numero de dni de la Planificacion a eliminar
 *     responses:
 *       200:
 *         description: Planificacion eliminada correctamente
 *       404:
 *         description: La Planificacion no fue encontrada
 */
router.delete("/plani/:dni", (req, res) => {
  const { dni } = req.params;
  PlaniSchema.findOneAndDelete({ dni })
  .then((data) => res.json({ mensaje: "La planificación fue eliminada correctamente" }))
   .catch((error) => res.status(404).json({ message: "La planificación no fue encontrada o no se pudo eliminar" }));
});


module.exports = router;