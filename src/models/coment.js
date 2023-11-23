
// Importing mongoose module
const mongoose = require("mongoose")

// Defining a schema for the comment model
const comentmodel = mongoose.Schema({
    // Client name
    cliente: {
        type: String,
        require: true
    },
    // Date of the comment
    fecha: {
        type: String,
        require: true
    },
    // Rating given by the client
    calificacion: {
        type: String,
        require: true
    },
    // Comment text
    comentario: {
        type: String,
        require: true,
    }
});

// Creating a model named "comentario" using the defined schema
module.exports = mongoose.model("comentario", comentmodel);
//
//In this code, we define a schema for a comment model. Each comment has a client name, a date, a rating, and a comment text. The schema is then used to create a model named "comentario". This model can be used to interact with the MongoDB database..</s>