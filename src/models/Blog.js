const mongoose = require('mongoose');
const { SchemaTypes } = mongoose;

const BlogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },

    content : {
        type : String,
        required : true,
    },

    author : {
        type : SchemaTypes.ObjectId,
        ref : 'User',
        required : true
    },

    created_at : {
        type : Date,
        default : Date.now
    }, 

    modified_at : {
        type : Date
    }
});

const Blog = mongoose.model('Blog', BlogSchema, 'blogs');
module.exports = Blog;