import axios from './intercept';

/**
 * 上传图片
 */
export const uploadImages = (data: any) => axios({
    url: 'images',
    method: 'post',
    data,
});

export const getImages = () => axios.get('images');

export const delImages = (name: string) => axios.delete('images', {
    params: {
        name
    }
});