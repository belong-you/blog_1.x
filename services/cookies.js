const { publish, verify } = require('./jwt');
const { getErr } = require('../services/errorCheck');

/**
 * 设置 cookie
 * @param {*} res 
 * @param {string} name 想要设置的 cookie.name
 * @param {*} jwtObj 要加密的 jwt 对象
 * @param {*} overdueTime 过期时间
 */
exports.setCookies = (res, name, jwtObj, overdueTime = 3600 * 1000 * 24 * 5, path = '/') => {
    res.cookie(name, 
        `${publish(jwtObj)}`, 
        {
            path: path,
            maxAge: overdueTime,
            // domain: '192.168.1.80:3000',
            httpOnly: true,
            rolling: false,
        }
    );
}

/**
 * 获取 cookie
 * @param {string} cookieText 获取到的 cookie 字符串
 * @param {string} key 想要解密后的 key 值
 */
exports.getCookies = (cookieText = '', key) => {
    const arr = cookieText.split('; '), obj = {};

    arr.forEach(val => {
        obj[val.split('=')[0]] = val.split('=')[1];
    })
    return verify(obj[key]);
}