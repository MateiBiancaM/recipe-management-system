const getTime = () => new Date().toLocaleTimeString('ro-RO');

const logSuccess = (context, msg) => {
    console.log(`[${getTime()}] \x1b[32m${"SUCCESS".padEnd(7)}\x1b[0m | [${context}] ${msg}`);
};

const logError = (context, msg) => {
    console.error(`[${getTime()}] \x1b[31m${"ERROR".padEnd(7)}\x1b[0m | [${context} ERROR] ${msg}`);
};

const logWarn = (context, msg) => {
    console.warn(`[${getTime()}] \x1b[33m${"WARNING".padEnd(7)}\x1b[0m | [${context} WARN] ${msg}`);
};

const logInfo = (context, msg) => {
    console.log(`[${getTime()}] \x1b[36m${"INFO".padEnd(7)}\x1b[0m | [${context}] ${msg}`);
};

module.exports = { logSuccess, logError, logWarn, logInfo };