const mysql = require('mysql2/promise');
const config = require('./power');

/**
 * 根据评论地址查询评论内容
 * @param {*} address 评论地址
 */
module.exports.query = async (address) => {
    const connection = await mysql.createConnection(config);

    const sql = `SELECT t1.\`id\`, t1.\`name\`, t1.time, content, color, reply_id
        FROM discuss AS t1 left JOIN users AS t2 
        ON t1.\`name\` = t2.\`name\`
        WHERE address = ? 
        ORDER BY t1.time DESC;`;
    const [results] = await connection.execute(sql, [address]);
    connection.end();
    return results;
}

/**
 * 添加评论
 * @param {*} name 账号
 * @param {*} content 评论内容
 * @param {*} time 评论时间
 * @param {*} address 评论地址
 */
module.exports.reply = async (name, content, time, address, replyId = null) => {
    const connection = await mysql.createConnection(config);

    const sql = "INSERT INTO `discuss`(`name`, content, time, address, reply_id) VALUES(?, ?, ?, ?, ?);";
    const [results] = await connection.execute(sql, [name, content, time,  address, replyId]);
    connection.end();
    return results;
}

/**
 * 删除评论
 * @param {*} id 数据 id
 */
module.exports.delete = async (id) => {
    const connection = await mysql.createConnection(config);

    const sql = "DELETE FROM discuss WHERE `id` = ?;";
    const [results] = await connection.execute(sql, [id]);
    connection.end();
    return results;
}
/**
 * 获取评论地址分类
 */
module.exports.queryType = async () => {
    const connection = await mysql.createConnection(config);

    const sql = "SELECT DISTINCT address FROM discuss;";
    const [results] = await connection.execute(sql);
    connection.end();
    return results;
}

/**
 * 查找用户邮箱
 */
module.exports.queryMail = async (name) => {
    const connection = await mysql.createConnection(config);

    const sql = "SELECT mail, isReceive FROM users WHERE name = ?;";
    const [results] = await connection.execute(sql, [name]);
    connection.end();
    return results[0];
}