'use strict';
const userController = require('../controllers/UserController');
const checkAuth = require('../middleware/check-auth');

module.exports = (app) => {
    app.post('/user/signup', userController.signup);
    app.post('/user/login', userController.login);
    app.route('/user/userProfile/:id')
        .get( userController.getUser)
        .put(userController.updateUser);
}