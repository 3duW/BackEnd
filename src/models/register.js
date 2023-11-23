const mongoose = require("mongoose")

const registerSchema = mongoose.Schema({
    nombres_completos:{
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
    Correo_Electronico:{
        type: String,
        require: true
    },
    contraseña:{
        type: String,
        require: true,
    }     
});


 
module.exports = mongoose.model("Registro", registerSchema);