const mongoose = require("mongoose");
const contSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,          
    },
    gmail:{
        type: String,
        required: true,           
    },
    telefono:{
        type: Number,
        required: true,           
    },
    direccion:{
        type: String,
        required: true,      
    },
    mensaje:{
        type: String,
        required: true,      
    }
});

module.exports = mongoose.model("cont",contSchema);