const mongoose = require("mongoose")

const loginSchema = mongoose.Schema({
    correo:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true,
    }     
});


 
module.exports = mongoose.model("login", loginSchema);