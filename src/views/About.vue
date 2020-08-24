<template>
  <div class="about">
    <navigation-bar class="adapt"></navigation-bar>
    <div class="wrap">
      <h2>关 于 我</h2>
      <el-timeline class="time-line">
        <el-timeline-item v-for="(item, index) in abouts" :key="index">
          <p>{{ item.name }}： <a :href="item.link" :target="item.target">{{ item.content }}</a></p>
        </el-timeline-item>
      </el-timeline>
      <h2>关 于 博 客</h2>
      <el-timeline class="time-line">
        <el-timeline-item v-for="(item, index) in blog" :key="index">
          <p>{{ item.name }}： <a :href="item.link" :target="item.target">{{ item.content }}</a></p>
        </el-timeline-item>
        <el-timeline-item><p>访问量： <a>{{ visitNumber }}</a></p></el-timeline-item>
        <el-timeline-item><p>已安全运行： <a>{{ runTime }}</a></p></el-timeline-item>
      </el-timeline>
      <h3>博客更新日志</h3>
      <el-timeline class="time-line">
        <el-timeline-item v-for="(item, index) in journal" :key="index">
          <p>{{ item.time }}： <a :href="item.link" :target="item.target">{{ item.content }}</a></p>
        </el-timeline-item>
      </el-timeline>
    </div>

  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import { setInterval } from 'timers';
import Axios from 'axios';
export default {
  data () {
    return {
      abouts: [
        { name: '职业', content: '前端攻城狮', },
        { name: '就读学校', content: '山西建筑职业技术学院 计算机工程系 数字媒体艺术设计', },
        { name: 'GitHub', content: '@/belong-you', link: 'https://github.com/belong-you', target: '_blank' },
        { name: '技术文章收藏', content: '掘金', link: 'https://juejin.im/user/5d40038c6fb9a06ae3723be3/collections', target: '_blank' },
        { name: 'Gmail', content: '1781926993@qq.com', link: 'mailto:1781926993@qq.com', },
        { name: 'Address', content: '山西 长治', },
        { name: 'WeChat', content: 'weixinvip00000', },
      ],
      blog: [
        { name: '博客地址', content: location.host, link: '/', },
        { name: '上线时间', content: '2020年7月22日' },
        { name: '博客内容', content: '主要包括一些 技术文章、个人笔记、音乐播放(留言板块)等。PC与移动端均可正常浏览' },
        { name: '运用技术', content: '利用 Vue 、 Element-UI 框架搭建静态页面，后端接口由 Node.js 搭建' },
      ],
      journal: [
        { time: '2020.05 ~ 2020.06', content: '搭建博客前端框架' },
        { time: '2020.07 ~ 2020.08', content: '完善后台接口、数据请求' },
      ],
      startTime: new Date('Fri Jul 22 2020 0:00:00 GMT+0800'),
      runTime: 0,
      visitNumber: 0
    }
  },
  created () {
    Axios.get(`${this.$store.state.site}/data/ipList`).then(res => {
      this.visitNumber = res.data.length
    });
    setInterval(() => {
      let endTime = new Date().getTime();
      let time = (endTime - this.startTime) / 1000;
      let s = ('0' + Math.floor(time % 60)).slice(-2),
          m = ('0' + Math.floor(time / 60 % 60)).slice(-2),
          h = Math.floor(time / 60 / 60 % 24),
          t = Math.floor(time / 60 / 60 / 24);
      this.runTime = t + '天' + h + '小时' + m + '分' + s + '秒';
    }, 1000);
  },
  components: {
    NavigationBar
  }
}
</script>

<style lang="less">
.about{
  .wrap, .time-line{
    margin: 20px 0;
  }
  .time-line{
    font-size: 16px;
    a{
      color: #10ac8d;
    }
  }

}
</style>
