'use strict';
const userService = require('../services/UserService'),
      User = require('../models/User'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      checkAuth = require("../middleware/check-auth");

/**
 * create a new user
 * 
 * @param req
 * @param res
 * @param next
 */
exports.signup = (req, res, next) => {
    let newUser = {};
    //convert the password to hashcode using bcrypt
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //create a new user instance
            newUser.username = req.body.username;
            newUser.email = req.body.email;
            newUser.password = hash;
            newUser.gender = req.body.gender;
            newUser.height = req.body.height;
            newUser.weight = req.body.weight;
            //use createUser in Services
            userService.createUser(newUser)
                .then(result => {
                    res.status(201).json({
                        message: "User created.",
                        result: result,
                    });
                })
                .catch(err => {
                    console.log(res);
                    res.status(500).json({
                        error: err,
                        message: "Your email has been taken!",
                    });
                });
        });
};

/**
 * user login action
 * 
 * @param req
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {
    let fetchedUser;
    //find the user by email
    
    userService.getUserByEmail(req.body.email)
        .then(user => {
            //if user not exist
            if (!user) {
                return res.status(401).json({
                    message: "Cannot find the email"
                });
            }
            //else compare bcrypt password with user password in db
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        //catch the result
        .then(result => {
            //if result is null
            if (!result) {
                return res.status(401).json({
                    message: "Wrong password"
                });
            }
            //authenticate successfully, use token to store this user
            //send token to frontend
            const token = jwt.sign(
                {email: fetchedUser.email, userId: fetchedUser._id, username: fetchedUser.username}, 
                'secret_this_should_be_longer',
                { expiresIn: "1h"});
            res.status(200).json({
                message: "login successfully",
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id,
                username: fetchedUser.username
            });
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({
                message: "Auth failed"
            });
        });
}

/**
 * search user by userId, used for edit profile
 * 
 * @param req
 * @param res
 * @param next
 */
exports.getUser = (req, res, next) => {
    let userId = req.params.id;
    userService.getUserById(userId)
        .then((user) => {
            if (user) {
                res.status(200).json({
                    user
                });
            }
            else {
                res.status(404).json({
                    message: "User not found"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "get the user failed!"
            });
        });
}

/**
 * update user information
 * @param req
 * @param res
 * @param next
 */
exports.updateUser = (req,res,next) => {
    const userId = req.params.id;
    console.log(req.body);
    console.log(req.body.newPassword);
    console.log(req.body.originPassword);
    console.log(req.body.username);
    console.log(req.body.email);
    bcrypt.hash(req.body.newPassword, 10)
      .then(hash => {
        //get whether user is giving the right old password
        userService.getUserById(userId)
        .then(user => {
            console.log(user);
            console.log(req.body.originPassword);
            return bcrypt.compare(req.body.originPassword, user.password);
        })
        //get the result of bcrypt
        .then(result => {
            console.log(result);
            //if the result is false, old password is wrong
            if (!result) {
                return res.status(401).json({
                    message: "Wrong password"
                });
            }
            //result is true, update the password
            const updatedUser = new User({
                _id: userId,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                gender: req.body.gender,
                height: Number(req.body.height),
                weight: Number(req.body.weight)
            });
            userService.updateUser(updatedUser)
             .then(user => {
                 res.status(200).json({
                     message: "Update Successfully"
                 });
                 //refresh the token value, since the user information has been updated
                 jwt.sign({userId: updatedUser._id, username: updatedUser.username, email: updatedUser.email},
                    "secret_this_should_be_longer",
                    {expiresIn: "1h"});
             })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Updating profile failed!"
            });
        });
      });
    
}

