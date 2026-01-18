const { admin } = require('../db');
const { logInfo, logWarn, logError } = require('../utils/logger');
const checkAuth = async (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;//preluam token-ul din header

    if (!tokenHeader) {
      logWarn('AUTH', 'Lipsă header sau format greșit');
      return res.status(401).json({ message: 'Autentificarea este necesară ' });
    }

    const token = tokenHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    next();
  } catch (error) {
    logError('AUTH', `Token invalid: ${error.message}`);
    return res.status(403).json({ message: 'Token invalid sau expirat' });
  }
};

module.exports = checkAuth;