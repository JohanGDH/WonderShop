const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const {Schema} = mongoose;

const ProductSchema = Schema({
    name: {
        type: String,
        unique: true,
    },
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

ProductSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', ProductSchema);