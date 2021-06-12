'use strict';
const mealController = require('../controllers/MealController');
/**
 * Preparing the routes
 */
module.exports = (app) => {
    app.route('/meal')
        .get(mealController.list)
        .post(mealController.save);

    app.route('/meal/:id')
        .get(mealController.get)
        .put(mealController.update)
        .delete(mealController.delete);
    app.route('/meal/user/:id')
        .get(mealController.listUserMeal)
        .put(mealController.update)
        .delete(mealController.delete);
};