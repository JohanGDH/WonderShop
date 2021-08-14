'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    name: String,
    price: Number,
    stock: Number,
    characteristics: Object,
});

module.exports = mongoose.model('Product', ProductSchema)
                                
                                