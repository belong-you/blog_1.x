import React, { Component, createRef } from 'react';
import { Upload, Button, Input, message } from 'antd';
import { uploadImages } from '../../axios/images';
import { ImageList } from './ImageList';

export class ImgUpload extends Component {
    state = {
        show: true
    }

    file: any = createRef();
    render() {
        return (<>
            <input ref={this.file} type="file" multiple name='img' />
            <Button onClick={this.upload}>上传</Button>
            {this.state.show ? <ImageList /> : null}
        </>)
    }

    upload = () => {
        const formData = new FormData();
        for (const prop of this.file.current.files) {
            formData.append('img', prop, prop.name);
        }

        // 请求：上传文件
        uploadImages(formData).then((res: any) => {
            if (res.code === 500) {
                message.error(res.msg);
                return;
            }

            // 重新加载子组件
            this.setState({
                show: false
            }, () => {
                this.setState({show: true})
            })
        })

    }
}