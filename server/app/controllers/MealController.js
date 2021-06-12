'use strict';

const mealService = require('./../services/MealServices');

/**
 * Sets response for order search.
 *
 * @param request
 * @param response
*/
exports.list = (request, response) => {
    const promise = mealService.getAll();
    const result = (meals) => {
        response.status(200);
        response.json(meals);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

exports.listUserMeal = (request, response) => {
    console.log(request.params.id);
    const promise = mealService.getAllbyUser(request.params.id);
    const result = (meals) => {
        response.status(200);
        response.json(meals);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new order and sets the response.
 *
 * @param request
 * @param response
*/
exports.save = (request, response) => {
    const meal = Object.assign({}, request.body);
    const result = (savedMeal) => {
        response.status(201);
        response.json(savedMeal);
    };
    const promise = mealService.save(meal);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Returns order response.
 *
 * @param request
 * @param response
*/
exports.get = (request, response) => {
    const mealId = request.params.id;
    const result = (meal) => {
        response.status(200);
        response.json(meal);
    };
    const promise = mealService.get(mealId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Updates the order resource.
 *
 * @param request
 * @param response
*/
exports.update = (request, response) => {
    const mealId = request.params.id;
    const updatedMeal = Object.assign({}, request.body);
    updatedMeal.id = mealId;
    updatedMeal.Modified_date = Date.now();
    const result = (meal) => {
        response.status(200);
        response.json(meal);
    };
    const promise = mealService.update(updatedMeal);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes an meal resource.
 *
 * @param request
 * @param response
*/
exports.delete = (request, response) => {
    const mealId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message: "Successfully Deleted."
        });
    };
    const promise = mealService.delete(mealId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};