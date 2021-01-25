const mysql = require('mysql2/promise');
const config = require('./power');

exports.add = async () => {
    const connection = await mysql.createConnection(config);

    const sql1 = "SELECT number FROM visit_num;";
    const sql2 = "UPDATE visit_num SET number = ? WHERE id = 1;";
    const [results1] = await connection.execute(sql1);
    
    let number = ++ results1[0].number;
    await connection.execute(sql2, [number]);
    connection.end();
    return {number};
}

