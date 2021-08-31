
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const {Schema} = mongoose;

const UserSchema = Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    products: [
        {
            type: Schema.Types.ObjectId,
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
