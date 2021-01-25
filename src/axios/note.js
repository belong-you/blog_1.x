import axios from './intercept';

export default {
    // 获取笔记
    getNoteLabel: () => axios.get('note/label'),

    getNotePage: () => axios({
        method: 'get',
        url: 'note/page',
        
    }),

    // 获取对应的 .md 文件
    getNoteMd: (type, hash) => axios.get(`note/${type}/${hash}`),

}