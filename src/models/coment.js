
// Importing mongoose module
const mongoose = require("mongoose")

// Defining a schema for the comment model
const comentmodel = mongoose.Schema({

    cliente: {
        type: String,
        require: true
    },

    fecha: {
        type: String,
        require: true
    },
    calificacion: {
        type: String,
        require: true
    },

    comentario: {
        type: String,
        require: true,
    }
});
module.exports = mongoose.model("comentario", comentmodel);

