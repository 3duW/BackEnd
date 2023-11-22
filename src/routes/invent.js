const express = require("express");
const inventmodel = require("../models/invent");
const router = express.Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      recursos:
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
 *                  tipo: sillas
 *                  marca:  lenovo
 *                  modelo: V750
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
 * /api/recursos:
 *  get:
 *      summary:    Muestra todo el inventario
 *      tags:   [recursos]
 *      responses:
 *          200:
 *              description: inventario mostrado correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:   array
 *                      items:
 *                          $ref:   '#components/schemas/recursos'
 *          404:
 *              description:    No se puede mostrar el inventario
 */
router.get("/recursos", (req, res) => {
    inventmodel.find()
        .then(data => res.json(data))
        .catch((error) => res.json({mensaje: error}))
});



/**
 * @swagger
 * /api/recursos/{marca}/{modelo}:
 *   get:
 *     summary: Obtener recursos por marca y modelo.
 *     tags:
 *       - recursos
 *     parameters:
 *       - in: path
 *         name: marca
 *         schema:
 *           type: string
 *         required: true
 *         description: Marca de los recursos.
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
 *              $ref:   '#components/schemas/recursos'
 *       404:
 *         description: No se encontraron productos.
*/

//get: Busqueda de producto por marca y modelo
router.get("/recursos/:marca/:modelo?", (req, res) => {
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
 * /api/recursos:
 *   post:
 *     summary: Crear una nuevo ingreso de producto
 *     tags:
 *       - recursos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/recursos"
 *     responses:
 *       201:
 *         description: Nuevo producto creada e inventariado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/recursos"
 *       400:
 *         description: Solicitud no válida
 */



//post - Crear usuario
router.post("/recursos", (req, res) =>{
    const recurso = inventmodel(req.body);
    recurso.save()
    .then((data)=>res.json({mensaje:"Objeto guardado correctamente"}))
    .catch((error)=>res.status({mensaje:error}))
})

//put
/**
 * @swagger
 * /api/recursos/{modelo}:
 *   put:
 *     summary: Modificar monto y método de pago de una factura por número de factura
 *     tags:
 *       - recursos
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
 *               $ref: "#/components/schemas/recursos"
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

//put
router.put("/recursos/:modelo", (req, res) => {
    const { modelo } = req.params;
    const { periodo, cantidad } = req.body;

    inventmodel.findOneAndUpdate({ modelo }, { periodo, cantidad })
        .then((data) => res.json( data ))
        .catch((error) => res.json({ mensaje: error }));
});





module.exports = router;