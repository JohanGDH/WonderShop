const mongoose = require('mongoose');

const {Schema} = mongoose;

const ProductSchema = Schema({
    name: String,
    price: Number,
    stock: Number,
    features: Object,
});


ProductSchema.set("toJSON", {
    transform: (document, retornedObject) => {
        retornedObject.id = retornedObject._id;
        delete retornedObject._id;
        delete retornedObject.__v;
    },
});

module.exports = mongoose.model('Product', ProductSchema);