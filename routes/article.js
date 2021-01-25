const express = require("express");
const spiderUtil = require('../spider/article.js');
const {apiHandle} = require('../services/errorCheck');
const {mailDelivery} = require('../services/mailDelivery');

const article = express.Router();

// 获取所有文章
article.get('/', async (req, res) => {
    const data = await spiderUtil.queryAll();
    const result = apiHandle(req, data);
    res.send(result.data);
});

/**
 * 查询文章
 * @param /:id
 */
article.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await spiderUtil.query(id);
    const result = apiHandle(req, data);
    res.send(result.data);
});

/**
 * 添加一篇文章
 * @param ? title 文章标题
 * @param ? type 文章类型
 * @param ? time 文章创建时间，文件名
 */
article.post('/', async (req, res) => {
    const { title, type, time, content } = req.body.params;
    const data = await spiderUtil.add(title, type, time, content);
    const result = apiHandle(req, data);

    const mailUsers = await spiderUtil.acceptMailNews();
    mailUsers.forEach(val => {
        mailDelivery(val.mail, '文章更新提醒', `亲，${val.name}：
        <p style="text-indent: 2em;">您好，我在博客中发布了一篇新的文章——“<b>${title}<b>”，有兴趣就来看看吧。</p>
        <p>链接地址：<a href='http://bozai.tech/dynamic'>http://bozai.tech/dynamic</a></p>`);
    })
    res.send(result.data);
});

/**
 * 删除文章
 * @param /:id 文件名
 */
article.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await spiderUtil.delete(id);
    const result = apiHandle(req, data);
    res.send(result.data);
});

/**
 * 修改文章内容
 * @param /:id 文件名
 */
article.put('/change', async (req, res) => {
    const { id, title, type, content } = req.body.params;
    const data = await spiderUtil.revise(id, title, type, content);
    const result = apiHandle(req, data);
    res.send(result.data);
});

/**
 * 浏览量，点赞量增长
 * @param ? id 文章 id
 * @param ? praise 是否进行点赞，== true 加 1
 */
article.put('/', async (req, res) => {
    const id = req.body.params.id,
        look = req.body.params.look
        praise = req.body.params.praise;

    const data = await spiderUtil.quantity(id, look, praise);
    const result = apiHandle(req, data);
    res.send(result.data);
});

module.exports = article;