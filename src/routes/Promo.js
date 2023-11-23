const express = require("express");
const router = express.Router();
const PromoSchema = require("../models/Prom");

/**
 * @swagger
 * components:
 *   schemas:
 *     promociones:
 *       type: object
 *       properties:
 *         nombre_promocion:
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
 *         - nombre_promocion
 *         - descripcion
 *         - fecha_inicio
 *         - fecha_fin
 *       example:
 *         numero_de_promocion: "p-0001"
 *         nombre_promocion: "Promoción de verano"
 *         descripcion: "Descuento del 20% en todos los productos"
 *         fecha_inicio: "2023-11-01"
 *         fecha_fin: "2023-11-30"
 */

// Obtener todas las promociones
/**
 * @swagger
 * /api/promociones:
 *   get:
 *     summary: Obtener todas las promociones
 *     tags:
 *       - promociones
 *     responses:
 *       200:
 *         description: Devuelve todas las promociones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/promociones"
 */
router.get("/promociones", (req, res) => {
  PromoSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/promociones/{numero_de_promocion}:
 *   get:
 *     summary: Obtener promociones por número de promoción
 *     tags:
 *       - promociones
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
 *               $ref: "#/components/schemas/promociones"
 */
router.get("/promociones/:numero_de_promocion", (req, res) => {
  const { numero_de_promocion } = req.params;
  PromoSchema.find({ numero_de_promocion })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/promociones:
 *   post:
 *     summary: Crear nueva promoción
 *     tags:
 *       - promociones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/promociones"
 *     responses:
 *       201:
 *         description: Nueva promoción creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/promociones"
 */
router.post("/promociones", (req, res) =>{
  const promocion = PromoSchema(req.body);
  promocion.save()
  .then((data)=>res.json({mensaje:"Objeto guardado correctamente"}))
  .catch((error)=>res.status({mensaje:error}))
})

/**
 * @swagger
 * /api/promociones/numero/{numero_de_promocion}:
 *   put:
 *     summary: Actualizar promoción por número de promoción
 *     tags:
 *       - promociones
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
 *             $ref: "#/components/schemas/promociones"
 *     responses:
 *       200:
 *         description: Promoción actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/promociones"
 */
router.put("/promociones/numero/:numero_de_promocion", (req, res) => {
  const { numero_de_promocion } = req.params;
  const { nombre_promocion, descripcion, fecha_inicio, fecha_fin } = req.body;
  PromoSchema.findOneAndUpdate(
    { numero_de_promocion },
    { nombre_promocion, descripcion, fecha_inicio, fecha_fin },
    { new: true }
  )
    .then((data) => res.json({mensaje: "se modificaron los cambios correspondientes"}))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/promociones/numero/{numero_de_promocion}:
 *   delete:
 *     summary: Eliminar promoción por número de promoción
 *     tags:
 *       - promociones
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
router.delete("/promociones/numero/:numero_de_promocion", (req, res) => {
  const { numero_de_promocion } = req.params;
  PromoSchema.findOneAndDelete({ numero_de_promocion })
    .then((data) => res.json({mensaje:"la promocion fue eliminada correctamente"}))
    .catch((error) => res.status(404).json({ message: error }));
});

module.exports = router;