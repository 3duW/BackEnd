//llmando los paquetes
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PediRoutes = require("./routes/Pedi");
const PromoRoutes = require("./routes/Promo");
const comentRoutes = require("./routes/coment");
const contRoutes = require("./routes/cont");
const delivRoutes = require("./routes/deliv");
const facRoutes = require("./routes/fac");
const hisRoutes = require("./routes/his");
const horRoutes = require("./routes/hor");
const inventRoutes = require("./routes/invent");
const maquiRoutes = require("./routes/maqui");
const notifRoutes = require("./routes/notif");
const planiRoutes = require("./routes/plani");
const sumiRoutes = require("./routes/sumi");
const swaggerUI  = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");


//configuracion
const app = express();
const port = process.env.PORT || 9000;

const swaggerConf = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentacion LavaGroup",
            version: "1.0.0"
        },
        servers:[
            {
                url:"http://localhost:9000"
            }
        ]
    },
    apis: [ ` ${path.join(__dirname, "./routes/*.js")} ` ]
}

//middleware
app.use(express.json());
app.use("/api" , facRoutes);
app.use("/api" , hisRoutes);
app.use("/api" , horRoutes);
app.use("/api" , contRoutes);
app.use("/api" , sumiRoutes);
app.use("/api", PediRoutes);
app.use("/api", planiRoutes);
app.use("/api", PromoRoutes);
app.use("/api" , comentRoutes);
app.use("/api" , delivRoutes);
app.use("/api" , inventRoutes);
app.use("/api" , maquiRoutes);
app.use("/api" , notifRoutes);
 //route

app.use("/api-doc",swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerConf)))

//mongodb connection

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
});
app.listen(port, () => console.log("server listening on port", port));