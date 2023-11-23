const mongoose = require("mongoose")

const notifmodel = mongoose.Schema({
    num_cliente:{
        type: String,
        require: true
    },
    tipo_alerta:{
        type: String,
        require: true
    },
    mensaje:{
        type: String,
        require: true
    },
    servicio:{
        type: String,
        require: true,
    }
       
});


 
module.exports = mongoose.model("noti", notifmodel);
