//llmando los paquetes
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const facRoutes = require("./routes/fac");
const hisRoutes = require("./routes/his");
const horRoutes = require("./routes/hor");
const contRoutes = require("./routes/cont");
<<<<<<< HEAD
const pedido = require("./routes/Pedi");
const programacion = require("./routes/planifica");
const promocion = require("./routes/Promo");
=======
const inventRoutes = require("./routes/invent");
const maquiRoutes = require("./routes/maqui");
const comentRoutes = require("./routes/coment");
const notifRoutes = require("./routes/notif");
>>>>>>> 8295a1a3678cfbe447d142688e345463cc0db951
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
<<<<<<< HEAD
app.use("/api", pedido);
app.use("/api", programacion);
app.use("/api", promocion);
=======
app.use("/api" , comentRoutes);
app.use("/api" , inventRoutes);
app.use("/api" , maquiRoutes);
app.use("/api" , notifRoutes);
>>>>>>> 8295a1a3678cfbe447d142688e345463cc0db951

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