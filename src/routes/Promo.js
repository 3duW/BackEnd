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
 *         numero_de_promocion:
 *           type: string
 *           description: Número de promoción
 *         nombre_promo:
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
 *         - numero_de_promocion
 *         - nombre_promo
 *         - descripcion
 *         - fecha_inicio
 *         - fecha_fin
 *       example:
 *         numero_de_promocion: "p-0001"
 *         nombre_promo: "Promoción de verano"
 *         descripcion: "Descuento del 20% en todos los productos"
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
 *                 $ref: "#/components/schemas/Promociones"
 */
router.get("/promo", (req, res) => {
  PromoSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/promo/numero/{numero_de_promocion}:
 *   get:
 *     summary: Obtener promociones por número de promoción
 *     tags:
 *       - Promociones
 *     parameters:
 *       - in: path
 *         name: numero_de_promocion
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de la promoción a buscar
 *     responses:
 *       200:
 *         description: Devuelve la promoción correspondiente al número proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Promociones"
 */
router.get("/promo/numero/:numero_de_promocion", (req, res) => {
  const { numero_de_promocion } = req.params;
  PromoSchema.find({ numero_de_promocion })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

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
 *             $ref: "#/components/schemas/Promociones"
 *     responses:
 *       201:
 *         description: Nueva promoción creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Promociones"
 */
router.post("/promo", (req, res) => {
  const { numero_de_promocion, nombre_promocion, descripcion, fecha_inicio, fecha_fin } = req.body;
  const PromoSchema = new PromoSchema({ numero_de_promocion, nombre_promocion, descripcion, fecha_inicio, fecha_fin });
  PromoSchema
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ message: error }));
});

/**
 * @swagger
 * /api/promo/numero/{numero_de_promocion}:
 *   put:
 *     summary: Actualizar promoción por número de promoción
 *     tags:
 *       - Promociones
 *     parameters:
 *       - in: path
 *         name: numero_de_promocion
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de la promoción a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Promociones"
 *     responses:
 *       200:
 *         description: Promoción actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Promociones"
 */
router.put("/promo/numero/:numero_de_promocion", (req, res) => {
  const { numero_de_promocion } = req.params;
  const { nombre_promo, descripcion, fecha_inicio, fecha_fin } = req.body;
  PromoSchema.findOneAndUpdate(
    { numero_de_promocion },
    { nombre_promo, descripcion, fecha_inicio, fecha_fin },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/promo/numero/{numero_de_promocion}:
 *   delete:
 *     summary: Eliminar promoción por número de promoción
 *     tags:
 *       - Promociones
 *     parameters:
 *       - in: path
 *         name: numero_de_promocion
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de la promoción a eliminar
 *     responses:
 *       200:
 *         description: Promoción eliminada correctamente
 *       404:
 *         description: La promoción no fue encontrada
 */
router.delete("/promo/numero/:numero_de_promocion", (req, res) => {
  const { numero_de_promocion } = req.params;
  PromoSchema.findOneAndDelete({ numero_de_promocion })
    .then((data) => res.json(data))
    .catch((error) => res.status(404).json({ message: error }));
});

module.exports = router;