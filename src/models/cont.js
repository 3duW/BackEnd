const mongoose = require("mongoose");
const contSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,          
    },
    correo:{
        type: String,
        required: true,           
    },
    telefono:{
        type: Number,
        required: true,           
    },
    dni: {
        type: Number,
        required: true,
    },
    direccion:{
        type: String,
        required: true,      
    },
    asunto:{
        type: String,
        required: true,      
    }
});

module.exports = mongoose.model("cont",contSchema);