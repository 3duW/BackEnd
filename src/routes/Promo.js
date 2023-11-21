const express = require("express");
const router = express.Router();
const PromoSchema = require("../models/Promociones");

/**
 * @swagger
 * components:
 *   schemas:
 *     Promocion:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la promoción
 *         descripcion:
 *           type: string
 *           description: Descripción de la promoción
 *         fecha_inicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la promoción
 *         fecha_fin:
 *           type: string
 *           format: date
 *           description: Fecha de fin de la promoción
 *       required:
 *         - nombre
 *         - descripcion
 *         - fecha_inicio
 *         - fecha_fin
 *       example:
 *         nombre: Promoción de verano
 *         descripcion: Descuento del 20% en todos los productos
 *         fecha_inicio: "2023-11-01"
 *         fecha_fin: "2023-11-30"
 */

// Obtener todas las promociones
/**
 * @swagger
 * /api/promo:
 *   get:
 *     summary: Obtener todas las promociones
 *     tags:
 *       - Promociones
 *     responses:
 *       200:
 *         description: Devuelve todas las promociones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Promocion"
 */
router.get("/promo", (req, res) => {
  PromoSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener promociones por nombre
/**
 * @swagger
 * /api/promo/nombre/{nombre}:
 *   get:
 *     summary: Obtener promociones por nombre
 *     tags:
 *       - Promociones
 *     parameters:
 *       - in: path
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la promoción a buscar
 *     responses:
 *       200:
 *         description: Devuelve la promoción correspondiente al nombre proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Promocion"
 */
router.get("/promo/nombre/:nombre", (req, res) => {
  const { nombre } = req.params;
  PromoSchema.find({ nombre })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Crear nueva promoción
/**
 * @swagger
 * /api/promo:
 *   post:
 *     summary: Crear nueva promoción
 *     tags:
 *       - Promociones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Promocion"
 *     responses:
 *       200:
 *         description: Nueva promoción creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Promocion"
 */
router.post("/promo", (req, res) => {
  const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
  const nuevaPromocion = new PromoSchema({ nombre, descripcion, fecha_inicio, fecha_fin });
  nuevaPromocion
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar promoción por nombre
/**
 * @swagger
 * /api/promo/nombre/{nombre}:
 *   put:
 *     summary: Actualizar promoción por nombre
 *     tags:
 *       - Promociones
 *     parameters:
 *       - in: path
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la promoción a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Promocion"
 *     responses:
 *       200:
 *         description: Promoción actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Promocion"
 */
router.put("/promo/nombre/:nombre", (req, res) => {
  const { nombre } = req.params;
  const { descripcion, fecha_inicio, fecha_fin } = req.body;
  PromoSchema.findOneAndUpdate({ nombre }, { descripcion, fecha_inicio, fecha_fin }, { new: true })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar promoción por nombre
/**
 * @swagger
 * /api/promo/nombre/{nombre}:
 *   delete:
 *     summary: Eliminar promoción por nombre
 *     tags:
 *       - Promociones
 *     parameters:
 *       - in: path
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la promoción a eliminar
 *     responses:
 *       200:
 *         description: Promoción eliminada correctamente
 *       404:
 *         description: La promoción no fue encontrada
 */
router.delete("/promo/nombre/:nombre", (req, res) => {
  const { nombre } = req.params;
  PromoSchema.findOneAndDelete({ nombre })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;