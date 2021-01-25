import axios from './intercept';

export default {
    // 获取文章
    getArticleList: () => axios.get('article'),

    // 获取单篇文章
    getArticle: (id) => axios.get(`article/${id}`),

    // 文章浏览量 ++
    quantity: (id, look = 0, praise = 0) => axios.put('article', {
        params: {
            id,
            look,
            praise,
        }
    }),

    // 获取友情链接
    getFriendLink: () => axios.get('friendLink'),
}