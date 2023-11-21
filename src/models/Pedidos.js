const mongoose = require("mongoose");

const pediSchema = mongoose.Schema({
     
    num_pedido:{
        type:String,
        require:true
    },
    fecha_pedido: {
        type: Date,
        required: true
    },
    tipo_servicio: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    articulos: [
        {
            nombre: String,
            cantidad: Number,
           
        }
    ]
});

module.exports = mongoose.model("Pedidos", pediSchema);
