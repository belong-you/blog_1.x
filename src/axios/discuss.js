import axios from './intercept';

export default {
    // 按类型获取评论
    getDiscuss: (type) => axios.get(`discuss/${type}`),

    // 添加评论
    addDiscuss: (content, time, address, replyId) => axios.post('discuss', {
        params: {
            content,
            time,
            address,
            replyId
        }
    }),

    /**
     * 发送邮件告知
     */
    sendMail: (name, content, href) => axios.post('discuss/sendMail', {
        params: {
            name,
            content,
            href,
        }
    }),
}