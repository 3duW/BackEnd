const express = require("express");
const PediSchema = require("../models/Pedidos");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     pedidos:
 *       type: object
 *       properties:
 *         num_pedidos:
 *           type: string
 *           description: Número de pedidos
 *         cliente: 
 *           type: string 
 *           description: nombre del cliente
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
 *         - cliente
 *         - num_pedidos
 *         - fecha_pedido
 *         - tipo_servicio
 *         - estado
 *         - articulos
 *       example:
 *         cliente: "nombre"
 *         num_pedidos: "12345"
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
 * /api/pedidos:
 *   get:
 *     summary: Mostrar todos los pedidos
 *     tags:
 *       - pedidos
 *     responses:
 *       200:
 *         description: Devuelve todos los pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/pedidos"
 */
router.get("/pedidos", (req, res) => {
  PediSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// Método get para obtener pedidos por num_pedido
/**
 * @swagger
 * /api/pedidos/num_pedidos/{num_pedidos}:
 *   get:
 *     summary: Obtener pedidos por num_pedido
 *     tags:
 *       - pedidos
 *     parameters:
 *       - in: path
 *         name: num_pedidos
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de pedidos a buscar
 *     responses:
 *       200:
 *         description: Devuelve los pedidos correspondientes al num_pedidos proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/pedidos"
 */
router.get("/pedidos/num_pedidos/:num_pedidos", (req, res) => {
  const { num_pedidos } = req.params;
  PediSchema.find({ num_pedidos })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// ...

// Actualizar un pedido existente
/**
 * @swagger
 * /api/pedidos/{num_pedidos}:
 *   put:
 *     summary: Actualizar un pedido existente
 *     tags:
 *       - pedidos
 *     parameters:
 *       - in: path
 *         name: num_pedidos
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de pedido a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente: 
 *                 type: string
 *                 description: nombre del cliente 
 *               fecha_pedido:
 *                 type: string
 *                 format: date
 *                 description: Fecha del pedido
 *               tipo_servicio:
 *                 type: string
 *                 description: Tipo de servicio
 *               estado:
 *                 type: string
 *                 description: Estado del pedido
 *               articulos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     cantidad:
 *                       type: number
 *             required:
 *               - cliente
 *               - fecha_pedido
 *               - tipo_servicio
 *               - estado
 *               - articulos
 *     responses:
 *       200:
 *         description: Pedido actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/pedidos"
 */
router.put("/pedidos/:num_pedidos", (req, res) => {
  const { num_pedidos } = req.params;
  const { fecha_pedido, tipo_servicio, estado, articulos } = req.body;

  PediSchema.findOneAndUpdate(
    { num_pedidos },
    { fecha_pedido, tipo_servicio, estado, articulos },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// ...

// Método para eliminar pedidos
/**
 * @swagger
 * /api/pedidos/{num_pedidos}:
 *   delete:
 *     summary: Eliminar un pedido
 *     tags:
 *       - pedidos
 *     parameters:
 *       - in: path
 *         name: num_pedidos
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
router.delete("/pedidos/:num_pedidos", (req, res) => {
  const { num_pedidos } = req.params;
  PediSchema.findOneAndDelete({ num_pedidos })
    .then((data) => res.json({mensaje:"la colecion fue eliminada correctamente"}))
    .catch((error) => res.status(404).json({ message: error }));
});
module.exports = router;