import React, { Component } from 'react';
import { getImages, delImages } from '../../axios/images';
import { copyTextToClipboard } from '../../util/ts/browser';
import './imageList.scss';
import { Modal, message } from 'antd';
const confirm = Modal.confirm;

export class ImageList extends Component {
    state = {
        imgList: []
    }
    
    async componentDidMount () {
        const data = await getImages();
        this.setState({
            imgList: data
        })
    }

    initData () {
        const arr: object[] = [];
        this.state.imgList.forEach((val: any, index) => {
            arr.push(<li key={index}>
                <img src={val.url} alt="" onClick={() => {
                    this.open(val.url)
                }} />
                <p>{val.name} <span className='copy' onClick={() => {
                    copyTextToClipboard(val.url);
                    message.info('已复制图片地址')
                }}>Copy</span></p>
                <del className="delete" onClick={() => {
                    this.del(val.name)
                }}>del</del>
            </li>)
        })
        return arr;
    }

    render () {
        return (<ul className='image-list'>
            {this.initData()}
        </ul>)
    }

    open (src: string) {
        console.log(src)
    }

    // 删除图片
    del (name: string) {
        const self = this;
        confirm({
            title: '提示',
            content: '确认删除该图片？',
            async onOk () {
                await delImages(name).then(res => {
                    message.info(res);
                    self.componentDidMount()
                })
            },
            onCancel() {},
        });
    }
}