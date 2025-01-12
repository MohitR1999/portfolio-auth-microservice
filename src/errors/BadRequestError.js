const { BAD_REQUEST_STATUS } = require("../constants/Errors");

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.status = BAD_REQUEST_STATUS;
    }
}

module.exports = BadRequestError;