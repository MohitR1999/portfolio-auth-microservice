const { MISSING_AUTH_HEADER_ERROR, MISSING_TOKEN_ERROR, INVALID_TOKEN_ERROR } = require("../constants/Errors");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const jwt = require('jsonwebtoken');

/**
 * Gets the JWT token from a request and returns it. Throws exception in
 * case it is not found
 * @param {Request} req 
 * @returns {String} JWT token
 */
const getToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new BadRequestError(MISSING_AUTH_HEADER_ERROR);
    }
    const token = authHeader?.split(" ")[1];
    if (!token) {
        throw new UnauthorizedError(MISSING_TOKEN_ERROR);
    }
    return token;
}

/**
 * Gets the decoded object from the JWT token
 * @param {String} token 
 * @returns {Object} Object containing id of the user
 */
const getDecodedValue = (token) => {
    if (!token) {
        throw new UnauthorizedError(MISSING_TOKEN_ERROR);
    }
    try {
        const value = jwt.verify(token, process.env.JWT_SECRET);
        return value;
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            throw new UnauthorizedError(INVALID_TOKEN_ERROR);
        } else {
            throw new Error('Internal error');
        }
    }
}

module.exports = { getToken, getDecodedValue }