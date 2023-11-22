const express = require("express");
const inventmodel = require("../models/invent");
const router = express.Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      registro:
 *              type: object
 *              properties:
 *                  tipo:
 *                      type: string
 *                      description: saber que equipo o producto               
 *                  marca:
 *                      type: string
 *                      description: marca de los produtos
 *                  modelo:
 *                      type: string
 *                      description: modelo de cada mqquina u objeto
 *                  periodo:
 *                      type: string
 *                      description: año de compra del producto o servicio
 *                  cantidad:
 *                      type: number
 *                      description:
 *              required:
 *                  -   tipo
 *                  -   marca
 *                  -   modelo
 *                  -   periodo
 *                  -   cantidad
 *              example:
 *                  tipo:   Secadora 
 *                  marca:  vamatex
 *                  modelo: SX-3000
 *                  periodo:    2015
 *                  cantidad:   3
 *                  
 *                  
 *          
 *              
 *       
 */




//get
/**
 * @swagger
 * /api/registro:
 *  get:
 *      summary:    Muestra todo el inventario
 *      tags:   [registro]
 *      responses:
 *          200:
 *              description: inventario mostrado correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:   array
 *                      items:
 *                          $ref:   '#components/schemas/registro'
 *          404:
 *              description:    No se puede mostrar el registro
 */
router.get("/registro", (req, res) => {
    inventmodel.find()
        .then(data => res.json(data))
        .catch((error) => res.json({mensaje: error}))
});



/**
 * @swagger
 * /api/registro/{marca}/{modelo}:
 *   get:
 *     summary: Obtener recursos por marca y modelo.
 *     tags:
 *       - registro
 *     parameters:
 *       - in: path
 *         name: marca
 *         schema:
 *           type: string
 *         required: true
 *         description: Marca de los equipos.
 *       - in: path
 *         name: modelo
 *         schema:
 *           type: string
 *         required: false
 *         description: Modelo de los recursos (opcional).
 *     responses:
 *       200:
 *         description: Éxito. Devuelve la lista de recursos.
 *         content:
 *           application/json:
 *             schema:
 *              $ref:   '#components/schemas/registro'
 *       404:
 *         description: No se encontraron productos.
*/

//get: Busqueda de producto por marca y modelo
router.get("/registro/:marca/:modelo?", (req, res) => {
    const { marca, modelo } = req.params;

    // Construir el objeto de consulta con marca y modelo
    const query = { marca };

    // Agregar modelo a la consulta si está presente en la solicitud
    if (modelo) {
        query.modelo = modelo;
    }

    inventmodel.find(query)
        .then(data => {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.json({ mensaje: 'Productos no encontrados' });
            }
        })
        .catch(error => res.json({ mensaje: error }));
});

//post
/**
 * @swagger
 * /api/registro:
 *   post:
 *     summary: Crear una nuevo ingreso de producto
 *     tags:
 *       - registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/registro"
 *     responses:
 *       201:
 *         description: Nuevo producto creada e inventariado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/registro"
 *       400:
 *         description: Solicitud no válida
 */



//post - Crear usuario
router.post("/registro", (req, res) =>{
    const inventa = inventmodel(req.body);
    inventa.save()
    .then((data)=>res.json({mensaje:"Objeto guardado correctamente"}))
    .catch((error)=>res.status({mensaje:error}))
})

//put
/**
 * @swagger
 * /api/registro/{modelo}:
 *   put:
 *     summary: Modificar monto y método de pago de una factura por número de factura
 *     tags:
 *       - registro
 *     parameters:
 *       - in: path
 *         name: modelo
 *         schema:
 *           type: string
 *         required: true
 *         description: modelo del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               periodo:
 *                 type: string
 *                 description: Nuevo año
 *               cantidad:
 *                 type: number
 *                 description: Nueva cantidad
 *     responses:
 *       200:
 *         description: inventario modificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/registro"
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

//put
router.put("/registro/:modelo", (req, res) => {
    const { modelo } = req.params;
    const { periodo, cantidad } = req.body;

    inventmodel.findOneAndUpdate({ modelo }, { periodo, cantidad })
        .then((data) => res.json( data ))
        .catch((error) => res.json({ mensaje: error }));
});





module.exports = router;