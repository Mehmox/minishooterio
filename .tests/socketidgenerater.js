const crypto = require('crypto');

module.exports = function generateSocketLikeId(length = 21) {
    return crypto.randomBytes(length)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .slice(0, length);
}