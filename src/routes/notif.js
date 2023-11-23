const express = require("express")
const notifmodel = require("../models/notif");
const router = express.Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      notificaciones:
 *              type: object
 *              properties:
 *                  num_cliente:
 *                      type: string
 *                      description: saber que equipo o producto               
 *                  tipo_alerta:
 *                      type: string
 *                      description: marca de los produtos
 *                  mensaje:
 *                      type: string
 *                      description: modelo de cada mqquina u objeto
 *                  servicio:
 *                      type: string
 *                      description: año de compra del producto o servicio
 *              required:
 *                  -   num_cliente
 *                  -   tipo_alerta
 *                  -   mensaje
 *                  -   servicio
 *              example:
 *                  num_cliente: L006
 *                  tipo_alerta:  Penediente
 *                  mensaje: La entrega de las camisas esta para las 12am
 *                  servicio:    Lavado y secado
 *                  
 *                  
 *                  
 *          
 *              
 *       
 */

//get
/**
 * @swagger
 * /api/notificaciones:
 *  get:
 *      summary:    Muestra todas las notificaciones indicando el estado del servicio realizado
 *      tags:   [notificaciones]
 *      responses:
 *          200:
 *              description: notificaciones de los trabajos a entregar
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:   array
 *                      items:
 *                          $ref:   '#components/schemas/notificaciones'
 *          404:
 *              description:    No se puede mostrar la notificación.
 */


//get: Busqueda General
router.get("/notificaciones", (req, res) => {
    notifmodel.find()
        .then(data => res.json(data))
        .catch((error) => res.json({mensaje: error}))
});

/**
 * @swagger
 * /api/notificaciones/{num_cliente}:
 *   get:
 *     summary: Busca el servicio mediante el numero de cliente
 *     tags: 
 *       - notificaciones
 *     parameters:
 *       - in: path
 *         name: num_cliente
 *         schema:
 *           type: string
 *         required: true
 *         description: Buscar mediante el num_cliente el servicio.
 *     responses:
 *       200:
 *         description: Servicio Encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               item:
 *                 $ref: "#/components/schemas/notificaciones"
 *       404:
 *         description: No Existe el num_cliente. 
 */


//get: Busqueda por num_cliente
router.get("/notificaciones/:num_cliente", (req, res) => {
    const {num_cliente} = req.params;
    notifmodel.findOne({num_cliente})
        .then(data => res.json(data))
        .catch((error) => res.json({mensaje: error}))
});


//post
/**
 * @swagger
 * /api/notificaciones:
 *   post:
 *     summary: Se crea una nueva notificación de servicio.
 *     tags:
 *       - notificaciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/notificaciones"
 *     responses:
 *       201:
 *         description: Verificacion y programacion del servicio.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/notificaciones"
 *       400:
 *         description: Solicitud no válida
 */



//post
router.post("/notificaciones", (req, res) =>{
    const notifica = notifmodel(req.body);
    notifica.save()
    .then((data)=>res.json({mensaje:"Objeto guardado correctamente"}))
    .catch((error)=>res.status({mensaje:error}))
})

//put
/**
 * @swagger
 * /api/notificaciones/{num_cliente}:
 *   put:
 *     summary: Permite modificar tipo_alerta, mensaje, servicio
 *     tags:
 *       - notificaciones
 *     parameters:
 *       - in: path
 *         name: num_cliente
 *         schema:
 *           type: string
 *         required: true
 *         description: Se cambia datos a partir del número del cliente 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_alerta:
 *                 type: string
 *                 description: indica el estado del servicio 
 *               mensaje:
 *                 type: string
 *                 description: se describe como se procederá el servicio
 *               servicio:
 *                 type: string
 *                 description: Se indica el trabajo realizado
 *     responses:
 *       200:
 *         description: inventario modificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/notificaciones"
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */


//put
router.put("/notificaciones/:num_cliente", (req, res) => {
    const {num_cliente} = req.params;
    const { tipo_alerta, mensaje, servicio } = req.body;

    notifmodel.updateOne({ num_cliente }, {$set:{tipo_alerta, mensaje, servicio}})
        .then((data)=>res.json({mensaje:"objeto actualizado"}))
        .catch((error)=>res.json({mensaje:error}))
});


//delete
/**
 * @swagger
 * /api/notificaciones/{num_cliente}:
 *   delete:
 *     summary: Se elimina el servicio
 *     tags:
 *       - notificaciones 
 *     parameters:
 *       - in: path
 *         name: num_cliente
 *         schema:
 *           type: string
 *         required: true
 *         description: Se busca el servicio a partir del numero del cliente 
 *     responses:
 *       201:
 *         description: Servicio eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/notificaciones"
 *       400:
 *         description: Servicio no válido
 */


//delete
router.delete("/notificaciones/:num_cliente", (req, res) => {
    const {num_cliente}=req.params;
    notifmodel.deleteOne({num_cliente})
    .then((data)=>res.json({mensaje:"objeto eliminado"}))
    .catch((error)=>res.json({mensaje:error}))
});



module.exports = router;