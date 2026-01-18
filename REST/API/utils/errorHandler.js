const { logError, logWarn } = require('./logger'); 

const handleControllerError = (res, error, context) => {
    const isValidationError = 
        error.message.includes('obligatoriu') || 
        error.message.includes('minim') || 
        error.message.includes('trebuie') || 
        error.message.includes('text') ||
        error.message.includes('lung') ||
        error.message.includes('invalid') ||
        error.message.includes('format');

    const status = isValidationError ? 400 : 500;

    if (status === 400) {
        logWarn(`${context} VALIDATION`, error.message);
    } else {
        logError(`${context} CRASH`, error.message);
    }

    res.status(status).send(error.message);
};

module.exports = { handleControllerError };