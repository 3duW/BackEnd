const mongoose = require("mongoose")

const comentmodel = mongoose.Schema({
    cliente:{
        type: String,
        require: true
    },
    fecha:{
        type: String,
        require: true
    },
    calificacion:{
        type: String,
        require: true
    },
    comentario:{
        type: String,
        require: true,
    }
    
});


 
module.exports = mongoose.model("comentario", comentmodel);
