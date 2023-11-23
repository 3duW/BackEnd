const mongoose = require("mongoose");

const PlaniSchema = mongoose.Schema({
    
    cliente:{
         type: String,
         required:true,
    },
    dni: {
        type: String,
        required: true,
    },
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

module.exports = mongoose.model("Plani", PlaniSchema);
