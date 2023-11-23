const mongoose = require("mongoose");
const sumSchema = mongoose.Schema({
    proveedor: {
        type: String,
        required: true,
    },
    suministros: [
        {
            nombre: {
                type: String,
                required: true,
            },
            cantidad_disponible: {
                type: Number,
                required: true,
            },
            unidad_medida: {
                type: String,
                required: true,
            },
        }
    ]
});

module.exports = mongoose.model("Sumi", sumSchema);