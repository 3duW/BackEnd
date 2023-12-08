const express = require("express");
const router = express.Router();
const PromoSchema = require("../models/Prom");

/**
 * @swagger
 * components:
 *   schemas:
 *        promociones:
 *                  type: object
 *                  properties:
 *                      correo:
 *                          type: string
 *                          description: Correo electronico
 *                  required:
 *                      - correo
 *                  example:
 *                      correo: "VICTORI@GMAIL.COM"
/**
 *
 * @swagger
 * /api/promociones:
 *   post:
 *     summary: Crear nueva promoción
 *     tags:
 *       - promociones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/promociones"
 *     responses:
 *       201:
 *         description: Nueva promoción creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/promociones"
 */
router.post("/promo", (req, res) =>{
  const promocion = PromoSchema(req.body);
  promocion.save()
  .then((data)=>res.json({mensaje:"Objeto guardado correctamente"}))
  .catch((error)=>res.status({mensaje:error}))
})

router.get("/promo", (req, res) => {
  PromoSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;