const express = require("express");
const spiderUtil = require('../spider/users.js');
const { mailDelivery } = require('../services/mailDelivery');
const { apiHandle } = require('../services/errorCheck');
const { setCookies } = require('../services/cookies')

const users = express.Router();

// 获取所有用户
users.put('/', async (req, res) => {
    const data = await spiderUtil.queryAll();
    const result = apiHandle(req, data);
    res.send(result.data);
})

// 注册
users.post('/', async (req, res) => {
    const { name, pwd, mail, time, isReceive, color } = req.body.params;
    // 账号或邮箱是否已经被注册
    if (await spiderUtil.isExist(name) || await spiderUtil.isExist(mail)) {
        res.status = 400;
        res.send('该账号或邮箱已被注册');
        return;
    }

    const data = await spiderUtil.add(name, pwd, mail, time, isReceive, color);

    // 发送邮箱
    mailDelivery(mail, `亲爱的 ${name} 用户，您好`, '您申请的账号已注册成功，感谢您的关注！');
    const result = apiHandle(req, data);
    res.send(result.data);
    // res.send('注册成功');
})

// 发送邮箱验证码
users.put('/mailCheck', async (req, res) => {
    const { mail, checkNum } = req.body.params;
    const html = `<div style="padding:50px 0;margin:0 30px;font-size:13px;border-bottom:1px solid #ebebeb;">
        <h3 style="font-size:15px;">亲爱的用户：</h3>
        您正在验证身份，验证码是：
        <b style="font-size:20px;color:#40caba;margin-bottom:10px;display:block;margin-top:10px;">${checkNum}</b>
        ，5分钟内有效，请将该验证码回填到验证页面，完成身份验证。</div>`
    mailDelivery(mail, '账号验证身份', html);
    res.send();
})

// 登录
users.get('/signIn', async (req, res) => {
    const { name, pwd } = req.query;
    
    const data = await spiderUtil.signIn(name, pwd);
    
    // 验证成功后设置 cookie
    if (data === 200) {
        // 设置cookie
        setCookies(res, 'user', {name, pwd});
        res.send("登录成功");
    } else if (data === 403) {
        const result = apiHandle(req, data);
        res.send('账号或密码错误');
    } else if (data === 404) {
        const result = apiHandle(req, data);
        res.send('该账号还未注册呦');
    }
})

// 登出
users.get('/signUp', async (req, res) => {
    setCookies(res, 'user', {name: 'sign out'}, -1);
    res.send('登出');
})

// 修改账户
users.put('/reset', async (req, res) => {
    const { mail, name, pwd, isReceive } = req.body.params;

    const data = await spiderUtil.resetUser(mail, name, pwd, isReceive);
    const result = apiHandle(req, data);
    res.send(result.data);
})

users.put('/isNews', async (req, res) => {
    const { id, num } = req.body.params;
    const data = await spiderUtil.isNews(id, num);
    const result = apiHandle(req, data);
    res.send(result.data);
})

users.post('/admin', async (req, res) => {
    const { name, pwd } = req.body.params;
    
    // console.log(name, pwd)
    const data = await spiderUtil.adminSignIn(name, pwd);
    
    // 验证成功后设置 cookie
    if (data === 200) {
        setCookies(res, 'admin', {name, pwd}, 1000 * 3600 * 24, '/vise');
        res.send("登录成功");
    } else if (data === 403) {
        const result = apiHandle(req, data);
        res.send('账号或密码错误');
    } else if (data === 404) {
        const result = apiHandle(req, data);
        res.send('该账不是管理员呦');
    }
})

module.exports = users;