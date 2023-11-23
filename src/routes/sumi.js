const express = require("express");
const router = express.Router();
const sumiSchema = require("../models/sumi");

/**
 * @swagger
 * components:
 *  schemas:
 *      Suministro:
 *          type: object
 *          properties:
 *              proveedor:
 *                  type: string
 *                  description: Nombre del proveedor
 *              suministros:
 *                  type: array
 *                  description: Nombre del Proeevedor
 *                  items:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              description: Nombre del Articulo
 *                          cantidad_disponible:
 *                              type: number
 *                              description: Cantidad disponible del suministro
 *                          unidad_medida:
 *                              type: string
 *                              description: Medida del suministro
 *          required:
 *              - proveedor
 *              - suministros
 *          example:
 *              proveedor: NombreProveedor
 *              suministros:
 *                - nombre: Detergente
 *                  cantidad_disponible: 10
 *                  unidad_medida:  Litros
 *                - nombre: Clorox
 *                  cantidad_disponible: 500
 *                  unidad_medida:  litros
 */


/**
 * @swagger
 * /api/sumi:
 *   post:
 *     summary: Registra Nuevos Suministros
 *     tags:
 *       - Suministro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Suministro"
 *     responses:
 *       201:
 *         description: Suministro creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Factura"
 *       400:
 *         description: Solicitud no válida
 */



// Metodo post envia una nuevas entidades(Nuevos datos)
router.post("/sumi", (req, res) => {
    const sumi = sumiSchema(req.body);
    sumi
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });


/**
 * @swagger
 * /api/sumi:
 *   get:
 *     summary: Muestra todos los suministros
 *     tags:
 *       - Suministro
 *     responses:
 *       200:
 *         description: Lista de todas las Suministros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Suministro"
 *       404:
 *         description: No se pudo Mostrar los Suministros 
 */

// Obtener todos los suministros
router.get("/sumi", (req, res) => {
    sumiSchema.find()
        .then(data => res.json(data))
        .catch(error => res.json({ mensaje: error }));
});

/**
 * @swagger
 * /api/sumi/{proveedor}:
 *   get:
 *     summary: Obtener información mediante el nombre del proveedor
 *     tags:
 *       - Suministro
 *     parameters:
 *       - in: path
 *         name: proveedor
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del proveedor
 *     responses:
 *       200:
 *         description: Información del proveedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/suministro"
 *       404:
 *         description: suministro no encontrada
 */
// Obtener suministros por proveedor
router.get("/sumi/:proveedor", (req, res) => {
    const { proveedor } = req.params;
    sumiSchema.find({ proveedor })
        .then(data => res.json(data))
        .catch(error => res.json({ mensaje: error }));
});
  
/**
 * @swagger
 * /api/sumi/{proveedor}:
 *   put:
 *     summary: Modificar Nombre, cantidad , y medida mediante la busqueda del nombre del proveedor
 *     tags:
 *       - Suministro
 *     parameters:
 *       - in: path
 *         name: proveedor
 *         schema:
 *           type: string
 *         required: true
 *         description: Se busca mediante el nombre del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: N
 *               metodo_pago:
 *                 type: string
 *                 description: Nuevo método de pago de la factura
 *               Unidad de medida:
 *                 type: string
 *                 description: Describe el tipo de medida
 *     responses:
 *       200:
 *         description: Suministro modificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Suministro"
 *       404:
 *         description: No se encontro el suministro
 *       500:
 *         description: Error interno del servidor
 */

// Actualizar un suministro Mediante la busqueda del proveedor
router.put("/sumi/:proveedor", (req, res) => {
    const { proveedor } = req.params;
    const { nombre, cantidad_disponible, unidad_medida } = req.body;

    sumiSchema.findOneAndUpdate({ proveedor }, { nombre, cantidad_disponible, unidad_medida })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});



/**
 * @swagger
 * /api/sumi/{proveedor}:
 *   delete:
 *     summary: Eliminar el Suministro mediante el proveedor
 *     tags:
 *       - Suministro
 *     parameters:
 *       - in: path
 *         name: proveedor
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del proveedor
 *     responses:
 *       200:
 *         description: Suministro eliminado correctamente
 *       404:
 *         description: El Suministro no fue encontrado
 */


// Eliminar un suministro
router.delete("/sumi/:proveedor", (req, res) => {
    const { proveedor } = req.params;

    sumiSchema.findOneAndDelete({ proveedor })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
