const mongoose = require("mongoose");

const progSchema = mongoose.Schema({
    
    fecha_recogida: {
        type: Date,
        required: true,
    },
    hora_recogida: {
        type: String,
        required: true,
    },
    fecha_entrega: {
        type: Date,
        required: true,
    },
    hora_entrega: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Programación", progSchema);
