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
    UNSUCCESSFUL_ERROR_STATUS,
    USER_NOT_FOUND,
    NOT_FOUND_ERROR_STATUS,
    INCORRECT_PASSWORD,
    UNAUTHORIZED_ERROR_STATUS,
    INVALID_TOKEN_ERROR,
    MISSING_TOKEN_ERROR,
    INTERNAL_SERVER_ERROR,
    INTERNAL_ERROR_STATUS
} = require('../constants/Errors');
const { EMAIL_REGEX, GENERAL_TEXT_REGEX } = require('../constants/Regex');
const { SUCCESSFUL_USER_REGISTRATION, SUCCESSFUL_CREATION_STATUS, SUCCESSFUL_STATUS, SUCCESSFUL_LOGOUT, SUCCESSFUL_USER_DELETION } = require('../constants/Success');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { getToken, getDecodedValue } = require('../utils/Verifier');
const InternalError = require('../errors/InternalError');

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

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username) {
            const err = new Error(EMPTY_USERNAME);
            err.status = UNSUCCESSFUL_ERROR_STATUS;
            throw err;
        }

        if (!password) {
            const err = new Error(EMPTY_PASSWORD);
            err.status = UNSUCCESSFUL_ERROR_STATUS;
            throw err;
        }
        
        const user = await User.findOne({ username });
        if (!user) {
            const err = new Error(USER_NOT_FOUND)
            err.status = NOT_FOUND_ERROR_STATUS;
            throw err;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const err = new Error(INCORRECT_PASSWORD);
            err.status = UNAUTHORIZED_ERROR_STATUS;
            throw err;
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
        res.status(SUCCESSFUL_STATUS).json({ token });
    } catch (error) {
        res.status(error.status ? error.status : 500)
        .json({
            error : error.message
        });
    }
}

const logout = async (req, res) => {
    res.status(SUCCESSFUL_STATUS).json({
        message : SUCCESSFUL_LOGOUT
    });
}

const deleteUser = async (req, res) => {
    try {
        const token = getToken(req);
        const value = getDecodedValue(token);
        const result = await User.findByIdAndDelete(value.id);
        if (result) {
            res.status(SUCCESSFUL_STATUS).json({
                message : SUCCESSFUL_USER_DELETION
            });
        } else {
            throw new InternalError(INTERNAL_SERVER_ERROR)
        }
    } catch (err) {
        if (!err.status) {
            console.log(err);
            return res.status(INTERNAL_ERROR_STATUS).json({
                error : `${INTERNAL_SERVER_ERROR} ${err.message}`
            });
        } else {
            return res.status(err.status).json({
                error : err.message
            });
        }
    }
}

const verify = async (req, res) => {
    if (req.headers['x-original-method'] === 'GET') {
        return res.status(SUCCESSFUL_STATUS).json({
            valid : true
        })
    }
    try {
        const token = getToken(req);
        const value = getDecodedValue(token);
        // check in database whether the user exists or not
        const user = await User.findOne({ _id : value.id });
        if (user) {
            res.status(SUCCESSFUL_STATUS).json({
                valid : true
            })
        } else {
            throw new UnauthorizedError(USER_NOT_FOUND);
        }
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            res.status(UNAUTHORIZED_ERROR_STATUS).json({
                valid : false,
                error : INVALID_TOKEN_ERROR
            })
        } else {
            res.status(err.status).json({
                valid : false,
                error : err.message
            })
        }
    }
}

module.exports = { register, login, logout, verify, deleteUser }