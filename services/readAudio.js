const path = require('path');
const spiderUtil = require('../spider/audio');
const { File } = require('./readFile');

// 获取一个文件夹下文件内容的字节数之和
module.exports.readAudio = async function () {
    const readFilename = await path.resolve(__dirname, '../', 'audio');
    const file = await File.getFile(readFilename);
    const audioArr = await file.readDir(readFilename);
    audioArr.forEach((val) => {
        const arr = val.name.split('_');
        const author = arr[1].slice(0, -4);
        spiderUtil.writeAudio(arr[0], 'http://bozai.tech/audio/' + val.name, author);
    });
}
