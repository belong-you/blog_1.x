const express = require("express");
const spiderUtil = require('../spider/visitNum.js');
const {apiHandle} = require('../services/errorCheck');
const visitNum = express.Router();

visitNum.put('/', async (req, res) => {
    console.log(req.query)
    const data = await spiderUtil.add()
    const result = apiHandle(req, data);
    res.send(result.data);
})

module.exports = visitNum;