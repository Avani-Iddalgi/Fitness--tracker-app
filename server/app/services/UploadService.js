'use strict';
const mongoose = require('mongoose');
const Upload = require('../models/upload');

exports.createUploadSRC = (upload) => {
    const newUpload = new Upload(upload);
    return newUpload.save();
}

exports.updateUpload = (updateUpload) => {
    console.log(updateUpload);
    // const promise = Upload.findByIdAndUpdate(updateUpload.id, updateUpload);
    const promise = Upload.updateOne({_id: updateUpload.id, userId: updateUpload.userId}, updateUpload);
    return promise;
}

exports.getUploadById = (uploadId) => {
    const promise = Upload.findById(uploadId).exec();
    return promise;
}

exports.getAll = () => {
    const promise = Upload.find().exec();
    return promise;
}

exports.deleteUpload = (uploadId) => {
    const promise = Upload.findOneAndRemove(uploadId).exec();
    return promise;
}

exports.getUploadByUserId = (userId) => {
    const promise = Upload.find({userId: userId});
    return promise;
}