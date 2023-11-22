const mongoose = require("mongoose");
const comSchema = mongoose.Schema({
    cliente_id:{
        type: Number,
        required: true,          
    },
    fecha:{
        type: String,
        required: true,           
    },
    calificacion:{
        type: Number,
        required: true,           
    },
    comentario:{
        type: String,
        required: true,      
    }
    
});

module.exports = mongoose.model("com", comSchema);