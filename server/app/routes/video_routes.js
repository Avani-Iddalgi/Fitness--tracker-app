'use strict';
const uploadController = require('../controllers/UploadController');

module.exports = (app) => {
    

    app.get('/fitness/video_library', uploadController.getTotal);
    
};