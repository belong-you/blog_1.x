const fs = require('fs');
const path = require('path');

module.exports.File = class File {
    constructor (filename, name, ext, isFile, size, createTime, updataTime) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updataTime = updataTime
    }

    // 获取文件内容
    async getContent (isBuffer = false) {
        if (this.isFile) {
            if (isBuffer) {
                return await fs.promises.readFile(this.filename);
            } else {
                return await fs.promises.readFile(this.filename, 'utf-8');
            }
        } else {
            return null;
        }
    }

    // 获取文件夹下的文件所有属性，返回一个数组
    async getChildren () {
        if (this.isFile) {
            return [];
        }
        let children = await fs.promises.readdir(this.filename);
        children = children.map(name => {
            const result = path.resolve(this.filename, name);
            return File.getFile(result);
        });
        return Promise.all(children);
    }
    
    // 获取文件属性
    static async getFile(filename) {
        const stat = await fs.promises.stat(filename);
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = stat.birthtime;
        const updataTime = stat.mtime;

        return new File(filename, name, ext, isFile, size, createTime, updataTime);
    }

    async readDir (dirname) {
        const file = await File.getFile(dirname);
        return await file.getChildren();
    }
}