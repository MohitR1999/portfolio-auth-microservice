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

/**
 * validates a username
 * @param {String} username 
 */
const checkUsernameValid = (username) => {
    if(!username) {
        throw new Error(EMPTY_USERNAME);
    }
    else if (username && !GENERAL_TEXT_REGEX.test(username)) {
        throw new Error(INVALID_USERNAME);
    } 
}

const checkEmailValid = (email) => {
    if (!email) {
        throw new Error(EMPTY_EMAIL);
    }
    
    else if (email && !EMAIL_REGEX.test(email)) {
        throw new Error(INVALID_EMAIL);
    } 
}

const checkPasswordValid = (value) => {
    if (!value) {
        throw new Error(EMPTY_PASSWORD);
    }
}

const checkFirstNameValid = (value) => {
    if (value && !GENERAL_TEXT_REGEX.test(value)) {
        throw new Error(INVALID_FIRST_NAME);
    }
}

const checkLastNameValid = (value) => {
    if (value && !GENERAL_TEXT_REGEX.test(value)) {
        throw new Error(INVALID_LAST_NAME);
    }
}

const register = async (req, res) => {
    const { username, password, email, first_name, last_name } = req.body;
    try {
        // check if username is valid
        checkUsernameValid(username);
        // check if email is valid
        checkEmailValid(email);
        // check if password is valid
        checkPasswordValid(password);
        // check if given first name is valid
        checkFirstNameValid(first_name);
        // check if given last name is valid
        checkLastNameValid(last_name);
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