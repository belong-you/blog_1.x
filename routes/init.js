const express = require("express");
const { getErr } = require('../services/errorCheck');
const { apiLogger } = require('../services/logger');
const { getCookies, setCookies } = require('../services/cookies');
const api = express.Router();

api.use('/',
    async (req, res, next) => {
        // 设置请求头
        res.header("Access-Control-Allow-Origin", "http://192.168.1.80:8080");  // 接受哪个域名的请求
        res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");  // 允许哪种请求方式
        res.header("Access-Control-Allow-Credentials", true);  // 允许发送 cookie
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Max-Age', 86400);  // 一天内不再询问
        res.header('content-type:application/json');
        next();
    },

    // 日志记录
    // async (req, res, next) => {
    //     await apiLogger.info(`${req.method} ${req.path} ${JSON.stringify(req.body)}`);
    //     next();
    // },

    // async (req, res, next) => {
    //     // 给非 get 请求添加权限
    //     if (req.method !== 'GET') {
    //         const { origin, cookie } = req.headers;  // 访问地址, cookie

    //         // 设置 cookie
    //         setCookies(res, 'authority', {authority: origin});
            
    //         // 获取 cookie
    //         const { authority } = getCookies(cookie, 'authority');
    //         // console.log(authority, origin)
    //         if (authority !== origin) {
    //             res.send(getErr('请求权限错误', 401));
    //             return;
    //         }
    //     }
    //     next();
    // },
    
);

module.exports = api;