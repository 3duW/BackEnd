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
 *                  description: 
 *                  items:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              description: Nombre del suministro
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
// Metodo post envia una nuevas entidades(Nuevos datos)
router.post("/sumi", (req, res) => {
    const sumi = sumiSchema(req.body);
    sumi
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

// Obtener todos los suministros
router.get("/sumi", (req, res) => {
    sumiSchema.find()
        .then(data => res.json(data))
        .catch(error => res.json({ mensaje: error }));
});
// Obtener suministros por proveedor
router.get("/sumi/:proveedor", (req, res) => {
    const { proveedor } = req.params;
    sumiSchema.find({ proveedor })
        .then(data => res.json(data))
        .catch(error => res.json({ mensaje: error }));
});
  

// Actualizar un suministro
router.put("/sumi/:proveedor", (req, res) => {
    const { proveedor } = req.params;
    const { nombre, cantidad_disponible, unidad_medida } = req.body;

    sumiSchema.findOneAndUpdate({ proveedor }, { nombre, cantidad_disponible, unidad_medida })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar un suministro
router.delete("/suministros/:id", (req, res) => {
    const { id } = req.params;
    suministroModel.findByIdAndDelete(id)
        .then(data => res.json({ mensaje: "Suministro eliminado correctamente" }))
        .catch(error => res.status(400).json({ mensaje: error }));
});

module.exports = router;
