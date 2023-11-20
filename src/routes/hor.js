const express = require("express");
const router = express.Router();
const horSchema = require("../models/hor");

/**
 *  @swagger
 *  components:
 *    schemas:
 *        Horario:
 *              type: object
 *              properties:   
 *                  empleado:
 *                      type: String
 *                      description:  Nombre del empleado
 *                  dia_semana:
 *                      type: String
 *                      description:  Dia donde trabaja
 *                  horario:
 *                      type: string
 *                      description:  Horario del trabajador
 *              required:
 *                  - empleado
 *                  - dia_semana
 *                  - horario
 *              example:
 *                  empleado:  ROBERT
 *                  dia_semana: L-234
 *                  horario: 2023-01-04
 */  


/**
 * @swagger
 * /api/hor:
 *   post:
 *     summary: Crear un nuevo registro en el horario
 *     tags:
 *       - Horario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Horario"
 *     responses:
 *       201:
 *         description: Registro creado exitosamente en el horario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Horario"
 *       500:
 *         description: Error interno del servidor al intentar crear el registro en el horario
 */

// Metodo post envia una nuevas entidades(Nuevos datos)
router.post("/hor", (req, res) => {
  const hor = horSchema(req.body);
  hor
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


/**
 * @swagger
 * /api/hor:
 *   get:
 *     summary: Obtener todos los registros en el horario
 *     tags:
 *       - Horario
 *     responses:
 *       200:
 *         description: Lista de todos los registros en el horario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Horario"
 *       400:
 *         description: No se pudo crear el Horario del Trabajador
 */
// Método get para obtener todos los historiales
router.get("/hor", (req, res) => { 
  horSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


/**
 * @swagger
 * /api/hor/{dia_semana}:
 *   get:
 *     summary: Obtener el registro en el horario por día de la semana
 *     tags:
 *       - Horario
 *     parameters:
 *       - in: path
 *         name: dia_semana
 *         schema:
 *           type: string
 *         required: true
 *         description: Día de la semana para buscar un registro en el horario
 *     responses:
 *       200:
 *         description: Registro encontrado en el horario para el día de la semana proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Horario"
 *       404:
 *         description: No se encontró ningún registro en el horario para el día de la semana proporcionado
 */
// Método get para encontrarlo mediante dia_semana
router.get("/hor/:dia_semana", (req, res) => {
  const { dia_semana } = req.params;
  horSchema.findOne({ dia_semana })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});



/**
 * @swagger
 * /api/hor/{dia_semana}/empleado:
 *   put:
 *     summary: Actualizar el empleado asignado para un día específico en el horario
 *     tags:
 *       - Horario
 *     parameters:
 *       - in: path
 *         name: dia_semana
 *         schema:
 *           type: string
 *         required: true
 *         description: Día de la semana para actualizar el empleado en el horario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empleado:
 *                 type: string
 *                 description: Nombre del nuevo empleado asignado para el día de la semana
 *             required:
 *               - empleado
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente para el día de la semana en el horario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Horario"
 *       404:
 *         description: No se encontró ningún registro en el horario para el día de la semana proporcionado
 */

// Metodo put para buscarlos mediante el dni y cambiar la direccion y el telofono
router.put("/hor/:dia_semana/empleado", (req, res) => {
  const { dia_semana } = req.params;
  const { empleado } = req.body;

  horSchema.findOneAndUpdate({ dia_semana }, { empleado })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
 

module.exports = router;