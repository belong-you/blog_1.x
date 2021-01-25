const express = require("express");
const path = require('path');
const fs = require('fs');
const cache = require("../services/cache");

const webNote = express.Router();
const overdue = 60 * 10;  // 过期时间

// 获取笔记列表
// webNote.get('/label', async (req, res) => {
//     await res.sendFile(path.join(__dirname, '../../md/noteLabel.json'));
// });
// webNote.get('/page', async (req, res) => {
//     await res.sendFile(path.join(__dirname, '../../', 'md/notePage.json'));
// });

// webNote.get('/:id/:id', async (req, res) => {
//     const arr = req.originalUrl.split('/');
//     // 找对应的文件
//     await res.sendFile(path.join(__dirname, '../../', `md/${arr[arr.length-2]}/${arr[arr.length-1]}.md`));
// });

// 获取笔记列表
webNote.get("/label", cache({ ttl: overdue }), async (req, res) => {
    // console.log(req.originalUrl, "没有使用缓存");
    // 从数据库中取出对应id的新闻数据
    
    const data = await readFile(path.join(__dirname, '../../md/noteLabel.json'));
	res.send(data);
});
webNote.get("/page", cache({ ttl: overdue }), async (req, res) => {
    const data = await readFile(path.join(__dirname, '../../md/notePage.json'));
	res.send(data);
});

// 获取对应的笔记
webNote.get("/:id/:id", cache({ ttl: overdue }), async (req, res) => {
    const arr = req.originalUrl.split('/');
    const data = await readFile(path.join(__dirname, `../../md/${arr[arr.length-2]}/${arr[arr.length-1]}.md`));
	res.send({text: data});
});

module.exports = webNote;

async function readFile (filename) {
    return await fs.promises.readFile(filename, 'utf-8');
}