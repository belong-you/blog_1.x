const jwt = require("jsonwebtoken")
const { power } = require('./power');

// 颁发jwt
exports.publish = function (info = {}) {
    return jwt.sign(info, power);
}

// 验证
exports.verify = function (text) {
    try {
        return jwt.verify(text, power);
    } catch (err) {
        return err;
    }
}