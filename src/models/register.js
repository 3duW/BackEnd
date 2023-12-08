const mongoose = require("mongoose")

const registerSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    telefono:{
        type: String,
        require: true
    },
    dni:{
        type: String,
        require: true
    },
    Correo:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true,
    }     
});


 
module.exports = mongoose.model("registros", registerSchema);