'use strict';
const mongoose = require('mongoose');
    //   User = mongoose.model('User');
const User = require('../models/User');

/**
 * create a user to register
 * 
 * @param user
 */
exports.createUser = (user) => {
    const newUser = new User(user);
    return newUser.save();
}

/**
 * find a user by id
 * 
 * @param userId
 */
exports.getUserById = (userId) => {
    const promise = User.findById(userId);
    return promise;
}

/**
 * find a user by email
 * 
 * @param userEmail
 */
exports.getUserByEmail = (userEmail) => {
    const promise = User.findOne({email: userEmail});
    return promise;
}

/**
 * update a user
 * 
 * @param user
 */
exports.updateUser = (user) => {
    const promise = User.findByIdAndUpdate(user.id, user);
    return promise;
}