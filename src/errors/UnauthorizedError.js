const { UNAUTHORIZED_ERROR_STATUS } = require("../constants/Errors");

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.status = UNAUTHORIZED_ERROR_STATUS;
    }
}

module.exports = UnauthorizedError;