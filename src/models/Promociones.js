const mongoose = require("mongoose");

const promoSchema = mongoose.Schema({
    numero_de_promocion: {
        type: String,
        required: true,
    },
    nombre_promo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    fecha_inicio: {
        type: Date,
        required: true,
    },
    fecha_fin: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model("Promociones", promoSchema);
