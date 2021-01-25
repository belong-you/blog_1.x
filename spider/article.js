const mysql = require('mysql2/promise');
const config = require('./power');

// 查询所有文章
module.exports.queryAll = async () => {
    const connection = await mysql.createConnection(config);

    let sql = "SELECT `id`, title, type, look, praise, time FROM articles ORDER BY time DESC;";
    const [results] = await connection.execute(sql);
    connection.end();
    return results;
}

/**
 * 查询文章
 * @param {*} id
 */
module.exports.query = async (id) => {
    const connection = await mysql.createConnection(config);

    let sql = "SELECT * FROM articles WHERE `id` = ?;";
    const [results] = await connection.execute(sql, [id]);
    connection.end();
    return results;
}

// let sql =  "SELECT * FROM articles WHERE time LIKE CONCAT('%', ?, '%') OR type LIKE ? OR title LIKE CONCAT('%', ?, '%');"

/**
 * 添加一篇文章
 * @param {*} title 文章标题
 * @param {*} type 文章类别
 * @param {*} time 创建时间
 * @param {*} content 内容
 */
module.exports.add = async (title, type, time, content) => {
    const connection = await mysql.createConnection(config);

    let sql = "INSERT INTO articles (title, type, time, content) VALUES(?, ?, ?, ?);";
    const [results] = await connection.execute(sql, [title, type, time, content]);
    connection.end();
    return 'Added successfully';
}

// 删除文章
module.exports.delete = async (id) => {
    const connection = await mysql.createConnection(config);

    let sql = "DELETE FROM articles WHERE id = ?;";
    const [results] = await connection.execute(sql, [id]);
    connection.end();
    return 'Deletion succeeded';
}

/**
 * 修改文章
 * @param {*} id
 * @param {*} title 修改文章标题
 * @param {*} type 修改文章类型
 * @param {*} content 修改文章内容
 */
module.exports.revise = async (id, title, type, content) => {
    const connection = await mysql.createConnection(config);

    let sql = "UPDATE articles SET title = ?, type = ?, content = ? WHERE id = ?;";
    const [results] = await connection.execute(sql, [title, type, content, id]);
    connection.end();
    return 'Modification succeeded';
}

/**
 * 增加浏览量，点赞量
 * @param {*} id 文件名
 * @param {*} praise 是否进行点赞，== 1 加 1
 */
module.exports.quantity = async (id, look = 0, praise = 0) => {
    const connection = await mysql.createConnection(config);

    const sql1 = "SELECT `id`, look, praise FROM articles WHERE `id` = ?;";
    const sql2 = "UPDATE articles SET look = ? , praise = ? WHERE id = ?;";
    const [results] = await connection.execute(sql1, [id]);
    
    let qId = await results[0].id, lookNum, praiseNum;

    if (look == 1) lookNum = await ++ results[0].look;
    else lookNum = await results[0].look;

    if (praise == 1) praiseNum = await ++ results[0].praise;
    else if (praise == -1) praiseNum = await -- results[0].praise;
    else praiseNum = await results[0].praise;

    await connection.execute(sql2, [lookNum, praiseNum, qId]);

    connection.end();
    return '+ 1';
}

// 查找所有接受邮箱发送的用户
module.exports.acceptMailNews = async () => {
    const connection = await mysql.createConnection(config);

    const sql = "SELECT * FROM users WHERE isReceive = 1;";
    const [results] = await connection.execute(sql);
    connection.end();
    return results;
}