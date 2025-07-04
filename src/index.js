//llamando los paquetes
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const promoRoutes = require("./routes/Promo");
const comentRoutes = require("./routes/coment");
const contRoutes = require("./routes/cont");
const delivRoutes = require("./routes/deliv");
const facRoutes = require("./routes/fac");
const loginRoutes = require("./routes/login");
const pedidoRoutes = require("./routes/Pedi");
const inventRoutes = require("./routes/invent");
const maquiRoutes = require("./routes/maqui");
const notifRoutes = require("./routes/notif");
const registerRoutes = require("./routes/register");
const planiRoutes = require("./routes/plani");
const sumiRoutes = require("./routes/sumi");
const regisRoutes = require("./routes/register");
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
                url: `https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:' + port}`
            }
        ]
    },
    apis: [ ` ${path.join(__dirname, "./routes/*.js")} ` ]
}

app.use(cors());
//app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//    next();
//})

//middleware
app.use(express.json());
app.use(cors());
app.use("/api" , facRoutes);
app.use("/api" , contRoutes);
app.use("/api" , loginRoutes);
app.use("/api" , sumiRoutes);
app.use("/api" , pedidoRoutes);
app.use("/api" , promoRoutes);
app.use("/api" , planiRoutes);
app.use("/api" , comentRoutes);
app.use("/api" , delivRoutes);
app.use("/api" , inventRoutes);
app.use("/api" , maquiRoutes);
app.use("/api" , notifRoutes);
app.use("/api" , regisRoutes);

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

//console.log("URI desde .env:", process.env.MONGODB_URI);
