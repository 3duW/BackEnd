const mongoose = require("mongoose");
const deliSchema = mongoose.Schema({
    Nombre:{
        type: String,
        required: true,          
    },
    telefono:{
        type: Number,
        required: true,           
    },
    Correo:{
        type: String,
        required: true,           
    },
    dni:{
        type: Number,
        required: true,           
    },
    distrito: {
        type: String,
        required: true,
    },
    tipo_servicio:{
        type: String,
        required: true,      
    },
    tipo_prenda:{
        type: String,
        required: true,      
    },
    recojo:{
        type: String,
        required: true,
    },
    direccion:{
        type: String,
        required: true,
    },
    comentario:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("deli",deliSchema);