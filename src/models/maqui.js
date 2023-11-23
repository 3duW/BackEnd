const mongoose = require("mongoose")

const maquimodel = mongoose.Schema({
    tipo:{
        type: String,
        require: true
    },
    marca:{
        type: String,
        require: true
    },
    estado:{
        type: String,
        require: true
    },
    ult_mant:{
        type: String,
        require: true,
    }
    
});


module.exports = mongoose.model("maqui", maquimodel);