const mongoose = require("mongoose");

const promoSchema = mongoose.Schema({
    nombre: {
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
