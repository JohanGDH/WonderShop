"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    username: String,
    name: Number,
    passwordHash: Number,
    notes: [{
        type: Schema.Types.ObjectId,
    }]
});

UserSchema.set('toJSON', {

    transform: (document, retornedObject) => {
        delete retornedObject.passwordHash;
    }
});

module.exports = mongoose.model("User", UserSchema);
