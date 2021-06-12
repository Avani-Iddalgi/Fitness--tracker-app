'use strict';
const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator');

//define the attributes for user
let userSchema = new mongoose.Schema ({
    username : {
        type: String,
        required: "username is missing"
    },
    email : {
        type: String,
        required: "email is missing",
        unique: true
    },
    password: {  
        type: String,
        required: "password is missing"
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    gender: {
        type: String
    }
}, {
    versionKey: false
});

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

//add mongoose unique validator
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    virtuals: true
});

//create user model
module.exports = mongoose.model('User', userSchema);