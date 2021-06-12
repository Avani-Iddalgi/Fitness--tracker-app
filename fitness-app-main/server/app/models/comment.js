'use strict'

const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    username: {
        type: String
    },
    content: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },
    uploadId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Upload", required: true
    }
});

commentSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

commentSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Comment', commentSchema);