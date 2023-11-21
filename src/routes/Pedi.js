const express = require("express");
const PediSchema = require("../models/Pedidos");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       properties:
 *         num_pedido:
 *           type: string
 *           description: Número de pedido
 *         fecha_pedido:
 *           type: string
 *           format: date
 *           description: Fecha del pedido
 *         tipo_servicio:
 *           type: string
 *           description: Tipo de servicio
 *         estado:
 *           type: string
 *           description: Estado del pedido
 *         articulos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               cantidad:
 *                 type: number
 *       required:
 *         - num_pedido
 *         - fecha_pedido
 *         - tipo_servicio
 *         - estado
 *         - articulos
 *       example:
 *         num_pedido: "12345"
 *         fecha_pedido: "2023-11-20"
 *         tipo_servicio: "Servicio X"
 *         estado: "Pendiente"
 *         articulos:
 *           - nombre: "Artículo A"
 *             cantidad: 2
 *           - nombre: "Artículo B"
 *             cantidad: 1
 */

// Mostrar todos los pedidos
/**
 * @swagger
 * /api/pedi:
 *   get:
 *     summary: Mostrar todos los pedidos
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Devuelve todos los pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Pedido"
 */
router.get("/pedi", (req, res) => {
  PediSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Método get para obtener pedidos por estado
/**
 * @swagger
 * /api/pedi/estado/{estado}:
 *   get:
 *     summary: Obtener pedidos por estado
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: estado
 *         schema:
 *           type: string
 *         required: true
 *         description: Estado del pedido a buscar
 *     responses:
 *       200:
 *         description: Devuelve los pedidos correspondientes al estado proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Pedido"
 */
router.get("/pedi/estado/:estado", (req, res) => {
  const { estado } = req.params;
  PediSchema.find({ estado })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Crear un nuevo pedido
/**
 * @swagger
 * /api/pedi:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Pedido"
 *     responses:
 *       200:
 *         description: Pedido creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Pedido"
 */
router.post("/pedi", (req, res) => {
  const nuevoPedido = new PediSchema(req.body);
  nuevoPedido
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar un pedido existente
/**
 * @swagger
 * /api/pedi/{num_pedido}:
 *   put:
 *     summary: Actualizar un pedido existente
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: num_pedido
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de pedido a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Pedido"
 *     responses:
 *       200:
 *         description: Pedido actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Pedido"
 */
router.put("/pedi/:num_pedido", (req, res) => {
  const { num_pedido } = req.params;
  PediSchema.findByIdAndUpdate(num_pedido, req.body)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Método para eliminar pedidos
/**
 * @swagger
 * /api/pedi/{num_pedido}:
 *   delete:
 *     summary: Eliminar un pedido
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: num_pedido
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de pedido a eliminar
 *     responses:
 *       200:
 *         description: Pedido eliminado correctamente
 *       404:
 *         description: Pedido no encontrado
 */
router.delete("/pedi/:num_pedido", (req, res) => {
  const { num_pedido } = req.params;
  PediSchema.findByIdAndDelete(num_pedido)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;