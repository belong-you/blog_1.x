const express = require("express");
const path = require('path');
const spiderUtil = require('../spider/audio.js');
const {readAudio} = require('../services/readAudio');
const {apiHandle} = require('../services/errorCheck');

const audio = express.Router();

// 获取歌曲列表
audio.get('/', async (req, res) => {
    const data = await spiderUtil.queryAll();
    const result = apiHandle(req, data);
    res.send(result.data);
})

audio.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.sendFile(path.join(__dirname, '../../', `audio/${id}`));
})

// 写入歌曲
audio.post('/', async (req, res) => {
    readAudio();
    res.send('写入成功')
})

module.exports = audio;