const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    manufacturer: {
        type: Schema.Types.ObjectId,
        ref: 'Manufacturer'
    }
})

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel