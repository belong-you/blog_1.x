import axios from './intercept';

export default {
    // 获取歌曲列表
    getAudioList: () => axios.get('audio'),

}