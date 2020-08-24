<template>
  <div class="web-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/note' }">笔记标签</el-breadcrumb-item>
      <el-breadcrumb-item>

        <!-- 下拉菜单 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ tag }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in options" :key="index">
              <a :href="'/note/webPage/' + item" style="display: block;">{{ item }}</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-breadcrumb-item>

      <el-breadcrumb-item>{{ activeName }}</el-breadcrumb-item>

    </el-breadcrumb>

    <!-- 选项卡 -->
    <el-tabs v-model="activeName" :tab-position="offsetW > 768 ? 'left' : 'top'" @tab-click="handleClick">
      <el-tab-pane 
        v-for="(item, index) in note[tag]"
        :key="index"
        :label="item.hash + ' ' + item.name" 
        :name="item.hash"
        v-html="html"
      ></el-tab-pane>

      <!-- 说明 -->
      <div class="explain">
        <p>说明：以上均属个人学习笔记，仅供参考，具体以开发文档为准！</p>
      </div>

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

    </el-tabs>
  </div>
</template>

<script>
import util from '@/util/util'
import axios from 'axios'

export default {
  data () {
    return {
      offsetW: document.body.offsetWidth,  // 视口宽
      hash: location.hash.slice(1),  // url hash
      tag: location.pathname.split('/')[3],  // 标签
      activeName: '',
      html: '',  // 转义后的html结构
      options: [],  // 下拉菜单
      href: location.href,
      note: {},
      showReward: false,  // 是否显示打赏二维码
    }
  },
  created () {
    axios.get(`${this.$store.state.site}/data/note`, {
      timeout: 1000
    }).then(res => {
      this.note = res.data;

      // 判断数据中有没有相应的数据
      if (this.note[this.tag] === undefined) {
        document.title = 'belong-you | 个人笔记';
        this.$notify({
          message: '该笔记还没有上传呦...',
        });
        return;
      }

      this.activeName = this.hash || this.note[this.tag][0].hash;
      this.getText();
      this.options = Object.keys(this.note);  // 下拉菜单
    }, err => {
      console.warn('内部错误');
    })
  },
  methods: {
    // 列表切换
    handleClick(tab, event) {
      location.hash = tab.name;
      // window.scrollTo(0, 0);  // 回到顶部
      this.getText();  // 重新发送请求
    },
    // 发送请求获取文本
    getText () {
      document.title = '个人笔记 | ' + this.tag;  // 设置 title 值
      axios.get(`${this.$store.state.site}/md/${this.tag}/${this.activeName}.md`,{
        timeout: 1000
      }).then(res => {
        let str = res.data;
        // console.log(str)
        this.html = util.interpretMd(str);
      }, err => {
        this.html = '';  // 请求不到让内容为空
        this.$notify({
          message: '该笔记还没有上传呦...',
        });
        console.warn('加载错误!');
      });
    },
  }
}
</script>

<style lang="less">
@import url('../util/markdown');
.web-page{
  margin-top: 20px;
  .el-tabs--left .el-tabs__item.is-left{
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .el-breadcrumb{
    margin: 10px 0;
    font-size: 16px;
  }
  .el-dropdown{
    font-size: 16px;
  }
  .el-tabs__header.is-left{
    width: 160px;
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
  .explain{
    margin-top: 20px;
    font-size: 14px;
    color: #999;
  }
}

</style>