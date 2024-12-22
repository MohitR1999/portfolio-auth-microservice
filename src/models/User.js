const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SchemaTypes } = mongoose;

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    
    password : {
        type : String,
        required : true,
        unique : true,
    },
    
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },

    first_name : {
        type : String,
    },

    last_name : {
        type : String,
    },

    blogs : [{
        type : SchemaTypes.ObjectId,
        ref : 'Blog'
    }]

})

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;