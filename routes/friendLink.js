const express = require("express");
const spiderUtil = require('../spider/friendLink.js');
const {apiHandle} = require('../services/errorCheck');
const friendLink = express.Router();

// 获取友链数据
friendLink.get('/', async (req, res) => {
    const data = await spiderUtil.query();
    const result = apiHandle(req, data);
    res.send(result.data);
})

// 修改友链数据
friendLink.post('/', async (req, res) => {
    const {id, name, link, marks} = req.body.params;
    console.log(id, name, link, marks)
    const data = await spiderUtil.revise(id, name, link, marks);
    const result = apiHandle(req, data);
    res.send(result.data);
})

// 增加友链
friendLink.put('/', async (req, res) => {
    const {name, link, marks} = req.body.params;
    const data = await spiderUtil.add(name, link, marks);
    const result = apiHandle(req, data);
    res.send(result.data);
})

// 删除友情链接
friendLink.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await spiderUtil.delete(id);
    const result = apiHandle(req, data);
    res.send(result.id)
})

module.exports = friendLink;