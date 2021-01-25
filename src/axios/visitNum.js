import axios from './intercept';

export default {
    // 获取歌曲列表
    getVisitNum: () => axios.put('visitNum'),

}