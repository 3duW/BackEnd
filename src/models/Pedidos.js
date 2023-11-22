const mongoose = require("mongoose");

const pediSchema = mongoose.Schema({
     
    num_pedidos:{
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
            nombre: { type: String },
            cantidad: { type: Number }
        }
    ]
});

module.exports = mongoose.model("Pedidos", pediSchema);
