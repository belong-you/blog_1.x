const path = require('path');
const { File } = require('./readFile');

// 获取一个文件夹下文件内容的字节数之和
module.exports.readImg = async function (req) {
    const readFilename = await path.resolve(__dirname, '../../public/images');
    const file = await File.getFile(readFilename);
    const imgArr = await file.readDir(readFilename);
    const newArr = [];

    imgArr.forEach(val => {
        newArr.push(val.name);
    })

    return newArr;
}
