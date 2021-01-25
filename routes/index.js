const express = require("express");
const bodyParse = require('body-parser');
const path = require('path');

const app = new express();

// 静态页面
app.use(express.static("../public"));  // 静态文件，img、audio
app.use(express.static("../dist"));  // 博客站点
app.use(express.static("../vise"));  // 后台管理

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : true}));

// 数据请求接口
const basic = '/api';
app.use(`${basic}`, require('./init.js'));
app.use(`${basic}/article`, require('./article.js'));
app.use(`${basic}/note`, require('./webNote.js'));
app.use(`${basic}/users`, require('./users.js'));
app.use(`${basic}/discuss`, require('./discuss.js'));
app.use(`${basic}/audio`, require('./audio.js'));
app.use(`${basic}/images`, require('./images.js'));
app.use(`${basic}/friendLink`, (require('./friendLink.js')));
app.use(`${basic}/visitNum`, (require('./visitNum.js')));

app.use('/vise', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../', 'vise/index.html'));
})
app.use('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../', 'dist/index.html'));
})

// 开启服务
app.listen(3000, () => {
    console.log('服务已启动...');
});