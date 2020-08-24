<template>
  <section class="article">
    <navigation-bar class="adapt"></navigation-bar>
    <div class="wrap">
      <ul class="right" :style="{'top': scrollTop}"></ul>
      <div class="left">
        <div v-html="render"></div>
        <hr>

        <!-- 浏览量 -->
        <ul class="browse">
          <li>
            <span><i class="el-icon-view"></i>&nbsp;{{ readingVolume }}</span>
            <span class="praise" :class="[flag === false ? 'active' : '']"><i class="el-icon-cold-drink" @click="praiseClick"></i>&nbsp;{{ praise }}</span>
          </li>
          <li class="share" @click="copyLink"><i class="el-icon-share"></i>&nbsp;分享</li>
        </ul>

        <!-- 打赏 -->
        <div class="reward">
          <el-button type="primary" @click="showReward = !showReward">打赏</el-button>

          <el-collapse-transition>
            <div v-show="showReward"  class="wrapper">
              <span>
                <img src="../assets/wx.png" alt="">
                <p>微信支付</p>
              </span>
              <span>
                <img src="../assets/zfb.jpg" alt="">
                <p>支付宝</p>
              </span>
            </div>
          </el-collapse-transition>
        </div>

        <!-- 版权 -->
        <div class="explain">
          <p>作者：belong-you <router-link to="/about">（联系作者）</router-link></p>
          <p>版权说明：自由转载-非商用-非衍生-保持署名</p>
        </div>
      
        <artivle-discuss :value="pathname"></artivle-discuss>
      
      </div>

    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '@/components/NavigationBar'
import ArtivleDiscuss from '@/components/ArtivleDiscuss'
import util from '@/util/util'
import Axios from 'axios'

export default {
  components: {
    NavigationBar,
    ArtivleDiscuss
  },
  data () {
    return {
      scrollTop: 0,
      pathname: location.pathname.slice(-10),
      number: location.pathname.slice(-10).replace(/-/g, ''),
      render: '',  // 要渲染的文章
      getIdList: [],  // 获取所有 h 标签的 id 属性
      showReward: false,  // 是否显示打赏二维码
      readingVolume: 0,  // 浏览量
      praise: 0, // 点赞数
      dynamicData: {},  // 要发送的数据
      flag: true,  // 为 false 时取消点赞
    }
  },
  methods: {
    copyLink () {
      util.copyTextToClipboard(location.href);
      this.$message.success('链接地址已复制到剪贴板');
    },
    sendingRequest () {
      Axios.get(`${this.$store.state.site}/data/dynamic/change`, {
        params: {
          data: this.dynamicData
        }
      })
    },
    praiseClick () {
      const key = location.pathname.slice(-10);
      this.flag ? this.praise ++ : this.praise --;
      this.dynamicData[key].praise = this.praise;
      this.sendingRequest();
      this.flag = !this.flag;
    }
  },
  created () {
    Axios.all([
      Axios.get(`${this.$store.state.site}/md/news/${this.number}.md`),  // 获取文章
      Axios.get(`${this.$store.state.site}/data/dynamic`),
    ]).then(Axios.spread((mdRes, dynamicRes) => {
      const str = mdRes.data, md = util.interpretMd(str);
      this.render = md;
      this.getIdList = md.match(/id='\d{0,1000}/g);  // 查找 id 属性

      const dynamicTag = location.pathname.slice(-10);
      document.title = dynamicRes.data[dynamicTag].title;
      this.readingVolume = ++ dynamicRes.data[dynamicTag].readingVolume;
      this.praise = dynamicRes.data[dynamicTag].praise;

      this.dynamicData = dynamicRes.data;
      this.sendingRequest();
    }));

    document.onscroll = () => {
      let num = document.documentElement.scrollTop;
      if (num > 60) {
        this.scrollTop = num + 'px';
      } else {
        this.scrollTop = 0;
      }
    }

  },
  updated () {
    let textList = [];
    this.getIdList.forEach((item, i) => {
      item = item.match(/\d/g).join('');
      textList.push(`<li><a href='#${item}'>${document.getElementById(item).innerText}</a></li>`);
    })
    document.getElementsByClassName('right')[0].innerHTML = textList.join('');
  },
}
</script>

<style lang="less">
@import url('../util/markdown');
.article{
  .wrap{
    box-sizing: border-box;
    width: 100%;
    margin-top: 30px;
    position: relative;
    .right{
      position: absolute;
      right: 0;
      width: 260px;
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 5px;
      max-height: 80vh;
      overflow-y: scroll;
      &::-webkit-scrollbar{
        width: 4px;
      }
      &::-webkit-scrollbar-thumb{
        background: rgba(0,0,0,.1);
      }
      li{
        line-height: 32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .left{
      box-sizing: border-box;
      padding-right: 320px;
      width: 100%;
    }
  }
  hr{
    border: none;
    border-bottom: 1px dashed #ddd;
    margin-top: 20px;
  }
  .reward{
    margin-top: 20px;
    text-align: center;
    .wrapper{
      max-width: 540px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
    }
    img{
      max-height: 160px;
    }
  }
  .browse{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #999;
    span{
      margin-right: 20px;
    }
    .share, .praise{
      cursor: pointer;
    }
    .praise.active{
      color: #409EFF;
    }
  }
  .explain{
    margin-top: 20px;
    font-size: 14px;
    color: #999;
    a{
      color: #409EFF;
    }
  }
}
@media (max-width: 1200px) {
  .article .wrap {
    .left{
      padding-right: 0;
    }
    .right{
      display: none;
    }
  }
}
</style>