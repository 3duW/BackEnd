const express = require("express");
const router = express.Router();
const deliSchema = require("../models/deliv");

/**
 *  @swagger
 *  components:
 *    schemas:
 *        Delivery:
 *              type: object
 *              properties:   
 *                  nombre:
 *                      type: string
 *                      description: Nombre del solicitante
 *                  telefono:
 *                      type: number
 *                      description:  Numero Telefono
 *                  Correo:
 *                      type: String Direccion eletronica 
 *                      description:  
 *                  dni:
 *                      type: number
 *                      description:  Documento nacional de identidad
 *                  distrito:
 *                      type: string
 *                      description:  Distrito donde solicita el delivery
 *                  tipo_servicio:
 *                      type: string
 *                      description:  Servicio elegido
 *                  tipo_prenda:
 *                      type: stringO
 *                      description: El tipo de prenda que eligio 
 *                  recojo:
 *                      type: string
 *                      description:  El cliente indica un recojo a tienda 
 *                  entrega:
 *                      type: string
 *                      description:  Hora que brinda la tienda de la entrega
 *                  direccion:
 *                      type: string
 *                      description:  Localizacion del lugar para entregar 
 *                  comentario:
 *                      type: string
 *                      description:  Opinion del cliente del trato a mejor de servicio implementado
 *              required:
 *                  - Nombre
 *                  - telefono
 *                  - Correo
 *                  - dni
 *                  - distrito
 *                  - tipo_servicio
 *                  - tipo_prenda
 *                  - recojo
 *                  - entrega
 *                  - direccion
 *                  - comentario
 *              example:
 *                  Nombre: "John Doe"
 *                  telefono: 8384843
 *                  Correo: "john.doe@gmail.com"
 *                  dni: 8477548584
 *                  distrito: "San Juan de lurigancho"
 *                  tipo_servicio: "Lavado de cama de perro"
 *                  tipo_prenda: "Cama"
 *                  recojo: "5:00 pm"
 *                  direccion: "Mz LOTE 6 SAN juan de lurigancho "
 *                  comentario: "Pueden dejarlo claro como el cielo"               
 */   


/**
 * @swagger
 * /api/deliv:
 *   post:
 *     summary: Crea nuevos datos de Delivery
 *     tags:
 *       - Delivery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Delivery"
 *     responses:
 *       201:
 *         description: La direccion de Delivery fue creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Delivery"
 *       400:
 *         description: Solicitud no válida
 */
router.post("/deliv", (req, res) => {
    const deliv = deliSchema(req.body); 
    deliv
    .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

  /**
 * @swagger
 * /api/deliv:
 *   get:
 *     summary: Obtener todas los pedidos de Delivery
 *     tags:
 *       - Delivery
 *     responses:
 *       200:
 *         description: Lista de todas rutas de Delivery
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Delivery"
 *       404:
 *         description: No se pudo Mostrar las rutas :(
 */
  router.get("/deliv", (req, res) => {
    deliSchema.find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });


  /**
 * @swagger
 * /api/deliv/{dni}:
 *   get:
 *     summary: Obtener información de una delivery mediante el dni
 *     tags:
 *       - Delivery
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: number
 *         required: true
 *         description: dni
 *     responses:
 *       200:
 *         description: Información de la ruta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Delivery"
 *       404:
 *         description: Delivery no encontrada
 */
  router.get("/deliv/:dni", (req, res) => {
    const { dni } = req.params;
    deliSchema.findOne({ dni })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

  /**
 * @swagger
 * /api/deliv/{dni}/telefono/direccion:
 *   put:
 *     summary: Modificamos telefono y direccion mediante la busqueda del dni
 *     tags:
 *       - Delivery
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: number
 *         required: true
 *         description: Numero del dni
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               telefono:
 *                 type: number
 *                 description: Numero de telefono
 *               direccion:
 *                 type: string
 *                 description: modificacion de la direccion
 *     responses:
 *       200:
 *         description: Delivery modificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Delivery"
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error interno del servidor
 */
  router.put("/deliv/:dni/telefono/direccion", (req, res) => {
    const { dni } = req.params;
    const { telefono, direccion } = req.body;
  
    deliSchema.findOneAndUpdate({ dni }, { telefono, direccion })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
  
module.exports = router;