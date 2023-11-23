const express = require("express")
const maquimodel = require("../models/maqui");
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      maquinas:
 *              type: object
 *              properties:
 *                  tipo:
 *                      type: string
 *                      description: descripción del tipo máquina.               
 *                  marca:
 *                      type: string
 *                      description: marca de las máquinas
 *                  estado:
 *                      type: string
 *                      description: condición actual de la máquina.
 *                  ult_mant:
 *                      type: string
 *                      description: fecha del último mantenimiento de la máquina.
 *              required:
 *                  -   tipo
 *                  -   marca
 *                  -   estado
 *                  -   ult_mant
 *              example:
 *                  tipo: lavadora industrial
 *                  marca:  nivia
 *                  estado: operativo
 *                  ult_mant:    2023-10-20
 *                  
 *     
 */

//get: Busqueda de la máquina por marca y último mantenimiento
/**
 * @swagger
 * /api/maquinas:
 *  get:
 *      summary:    Busqueda general de todas las máquinas.
 *      tags:   [maquinas]
 *      responses:
 *          200:
 *              description: se muestra toda la relación de las máquinas correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:   array
 *                      items:
 *                          $ref:   '#components/schemas/maquinas'
 *          404:
 *              description:    No se puede mostrar la relación de máquinas.
 */

//get: Busqueda de la máquina por marca y último mantenimiento
router.get("/maquinas", (req, res) => {
    maquimodel.find()
        .then(data => res.json(data))
        .catch((error) => res.json({mensaje: error}))
});

//get: Busqueda de la máquina por marca y modelo
/**
 * @swagger
 * /api/maquinas/{marca}/{ult_mant}:
 *   get:
 *     summary: Busqueda de las máquinas por marca y último mantenimiento.
 *     tags:
 *       - maquinas
 *     parameters:
 *       - in: path
 *         name: marca
 *         schema:
 *           type: string
 *         required: true
 *         description: Marca de las máquinas.
 *       - in: path
 *         name: ult_mant
 *         schema:
 *           type: string
 *         required: false
 *         description: Modelo de las máquinas.
 *     responses:
 *       200:
 *         description: Se encontró la maquina buscada.
 *         content:
 *           application/json:
 *             schema:
 *              $ref:   '#components/schemas/maquinas'
 *       404:
 *         description: No se encontró la máquina solicitada.
*/

//get: Busqueda de la máquina por marca y modelo
router.get("/maquinas/:marca/:ult_mant?", (req, res) => {
    const { marca, ult_mant } = req.params;

    // Construir el objeto de consulta con marca y modelo
    const query = { marca };

    // Agregar modelo a la consulta si está presente en la solicitud
    if (ult_mant) {
        query.ult_mant = ult_mant;
    }

    maquimodel.find(query)
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
 * /api/maquinas:
 *   post:
 *     summary: Agregar una nueva máquina
 *     tags:
 *       - maquinas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/maquinas"
 *     responses:
 *       201:
 *         description: Nueva máquina agregada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/maquinas"
 *       400:
 *         description: Solicitud no válida.
 */

//post
router.post("/maquinas", (req, res) =>{
    const maquina = maquimodel(req.body);
    maquina.save()
    .then((data)=>res.json({mensaje:"Objeto guardado correctamente"}))
    .catch((error)=>res.status({mensaje:error}))
})

//put
/**
 * @swagger
 * /api/maquinas/{marca}:
 *   put:
 *     summary: Busca por marca y permite modificar el estado y su último mantenimiento.
 *     tags:
 *       - maquinas
 *     parameters:
 *       - in: path
 *         name: marca
 *         schema:
 *           type: string
 *         required: true
 *         description: marca del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 description: estado actual del equipo
 *               ult_mant:
 *                 type: string
 *                 description: Ultimo mantenimiento realizado al equipo
 *     responses:
 *       200:
 *         description: actualización de informacion modificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/maquinas"
 *       404:
 *         description: No se puede actualizar los datos del equipo. 
 *       500:
 *         description: Error interno del servidor
 */


//put
router.put("/maquinas/:marca", (req, res) => {
    const { marca } = req.params;
    const { estado, ult_mant } = req.body;

    maquimodel.findOneAndUpdate({ marca }, { estado, ult_mant }, { new: true })
        .then((data) => res.json( data ))
        .catch((error) => res.json({ mensaje: error }));
});




module.exports = router;