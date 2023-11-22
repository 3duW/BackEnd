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
 *                      description: saber que equipo o producto               
 *                  marca:
 *                      type: string
 *                      description: marca de los produtos
 *                  estado:
 *                      type: string
 *                      description: modelo de cada mqquina u objeto
 *                  ult_mant:
 *                      type: string
 *                      description: fecha del ultimo mantenimiento del equipo
 *              required:
 *                  -   tipo
 *                  -   marca
 *                  -   estado
 *                  -   ult_mant
 *              example:
 *                  tipo: sillas
 *                  marca:  lenovo
 *                  estado: V750
 *                  ult_mant:    2023-10-20
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
 * /api/maquinas:
 *  get:
 *      summary:    Muestra todo el inventario
 *      tags:   [maquinas]
 *      responses:
 *          200:
 *              description: inventario mostrado correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:   array
 *                      items:
 *                          $ref:   '#components/schemas/maquinas'
 *          404:
 *              description:    No se puede mostrar el inventario
 */

//get: Busqueda de equipo por marca y ult_mant
router.get("/maquinas", (req, res) => {
    maquimodel.find()
        .then(data => res.json(data))
        .catch((error) => res.json({mensaje: error}))
});

/**
 * @swagger
 * /api/maquinas/{marca}/{ult_mant}:
 *   get:
 *     summary: Obtener recursos por marca y modelo.
 *     tags:
 *       - maquinas
 *     parameters:
 *       - in: path
 *         name: marca
 *         schema:
 *           type: string
 *         required: true
 *         description: Marca de los recursos.
 *       - in: path
 *         name: ult_mant
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
 *              $ref:   '#components/schemas/maquinas'
 *       404:
 *         description: No se encontraron productos.
*/

//get: Busqueda de producto por marca y modelo
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
 *     summary: Agregar un nuevo equipo
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
 *         description: Nuevo equipo agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/maquinas"
 *       400:
 *         description: Solicitud no válida
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
 *     summary: Busca por marca y permite modificar el estado y su ult_mant.
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
 *         description: actualizacion de informacion modificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/maquinas"
 *       404:
 *         description: Producto no encontrado
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