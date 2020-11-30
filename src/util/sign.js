/**
 * 邮箱验证
 * @param {string} s 
 */
export const isEmail = (s) => {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
}

/**
 * 手机号验证
 * @param {string} s 
 */
export const isMobile = (s) => {
    return /^1[0-9]{10}$/.test(s);
}

/**
 * 电话号码验证
 * @param {string} s 
 */
export const isPhone = (s) => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * 是否 url 地址
 * @param {string} s 
 */
export const isURL = (s) => {
    return /^http[s]?:\/\/.*/.test(s);
}

/**
 * 密码强度
 * @param {string} str 
 */
export const checkPwd = (str) => {
    var Lv = 0;
    if (str.length < 6) {
        return Lv
    }
    if (/[0-9]/.test(str)) {
        Lv++
    }
    if (/[a-z]/.test(str)) {
        Lv++
    }
    if (/[A-Z]/.test(str)) {
        Lv++
    }
    if (/[\.|-|_]/.test(str)) {
        Lv++
    }
    return Lv;
}

/**
 * 格式化时间
 * @param {string} formater 
 * @param {*} t 
 */
export const dateFormater = (formater = 'YYYY-MM-DD HH:mm:ss', t) => {
    let date = t ? new Date(t) : new Date(),
        Y = date.getFullYear() + '',
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    return formater.replace(/YYYY|yyyy/g,Y)
        .replace(/YY|yy/g,Y.substr(2,2))
        .replace(/MM/g,(M<10?'0':'') + M)
        .replace(/DD/g,(D<10?'0':'') + D)
        .replace(/HH|hh/g,(H<10?'0':'') + H)
        .replace(/mm/g,(m<10?'0':'') + m)
        .replace(/ss/g,(s<10?'0':'') + s)
}

const addZero = (v) => v < 10 ? '0' + v : v;
/**
 * 格林时间转为北京时间
 * @param {*} time 
 */
export function switchTimeFormat (time) {
    const dateTime = new Date(time);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const date = dateTime.getDate();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();
    return `${year}-${addZero(month)}-${addZero(date)} ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
}