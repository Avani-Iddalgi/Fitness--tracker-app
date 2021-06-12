'use strict';
const commentController = require('../controllers/CommentController');

module.exports = (app) => {
    app.route('/fitness/comments/:uploadId')
        .get(commentController.getCommentsByUploadId);
    app.route('/fitness/addComment')
        .post(commentController.createComment);
}