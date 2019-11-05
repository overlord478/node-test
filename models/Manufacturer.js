const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String
    }
})

const ProductModel = mongoose.model('Manufacturer', ProductSchema);
module.exports = ProductModel