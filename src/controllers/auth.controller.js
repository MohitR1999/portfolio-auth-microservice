const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { 
    EMPTY_USERNAME, 
    INVALID_USERNAME, 
    INVALID_EMAIL, 
    EMPTY_EMAIL, 
    EMPTY_PASSWORD,
    INVALID_FIRST_NAME,
    INVALID_LAST_NAME,
    UNSUCCESSFUL_ERROR_STATUS
} = require('../constants/Errors');
const { EMAIL_REGEX, GENERAL_TEXT_REGEX } = require('../constants/Regex');
const { SUCCESSFUL_USER_REGISTRATION, SUCCESSFUL_CREATION_STATUS } = require('../constants/Success');

class Validator {
    isUsernameValid = (username) => {
        if (!username) {
            return { success: false, error: EMPTY_USERNAME };
        } else if (!GENERAL_TEXT_REGEX.test(username)) {
            return { success: false, error: INVALID_USERNAME };
        } else {
            return { success: true, error: "" };
        }
    }

    isEmailValid = (email) => {
        if (!email) {
            return { success: false, error: EMPTY_EMAIL };
        } else if (!EMAIL_REGEX.test(email)) {
            return { success: false, error: INVALID_EMAIL };
        } else {
            return { success: true, error: "" };
        }
    }

    isPasswordValid = (value) => {
        if (!value) {
            return { success: false, error: EMPTY_PASSWORD };
        } else {
            return { success: true, error: "" };
        }
    }
    
}

const register = async (req, res) => {
    const { username, password, email, first_name, last_name } = req.body;
    const validator = new Validator();
    let status = null;
    try {
        // check if username is valid
        status = validator.isUsernameValid(username);
        if (!status.success) {
            throw new Error(status.error);
        }
        
        // check if email is valid
        status = validator.isEmailValid(email);
        if (!status.success) {
            throw new Error(status.error);
        }

        // check if password is valid
        status = validator.isPasswordValid(password);
        if (!status.success) {
            throw new Error(status.error);
        }

        // if everything is good, create user and send response
        const user = new User({
            username,
            password,
            email,
            first_name,
            last_name
        });
        await user.save();
        res.status(SUCCESSFUL_CREATION_STATUS)
        .json({
            message : SUCCESSFUL_USER_REGISTRATION,
            userId : user.id
        });
    } catch (error) {
        // else catch error and send error response
        res.status(UNSUCCESSFUL_ERROR_STATUS)
        .json({
            error : error.message
        });
    }
}

module.exports = { register }