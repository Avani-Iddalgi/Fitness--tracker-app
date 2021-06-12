'use strict';
const commentService = require('../services/CommentService'),
      Comment = require('../models/comment');

/**
 * create a new comment for a video
 * @param req
 * @param res
 * @param next
 */
exports.createComment = (req, res, next) => {
    let newComment = {};
    //assign value to comment
    newComment.content = req.body.content;
    newComment.userId = req.body.userId;
    newComment.uploadId = req.body.uploadId;
    commentService.createComment(newComment)
        .then(result => {
            res.status(200).json({
                message: "comment created!",
                result: result
            });
        })
        .catch(error => {
            console.log(res);
            res.status(500).json({
                error: error,
                message: "Creating comment fail!"
            });
        });
}
/**
 * find comment by upload id
 * 
 * @param req
 * @param res
 * @param next
 */
exports.getCommentsByUploadId = (req, res, next) => {
    const uploadId = req.params.uploadId;
    commentService.getCommentByUploadId(uploadId)
        .then(comments => {
            res.status(200).json({
                message: "get comments",
                comments: comments
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "getting comments failed!"
            });
        });
}