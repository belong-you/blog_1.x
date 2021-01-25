const mysql = require('mysql2/promise');
const config = require('./power');

// 写入歌曲列表
module.exports.writeAudio = async (name, link, author) => {
    const connection = await mysql.createConnection(config);

    let sql = "INSERT INTO audio_list (`name`, link, author) VALUES(?, ?, ?);";
    const [results] = await connection.execute(sql, [name, link, author]);
    connection.end();
    return results;
}

// 获取所有歌曲
module.exports.queryAll = async () => {
    const connection = await mysql.createConnection(config);

    let sql = "SELECT * FROM audio_list;";
    const [results] = await connection.execute(sql);
    connection.end();
    return results;
}