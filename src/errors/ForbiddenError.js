const { FORBIDDEN_ERROR_STATUS } = require("../constants/Errors");

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
        this.status = FORBIDDEN_ERROR_STATUS;
    }
}

module.exports = ForbiddenError;