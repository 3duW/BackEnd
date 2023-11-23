const express = require("express");
const comentmodel = require("../models/coment");
const router = express.Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      comentarios:
 *              type: object
 *              properties:
 *                  cliente:
 *                      type: string
 *                      description: saber que equipo o producto               
 *                  fecha:
 *                      type: string
 *                      description: marca de los produtos
 *                  calificacion:
 *                      type: string
 *                      description: modelo de cada mqquina u objeto
 *                  comentario:
 *                      type: string
 *                      description: año de compra del producto o servicio
 *              required:
 *                  -   cliente
 *                  -   fecha
 *                  -   calificacion
 *                  -   comentario
 *              example:
 *                  cliente: Juan Perez
 *                  fecha:  15/11/2023
 *                  calificacion: Bueno
 *                  comentario:    Realizaron un buen trabajo
 *                  
 *                  
 *          
 *              
 *       
 */

//get: Lectura de los comentarios
/**
 * @swagger
 * /api/comentarios:
 *  get:
 *      summary:    Muestra todos los comentarios de los clientes
 *      tags:   [comentarios]
 *      responses:
 *          200:
 *              description: comentarios por los servicios realizados
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:   array
 *                      items:
 *                          $ref:   '#components/schemas/comentarios'
 *          404:
 *              description:    No se puede mostrar los comentarios
 */


//get: Lectura de los comentarios
router.get("/comentarios", (req, res) => {
    comentmodel.find()
        .then(data => res.json(data))
        .catch((error) => res.json({mensaje: error}))
});


//post: Opiniones de los clientes
/**
 * @swagger
 * /api/comentarios:
 *   post:
 *     summary: Se crea una nuevo comentario
 *     tags:
 *       - comentarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/comentarios"
 *     responses:
 *       201:
 *         description: Guardado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/comentarios"
 *       400:
 *         description: Solicitud no válida
 */



//post - Opiniones de los clientes
router.post("/comentarios", (req, res) =>{
    const comentar = comentmodel(req.body);
    comentar.save()
    .then((data)=>res.json({mensaje:"Objeto guardado correctamente"}))
    .catch((error)=>res.status({mensaje:error}))
})





module.exports = router;           