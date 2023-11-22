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
 *         num_pedidos:
 *           type: string
 *           description: Número de pedidos
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
 *         - num_pedidos
 *         - fecha_pedido
 *         - tipo_servicio
 *         - estado
 *         - articulos
 *       example:
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


// Método get para obtener pedidos por num_pedido
/**
 * @swagger
 * /api/pedi/num_pedidos/{num_pedidos}:
 *   get:
 *     summary: Obtener pedidos por num_pedido
 *     tags:
 *       - Pedidos
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
 *                 $ref: "#/components/schemas/Pedidos"
 */
router.get("/pedi/num_pedidos/:num_pedidos", (req, res) => {
  const { num_pedidos } = req.params;
  PediSchema.find({ num_pedidos })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// ...

// Actualizar un pedido existente
/**
 * @swagger
 * /api/pedi/{num_pedidos}:
 *   put:
 *     summary: Actualizar un pedido existente
 *     tags:
 *       - Pedidos
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
 *               $ref: "#/components/schemas/Pedido"
 */
router.put("/pedi/:num_pedidos", (req, res) => {
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
router.delete("/pedi/:num_pedidos", (req, res) => {
  const { num_pedidos } = req.params;

  PediSchema.findOneAndDelete({ num_pedidos })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Pedido no encontrado" });
      }
      res.json({ message: "Pedido eliminado correctamente", deletedData: data });
    })
    .catch((error) => res.json({ message: error }));
});
module.exports = router;