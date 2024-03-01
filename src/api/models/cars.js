const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    model: { type: String, trim: true, required: true },
    manufacturer: { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true },
    production: { type: String, trim: true, required: true },
    img: { type: String, trim: true, required: true }
}, {
    timestamps: true,
    collection: "cars"
});

const Car = mongoose.model("cars", carSchema, "cars");

module.exports = Car;