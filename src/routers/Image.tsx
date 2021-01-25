import React, { Component } from 'react';
import { Common } from '../Component/common/RunPage';
import { ImgUpload } from '../Component/image/Upload';

export default class Image extends Component {
    
    render () {
        return (<>
            <Common children={{
                list: [
                    {name: '图片管理', comp: <ImgUpload />},
                ],
            }} />
            
        </>)
    }
}