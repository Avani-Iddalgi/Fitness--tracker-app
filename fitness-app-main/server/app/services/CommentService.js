'use strict';
const mongoose = require('mongoose'),
      Comment = require('../models/comment');
/**
 * create new comment
 * 
 * @param comment */    
exports.createComment = (comment) => {
    const newComent = new Comment(comment);
    return newComent.save();
}

/**
 * search comment by upload id
 * 
 * @param uploadId
 */
exports.getCommentByUploadId = (uploadId) => {
    const promise = Comment.find({uploadId: uploadId}).exec();
    return promise;
}

/**
 * delete a comment
 * 
 * @param commentId
 */
exports.deleteComment = (commentId) => {
    const promise = Comment.findOneAndDelete(commentId).exec();
    return promise;
}