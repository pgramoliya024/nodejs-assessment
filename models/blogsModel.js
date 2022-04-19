const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    description: {
        type : String,
        required: true
    },
    publisedDate: {
        type : String
    },
    modifyDate: {
        type : String,
        required: true
    },
    status: {
        type : String,
        required: true,
        enum: ['Publish','Unpublish'],
        default: 'Unpublish'
    },
    category: {
        type : String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

module.exports = blogSchema;