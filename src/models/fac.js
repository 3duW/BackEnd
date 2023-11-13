const mongoose = require("mongoose");
const facSchema = mongoose.Schema({
    cliente:{
        type: String,
        required: true,          
    },
    factura:{
        type: Number,
        required: true,           
    },
    monto:{
        type: Number,
        required: true,           
    },
    metodo_pago:{
        type: String,
        required: true,      
    },
});

module.exports = mongoose.model("fac",facSchema);