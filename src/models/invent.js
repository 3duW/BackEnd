const mongoose = require("mongoose");

const inventmodel = mongoose.Schema({
    tipo:{
        type: String,
        require: true
    },
    marca:{
        type: String,
        require: true
    },
    modelo:{
        type: String,
        require: true
    },
    periodo:{
        type: String,
        require: true
    },
    cantidad:{
        type: Number,
        require: true, 
    }
});


 
module.exports = mongoose.model("inventarios", inventmodel);
