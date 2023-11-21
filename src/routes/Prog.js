const express = require("express");
const router = express.Router();
const ProgSchema = require("../models/Programación");

/**
 * @swagger
 * components:
 *   schemas:
 *     Programación:
 *       type: object
 *       properties:
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
 *         - fecha_recogida
 *         - hora_recogida
 *         - fecha_entrega
 *         - hora_entrega
 *       example:
 *         fecha_recogida: "2023-11-20"
 *         hora_recogida: "10:00 AM"
 *         fecha_entrega: "2023-11-25"
 *         hora_entrega: "12:00 PM"
 */

// Recuperar todos los documentos
/**
 * @swagger
 * /api/prog:
 *   get:
 *     summary: Recuperar todos los documentos de programación
 *     tags:
 *       - Programación
 *     responses:
 *       200:
 *         description: Devuelve todos los documentos de programación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Programación"
 */
router.get("/prog", (req, res) => {
  ProgSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Recuperar documentos por fecha de recogida o entrega
/**
 * @swagger
 * /api/prog/fecha/{date}:
 *   get:
 *     summary: Recuperar documentos por fecha de recogida o entrega
 *     tags:
 *       - Programación
 *     parameters:
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de recogida o entrega a buscar
 *     responses:
 *       200:
 *         description: Devuelve documentos correspondientes a la fecha proporcionada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Programación"
 */
router.get("/prog/fecha/:date", (req, res) => {
  const { date } = req.params;
  ProgSchema.find({ $or: [{ fecha_recogida: date }, { fecha_entrega: date }] })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Crear nueva programación
/**
 * @swagger
 * /api/prog:
 *   post:
 *     summary: Crear nueva programación
 *     tags:
 *       - Programación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Programación"
 *     responses:
 *       200:
 *         description: Nueva programación creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Programación"
 */
router.post("/prog", (req, res) => {
  const nuevaProgramacion = new ProgSchema(req.body);
  nuevaProgramacion
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar por fecha de recogida o entrega
/**
 * @swagger
 * /api/prog/fecha/{date}:
 *   delete:
 *     summary: Eliminar documentos por fecha de recogida o entrega
 *     tags:
 *       - Programación
 *     parameters:
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de recogida o entrega de los documentos a eliminar
 *     responses:
 *       200:
 *         description: Documentos eliminados correctamente
 *       404:
 *         description: No se encontraron documentos para la fecha proporcionada
 */
router.delete("/prog/fecha/:date", (req, res) => {
  const { date } = req.params;
  ProgSchema.deleteMany({ $or: [{ fecha_recogida: date }, { fecha_entrega: date }] })
    .then(() => res.json({ message: "Documentos eliminados" }))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
