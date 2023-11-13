const mongoose = require("mongoose");
const horSchema = mongoose.Schema({
    empleado:{
        type: String,
        required: true,          
    },
    dia_semana:{
        type: String,
        required: true,           
    },
    horario:{
        type: Number,
        required: true,           
    },
});

module.exports = mongoose.model("hor",horSchema);