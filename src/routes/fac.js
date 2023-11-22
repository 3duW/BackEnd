const express = require("express");
const router = express.Router();
const facSchema = require("../models/fac");
const fac = require("../models/fac");

/**
 *  @swagger
 *  components:
 *    schemas:
 *        Factura:
 *              type: object
 *              properties:   
 *                  cliente:
 *                      type: String
 *                      description:  Nombre del cliente
 *                  num_factura:
 *                      type: String
 *                      description:  Numero de la factura
 *                  monto:
 *                      type: Number
 *                      description:  Monto de pago
 *                  metodo_pago:
 *                      type: string
 *                      description:  Forma de pago
 *                  fecha_emision:
 *                      type: string
 *                      description:  Fecha de emision de la Factura
 *              required:
 *                  - cliente
 *                  - num_factura
 *                  - monto
 *                  - metodo_pago
 *                  - fecha_emision
 *              example:
 *                  cliente: Robert
 *                  num_factura: L-453
 *                  monto: 1000
 *                  metodo_pago:  Efecto
 *                  fecha_emision:  2023-23-02
 */             
//post

/**
 * @swagger
 * /api/fac:
 *   post:
 *     summary: Crear una nueva factura
 *     tags:
 *       - Factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Factura"
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Factura"
 *       400:
 *         description: Solicitud no válida
 */
// Método post para enviar una nueva factura
router.post("/fac", (req, res) => {
  const fac = facSchema(req.body); 
  fac
  .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/fac:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags:
 *       - Factura
 *     responses:
 *       200:
 *         description: Lista de todas las facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Factura"
 *       404:
 *         description: No se pudo Mostrar las Facturas :(
 */

// Método get para obtener todas las facturas
router.get("/fac", (req, res) => {
  facSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/fac/{num_factura}:
 *   get:
 *     summary: Obtener información de una factura por número de factura
 *     tags:
 *       - Factura
 *     parameters:
 *       - in: path
 *         name: num_factura
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de factura para buscar
 *     responses:
 *       200:
 *         description: Información de la factura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Factura"
 *       404:
 *         description: Factura no encontrada
 */
//Metodo get para encontrar la informacion mediante factura
router.get("/fac/:num_factura", (req, res) => {
  const { num_factura } = req.params;
  fac.findOne({ num_factura })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


/**
 * @swagger
 * /api/fac/{num_factura}/monto/metodo_pago:
 *   put:
 *     summary: Modificar monto y método de pago de una factura por número de factura
 *     tags:
 *       - Factura
 *     parameters:
 *       - in: path
 *         name: num_factura
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de factura a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monto:
 *                 type: number
 *                 description: Nuevo monto de la factura
 *               metodo_pago:
 *                 type: string
 *                 description: Nuevo método de pago de la factura
 *     responses:
 *       200:
 *         description: Factura modificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Factura"
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error interno del servidor
 */
// Método PUT para buscar mediante el num_factura y modificar el monto y metodo_pago
router.put("/fac/:num_factura/monto/metodo_pago", (req, res) => {
  const { num_factura } = req.params;
  const { monto, metodo_pago } = req.body;

  facSchema.findOneAndUpdate({ num_factura }, { monto, metodo_pago })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


module.exports = router;
