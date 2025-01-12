const EMPTY_USERNAME = 'Username is required';
const INVALID_USERNAME = 'Please provide a valid username. It must not contain any special characters';
const EMPTY_EMAIL = 'Email is required';
const INVALID_EMAIL = 'Please provide a valid email ID';
const EMPTY_PASSWORD = 'Password is required';
const INVALID_FIRST_NAME = 'Please provide a valid first name. It must not contain any special characters';
const INVALID_LAST_NAME = 'Please provide a valid last name. It must not contain any special characters';
const USER_NOT_FOUND = `User doesn't exist`;
const INCORRECT_PASSWORD = 'Username or password is incorrect';
const MISSING_TOKEN_ERROR = "No authentication token was found. Please re-login";
const MISSING_AUTH_HEADER_ERROR = "No authentication header was found. Bad request";
const INVALID_TOKEN_ERROR = "Provided authentication token was invalid. Please re-login";
const INTERNAL_SERVER_ERROR = "Internal server error";
const UNSUCCESSFUL_ERROR_STATUS = 400;
const BAD_REQUEST_STATUS = 400;
const NOT_FOUND_ERROR_STATUS = 404;
const UNAUTHORIZED_ERROR_STATUS = 401;
const INTERNAL_ERROR_STATUS = 500;
const FORBIDDEN_ERROR_STATUS = 403;

module.exports = {
    EMPTY_USERNAME,
    INVALID_USERNAME,
    EMPTY_EMAIL,
    INVALID_EMAIL,
    EMPTY_PASSWORD,
    INVALID_FIRST_NAME,
    INVALID_LAST_NAME,
    UNSUCCESSFUL_ERROR_STATUS,
    USER_NOT_FOUND,
    NOT_FOUND_ERROR_STATUS,
    INCORRECT_PASSWORD,
    UNAUTHORIZED_ERROR_STATUS,
    MISSING_TOKEN_ERROR,
    INVALID_TOKEN_ERROR,
    MISSING_AUTH_HEADER_ERROR,
    BAD_REQUEST_STATUS,
    INTERNAL_ERROR_STATUS,
    INTERNAL_SERVER_ERROR,
    FORBIDDEN_ERROR_STATUS
}