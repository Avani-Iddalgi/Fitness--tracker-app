const jwt = require('jsonwebtoken');

//authorizate user to do something like upload video, verify you have login to the website
module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization.split("")[1];
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
        req.userData = {email: decodedToken.email, userId: decodedToken.userId, username: decodedToken.username};
        next();
    }catch(error) {
        res.status(401).json({
            message: "Auth failed"
        });
    }
};