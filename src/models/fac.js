const mongoose = require("mongoose");
const facSchema = mongoose.Schema({
    cliente: {
        type: String,
        required: true,
    },
    num_factura: {
        type: String,
        required: true,
    },
    monto: {
        type: Number,
        required: true,
    },
    metodo_pago: {
        type: String,
        required: true,
    },
    fecha_emision: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("fac", facSchema);