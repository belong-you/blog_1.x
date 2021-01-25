const express = require("express");
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { readImg } = require('../services/readImg');
const { apiHandle, getErr } = require('../services/errorCheck');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images'));  // 配置存储路径
    },
    filename: (req, file, cb) => {
        // 生成文件名（时间戳_随机字符.ext）
        const timeStamp = Date.now();
        const randomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname);
        const fileName = `${timeStamp}_${randomStr}${ext}`;
        cb(null, fileName);
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 ** 2 * 2
    },
    fileFilter (req, file, cb) {
        const extName = path.extname(file.originalname);
        const whiteList = ['.jpg', '.jpeg', '.png', '.gif'];
        if (whiteList.includes(extName)) {
            cb(null, true);
        } else {
            cb(`不支持 ${extName} 类型文件`, false);
        }
    }
})

const images = express.Router();

// 获取所有图片
images.get('/', async (req, res) => {
    const host = req.headers.host, arr = [];
    const data = await readImg();
    data.forEach(val => {
        arr.push({
            url: 'http://bozai.tech/images/' +  val,
            name: val,
        });
    })
    
    const result = apiHandle(req, arr);
    res.send(result.data);
})

// 上传图片
images.post('/',

    async (req, res, next) => {
        const check = upload.array('img', 10);
        // 查错
        check (req, res, err => {
            if (err instanceof multer.MulterError) res.send(getErr('您上传的文件超过 2MB，亲！'));
            else if (err) res.send(getErr(err));
            else next();
        })
    },
    
    async (req, res) => {
        const urls = [];
        req.files.forEach(val => {
            urls.push(`/images/${val.filename}`);
        })
        res.send(apiHandle(req, urls));
    },
)

// 删除图片
images.delete('/', async (req, res) => {
    const { name } = req.query;
    // console.log(path.resolve(__dirname, `../../public/images/${name}`))
    fs.unlinkSync(path.resolve(__dirname, `../../public/images/${name}`));
    res.send('Delete Success')
})

module.exports = images;