'use strict';
const mongoose = require('mongoose'),
    Meal = mongoose.model('meal');
    
exports.getAll = () => {
    const promise = Meal.find().exec();
    return promise;
}

exports.getAllbyUser = (userId) => {
    const promise = Meal.find({User_Id: userId});
    return promise;
}

/**
 * Returns a promise for search results.
 *
 * @param search param.
*/
exports.search = (params) => {
    const promise = Meal.find(params).exec();
    return promise;
};

/**
 * Saves the new meal object.
 *
 * @param meal
*/
exports.save = (meal) => {
    const newMeal = new Meal(meal);
    return newMeal.save();
};

/**
 * Returns the meal object by id.
 *
 * @param mealId
*/
exports.get = (mealId) => {
    const mealPromise = Meal.findById(mealId).exec();
    return mealPromise;
};

/**
 * Updates an existing order.
 *
 * @param updatedMeal
*/
exports.update = (updatedMeal) => {
    const promise = Meal.findByIdAndUpdate(updatedMeal.id, updatedMeal).exec();
    return promise;
};

/**
 * Deletes an existing order.
 *
 * @param mealId    
*/
exports.delete = (mealId) => {
    const promise = Meal.findByIdAndRemove(mealId).exec();
    return promise;
};