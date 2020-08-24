<template>
  <div id="app">
    <router-view class="leayer view"/>

    <!-- 底部 -->
    <footer>
      <p>Copyright © 2020 <router-link to="/">bozai.tech</router-link> <a href="http://www.beian.miit.gov.cn/">晋ICP备20006880号</a></p>
      <p>Powered by Yubo.Yang</p>
    </footer>
  </div>
  
</template>

<script>
import Axios from 'axios';
import canvas1 from './static/canvas-nest1'
import canvas2 from './static/canvas-nest2'
import util from './util/util'
import bro from './util/browser'

export default {
  name: 'app',
  data () {
    return {
      hits: 0
    }
  },
  created () {
    // 获取 IP 地址
    const ipList = {ip: returnCitySN["cip"], url: returnCitySN["cname"]}

    // 获取当前时间
    const date = new Date();
    const y = date.getFullYear(),
      m = ('0' + (date.getMonth() + 1)).slice(-2),
      d = ('0' + date.getDate()).slice(-2),
      h = date.getHours(),
      f = ('0' + date.getMinutes()).slice(-2),
      s = ('0' + date.getSeconds()).slice(-2);
    // console.log(ipList)

    // 用户所在运行环境
    const browserArr1 = ['微信', 'QQ', 'UC', 'IOS', '移动端', 'PC'];
    const browserArr2 = [bro.isWeiXin(), bro.isQQBrowser(), bro.isUCBrowser(), bro.isIos(), bro.isDeviceMobile(), bro.isPC()];
    const browser = browserArr1[util.getIndex(browserArr2, true)];

    Axios.get(`${this.$store.state.site}/data/addIpList`, {
      params: {
        ip: {
          ip: ipList.ip,
          day: `${y}-${m}-${d}`,
          time: `${h}:${f}:${s}`,
          url: ipList.url,
          browser: browser,
          version: bro.bro(),
        }
      },
    })
  },
}
</script>

<style lang="less">
body, h1, h2, h3, h4, h5, h6, p, ul{
  margin: 0;
}
body, a{
  color: #404040;
}
body{
  font-size: 16px;
}
h1, h2, h3, h4, h5, h6{
  font-weight: lighter;
}
ul{
  list-style: none;
  padding: 0;
}
button{
  border: none;
  outline: none;
}
a{text-decoration: none;}
.fl{float: left;}
.fr{float: right;}
.leayer{
  max-width: 1200px;
  margin: 0 auto;
}
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
footer{
  height: 100px;
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  color: #666;
  line-height: 30px;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  padding-top: 20px;
  a{
    color: #666;
    font-size: 14px;
  }
}
.view{
  padding: 0 10px;
  box-sizing: border-box;
  min-height: calc(100vh - 25vh);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .bg-animet{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: -1;
    // display: none;
  }
}
@media (min-width: 768px) {
  body{
    margin-top: 100px;
  }
}
@media (min-width: 769px) {
  #cn_2{
    display: none;
  }
}
@media (max-width: 768px) {
  #cn_1{
    display: none;
  }
}
</style>
