const express = require("express");
const spiderUtil = require('../spider/discuss.js');
const {apiHandle, getErr} = require('../services/errorCheck');
const {publish, verify} = require('../services/jwt');
const { getCookies } = require('../services/cookies');
const { mailDelivery } = require('../services/mailDelivery')
const discuss = express.Router();

/**
 * 获取评论地址分类
 */
discuss.get('/type', async (req, res) => {
    const data = await spiderUtil.queryType();
    const result = apiHandle(req, data);
    res.send(result.data);
})

/**
 * 根据评论地址查询评论内容
 * @param /:id 评论地址
 */
discuss.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await spiderUtil.query(id);
    const result = apiHandle(req, data);
    res.send(result.data);
})


/**
 * 用户回复评论
 */
discuss.post('/',
    async (req, res, next) => {
        const { name } = getCookies(req.headers.cookie, 'user');
        // console.log(name)
        if (name === 'JsonWebTokenError') {
            res.send(getErr('Not logged in', 401))
        }
        next();
    },
    async (req, res) => {
        const {content, time, address, replyId} = req.body.params;
        // const { name } = verify(userJwt);
        const { name } = getCookies(req.headers.cookie, 'user');
        // console.log(name, content, time, address, replyId)

        const data = await spiderUtil.reply(name, content, time, address, replyId);
        const result = apiHandle(req, data);
        res.send(result.data);
    }
)

/**
 * 删除评论
 * @param /:id 数据 id
 */
discuss.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await spiderUtil.delete(id);
    const result = apiHandle(req, data);
    res.send(result.data);
})

/**
 * 发送邮件告知
 */
discuss.post('/sendMail', async (req, res) => {
    const { name, content, href } = req.body.params;
    
    const data = await spiderUtil.queryMail(name);
    if (data.isReceive == 0) {  // 对方不接受消息
        res.send(getErr('对方不接受消息', 202))
        return;
    }

    // 获取 cookie 看是谁这么大胆儿
    const {name: who} = getCookies(req.headers.cookie, 'user');
    console.log(who, data.mail);

    // 发送邮件
    mailDelivery(data.mail, '评论回复', `<p style="text-indent: 2em;">${name}：您好，${who}在评论区回复了您</p>
    <p>评论内容：<b>${content}</b></p>
    <p>链接地址：<a href="${href}">${href}</a></p>`);

    const result = apiHandle(req, data);
    res.send('Has been sent');
})


module.exports = discuss;