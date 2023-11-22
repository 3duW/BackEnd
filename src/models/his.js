const mongoose = require("mongoose");
const hisSchema = mongoose.Schema({
    cliente:{
        type: String,
        required: true,          
    },
    num_servicio:{
        type: String,
        required: true,          
    },
    fecha_pedido:{
        type: String,
        required: true,           
    },
    tipo_servicio:{
        type: String,
        required: true,           
    },
    estado_pedido:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("his",hisSchema);