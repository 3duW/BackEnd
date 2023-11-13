const mongoose = require("mongoose");
const invSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,          
    },
    stock_actual:{
        type: Number,
        required: true,           
    },
    unidad_medida:{
        type: String,
        required: true,           
    },
    precio_unitario:{
        type: Number,
        required: true,           
    },
});

module.exports = mongoose.model("inv",invSchema);