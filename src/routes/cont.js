const express = require("express");
const router = express.Router();
const contSchema = require("../models/cont");

/**
 *  @swagger
 *  components:
 *    schemas:
 *        Contacto:
 *              type: object
 *              properties:   
 *                  name:
 *                      type: String
 *                      description:  Nombre del cliente
 *                  correo:
 *                      type: String
 *                      description:  Correo del cliente
 *                  telefono:
 *                      type: Number
 *                      description:  Telefono del cliente
 *                  dni:
 *                      type: Number
 *                      description:  Documento nacional de identidad del cliente
 *                  direccion:
 *                      type: string
 *                      description:  Localidad donde se encuenta el cliente
 *                  asunto: 
 *                      type: string
 *                      description:  Conoce mas el servicio
 *              required:
 *                  - name
 *                  - correo
 *                  - telefono
 *                  - dni
 *                  - direccion
 *                  - asunto
 *              example:
 *                  name: Robert
 *                  correo: Robert@gmail.com
 *                  telefono: 934242324
 *                  dni:  718341841
 *                  direccion:  MZ A LOTE 4
 *                  asunto: MAS INFORMACION SERVICIO ALFONBRAS
 */             
//post
/**
 * @swagger
 * /api/cont:
 *   post:
 *     sumary: Guardar nuevos datos
 *     tags: 
 *       - Contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Contacto"
 *     responses:
 *       200:
 *         description: Contacto guardado
 */
// Metodo post para guardar nuevos datos
router.post("/cont", (req, res) => {
  const cont = contSchema(req.body);
  cont
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//GET
/**
 * @swagger
 * /api/cont:
 *   get:
 *     sumary: Mostrar todos los datos Guardados
 *     tags: 
 *       - Contacto
 *     responses:
 *       200:
 *         description: Muestra los contactos Guardados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Contacto"
 */
//Metodo get para Mastror toda la informacion guarda

router.get("/cont", (req, res) => {
  contSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//getbydni
/**
 * @swagger
 * /api/cont/{dni}:
 *   get:
 *     sumary: Busca la información mediante el DNI
 *     tags: 
 *       - Contacto
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: number
 *         required: true
 *         description: Buscar mediante el DNI al contacto
 *     responses:
 *       200:
 *         description: Contacto Encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               item:
 *                 $ref: "#/components/schemas/Contacto"
 *       404:
 *         description: No Existe el DNI 
 */

//Metodo get para encontrar la informacion mediante el dni
router.get("/cont/:dni", (req, res) => {
  const { dni } = req.params;
  contSchema.findOne({ dni })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/cont/{dni}/direccion/telefono:
 *   put:
 *     sumary: Actualizar dirección y teléfono por DNI
 *     tags:
 *       - Contacto
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: number
 *         required: true
 *         description: DNI del contacto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               telefono:
 *                 type: number
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contacto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Contacto"
 *       404:
 *         description: Contacto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
// Metodo put para buscarlos mediante el dni y cambiar la direccion y el telofono
router.put("/cont/:dni/direccion/telefono", (req, res) => {
  const { dni } = req.params;
  const { telefono, direccion } = req.body;

  contSchema.findOneAndUpdate({ dni }, { telefono, direccion })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
 