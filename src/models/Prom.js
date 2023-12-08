const mongoose = require("mongoose");
const PromoSchema = mongoose.Schema({
    correo: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("promociones", PromoSchema);
