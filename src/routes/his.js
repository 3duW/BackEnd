const express = require("express");
const router = express.Router();
const hisSchema = require("../models/his");

/**
 * @swagger
 * components:
 *   schemas:
 *     Historial:
 *       type: object
 *       properties:
 *         cliente:
 *           type: string
 *           description: Nombre del cliente
 *         num_servicio:
 *           type: string
 *           description: Número del servicio
 *         fecha_pedido:
 *           type: string
 *           description: Fecha en que se realizó el pedido
 *         tipo_servicio:
 *           type: string
 *           description: Tipo de Servicio
 *         estado_pedido:
 *           type: string
 *           description: Etapa del pedido
 *       required:
 *         - cliente
 *         - num_servicio
 *         - fecha_pedido
 *         - tipo_servicio
 *         - estado_pedido
 *       example:
 *         cliente: eduardo
 *         num_servicio: l-345
 *         fecha_pedido: '2023-11-23'
 *         tipo_servicio: lavado de alfombra
 *         estado_pedido: pendiente
 */

/**
 * @swagger
 * /api/his:
 *   post:
 *     summary: Crear un nuevo registro en el historial
 *     tags:
 *       - Historial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Historial"
 *     responses:
 *       201:
 *         description: Registro creado exitosamente en el historial
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Historial"
 *       400:
 *         description: No se encontró el Historial
 */
// Metodo POST para enviar un nuevo Historial del cliente
router.post("/his", (req, res) => {
  const his = hisSchema(req.body); 
  his.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/his:
 *   get:
 *     summary: Obtener todos los registros en el historial
 *     tags:
 *       - Historial
 *     responses:
 *       200:
 *         description: Lista de todos los registros en el historial
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Historial"
 *       400:
 *         description: No se pudo mostrar los historiales
 */
// Método get para obtener todos los historiales
router.get("/his", (req, res) => {
  hisSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/his/{num_servicio}:
 *   get:
 *     summary: Obtener un registro en el historial por número de servicio
 *     tags:
 *       - Historial
 *     parameters:
 *       - in: path
 *         name: num_servicio
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de servicio para buscar un registro en el historial
 *     responses:
 *       200:
 *         description: Registro encontrado en el historial
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Historial"
 *       404:
 *         description: No se encontró ningún registro en el historial con el número de servicio proporcionado
 */
// Método get para encontrarlo mediante num_servicio 
router.get("/his/:num_servicio", (req, res) => {
  const { num_servicio } = req.params;
  hisSchema.findOne({ num_servicio })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


module.exports = router;
