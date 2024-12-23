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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;