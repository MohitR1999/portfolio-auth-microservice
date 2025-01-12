const { INTERNAL_ERROR_STATUS } = require("../constants/Errors");

class InternalError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalError";
        this.status = INTERNAL_ERROR_STATUS;
    }
}

module.exports = InternalError;