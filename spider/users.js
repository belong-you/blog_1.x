const mysql = require('mysql2/promise');
const config = require('./power');

module.exports.queryAll = async () => {
    const connection = await mysql.createConnection(config);

    const sql = "SELECT `id`, `name`, mail, time, isReceive FROM users;";
    const [results] = await connection.execute(sql);
    connection.end();
    return results;
}

/**
 * 看账号名或邮箱是否已在数据库中存在
 * @param {*} name 账号名或邮箱
 */
module.exports.isExist = async (name) => {
    const connection = await mysql.createConnection(config);

    const sql = "SELECT * FROM users WHERE name = ? or mail = ?;";
    const [results] = await connection.execute(sql, [name, name]);
    connection.end();

    if (results.length === 0) return false;
    else return true;
}

/**
 * 添加一个账户
 * @param {*} name 
 * @param {*} pwd 
 * @param {*} mail 
 * @param {*} time 
 */
module.exports.add = async (name, pwd, mail, time, isReceive, color) => {
    const connection = await mysql.createConnection(config);

    const sql = "INSERT INTO users (`name`, pwd, mail, time, isReceive, color) VALUES(?, ?, ?, ?, ?, ?);";
    const [results] = await connection.execute(sql, [name, pwd, mail, time, isReceive, color]);
    connection.end();
    return '注册成功';
}

/**
 * 账户登录
 * @param {*} name 用户名或邮箱
 * @param {*} pwd 密码验证
 */
module.exports.signIn = async (name, pwd) => {
    const connection = await mysql.createConnection(config);

    const sql = "SELECT name, mail, pwd FROM users WHERE `name` = ? OR mail = ?;";
    const [results] = await connection.execute(sql, [name, name]);
    connection.end();
    if (results.length === 0) {
        return 404;
    } else {
        if (pwd === results[0].pwd) return 200;
        else return 403;
    }
}

// 重设密码信息
module.exports.resetUser = async (mail, name, pwd, isReceive) => {
    const connection = await mysql.createConnection(config);

    let sql;
    if (name === null) {
        sql = "UPDATE users SET pwd = ?, isReceive = ? WHERE mail = ?;";
        await connection.execute(sql, [pwd, isReceive, mail]);
    } else {
        sql = "UPDATE users SET name = ?, pwd = ?, isReceive = ? WHERE mail = ?;";
        await connection.execute(sql, [name, pwd, isReceive, mail]);
    }
    connection.end();
    return '修改成功';
}

// 修改是否接受消息推送
module.exports.isNews = async (id, num) => {
    const connection = await mysql.createConnection(config);

    const sql = "UPDATE users SET isReceive = ? WHERE id = ?;";
    const [results] = await connection.execute(sql, [num, id]);
    connection.end();
    return '修改成功';
}


// 管理员登录
module.exports.adminSignIn = async (name, pwd) => {
    const connection = await mysql.createConnection(config);

    const sql = "SELECT name, passwd FROM admin WHERE `name` = ?";
    const [results] = await connection.execute(sql, [name]);
    connection.end();
    if (results.length === 0) {
        return 404;
    } else {
        if (pwd === results[0].passwd) return 200;
        else return 403;
    }
}
