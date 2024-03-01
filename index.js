require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const carsRouter = require("./src/api/routes/cars");
const brandsRouter = require("./src/api/routes/brands");
const usersRouter = require("./src/api/routes/users");
const cloudinary = require("cloudinary").v2;

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

connectDB();

app.use(express.json())

app.use("/api/v1/cars", carsRouter);
app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/users", usersRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found")
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
})