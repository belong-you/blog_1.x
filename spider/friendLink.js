const mysql = require('mysql2/promise');
const config = require('./power');

module.exports.query = async () => {
    const connection = await mysql.createConnection(config);

    const sql = "SELECT * FROM friend_link;";
    const [results] = await connection.execute(sql);
    connection.end();
    return results;
}

module.exports.revise = async (id, name, link, marks = null) => {
    const connection = await mysql.createConnection(config);

    const sql = "UPDATE friend_link SET name = ?, link = ?, marks = ? WHERE id = ?;";
    const [results] = await connection.execute(sql, [name, link, marks, id]);
    connection.end();
    return 'bingo';
}

module.exports.add = async (name, link, marks = null) => {
    const connection = await mysql.createConnection(config);

    const sql = "INSERT INTO friend_link (name, link, marks) VALUES(?, ?, ?);";
    const [results] = await connection.execute(sql, [name, link, marks]);
    connection.end();
    return results;
}
    
// 修改是否接受消息推送
module.exports.delete = async (id) => {
    const connection = await mysql.createConnection(config);

    const sql = "DELETE FROM friend_link WHERE `id` = ?;";
    const [results] = await connection.execute(sql, [id]);
    connection.end();
    return '删除成功';
}
    