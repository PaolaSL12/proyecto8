const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    owner: { type: String, trim: true, required: true },
    country: { type: String, trim: true, required: true },
    introduced: { type: Number, trim: true, required: true },
    imgLogo: { type: String, trim: true, required: true }
}, {
    timestamps: true,
    collection: "brands"
})

const Brand = mongoose.model("brands", brandSchema, "brands");

module.exports = Brand;