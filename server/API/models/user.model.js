"use strict";

const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    products: [
        {
            type: String,
            ref: "Product",
        },
    ],
});

UserSchema.set('toJSON', {
    transform: (document, retornedObject) => {
        retornedObject.id = retornedObject._id;
        delete retornedObject._id;
        delete retornedObject.__v;
        delete retornedObject.passwordHash;
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
