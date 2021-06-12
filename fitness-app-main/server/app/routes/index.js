'use strict';
/**
 * Importing the routes
 */
const mealRoute = require('./../routes/meal_routes');

module.exports = (app) => {
    mealRoute(app);
};