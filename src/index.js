const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const facRoutes = require("./routes/fac");
const hisRoutes = require("./routes/his");
const horRoutes = require("./routes/hor");
const invRoutes = require("./routes/Inv");
const contRoutes = require("./routes/cont");



const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use("/api" , facRoutes);
app.use("/api" , hisRoutes);
app.use("/api" , horRoutes);
app.use("/api" , invRoutes);
app.use("/api" , contRoutes);

 //route

app.get("/" , (req,res) => {
    res.send("welcome to my API");
 });

//mongodb connection

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
});
app.listen(port, () => console.log("server listening on port", port));