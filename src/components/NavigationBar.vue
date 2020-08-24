<template>
  <nav class="navigation">
    <div class="box">
      <div class="picture">
        <img src="../assets/picture.jpg" alt="Yubo.Yang_的个人头像">
      </div>
      <div class="text">
        <h1 @click="jump">belong-you</h1>
        <p>鹏北海，凤朝阳。又携键盘两茫茫。</p>
      </div>
    </div>
    <div class="link">
      <router-link to="/home">首页</router-link>
      <router-link to="/dynamic">动态</router-link>
      <router-link to="/note">笔记</router-link>
      <router-link to="/stay">留言</router-link>
      <router-link to="/about">关于</router-link>
    </div>
    <div class="news">
      <ul>
        <li
          v-for="(item, index) in links" 
          :key="index"
        ><a :href="host + '/article/' + item.link">{{ item.title }}</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      host: 'http://' + location.host,
      scrollTop: 0,
      links: [
        { title: '前端必须要了解的那些 Linux 命令', link: '2020-07-21' },
        { title: '浅谈 事件循环机制', link: '2020-07-14' },
        { title: 'Vue 的生命周期',link: '2020-07-13' },
        { title: '比较实用的一些工具函数',link: '2020-07-12' }
      ]
    }
  },
  beforeCreate () {
    window.onscroll = () => {
      if (window.innerWidth > 768) {
        this.scrollTop = document.documentElement.scrollTop + 'px';
      }
    }
  },
  methods: {
    jump () {
      location.pathname = '/'
    },
  },
}
</script>

<style lang="less">
.navigation{
  width: 340px;
  .box{
    display: flex;
  }
  .picture, text {
    vertical-align: middle;
  }
  .picture{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 4px solid #76b1fd;
    overflow: hidden;
    cursor: pointer;
    img{
      width: 100%;
    }
  }
  .text {
    margin-left: .6rem;
    h1{
      font-size: 24px;
      line-height: 40px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      &::after, &::before{
        content: '';
        position: absolute;
        width: 65%;
        height: 2px;
        background: black;
        animation: ani 1.2s;
      }
      &::before{
        top: 0;
        right: 0;
      }
      &::after{
        bottom: 0;
        left: 0;
      }
      @keyframes ani {
        0% {
          width: 0;
        }
        100%{
          width: 65%;
        }
      }
    }
    p{
      color: #999;
      line-height: 20px;
      margin-top: 10px;
    }
  }
  .box{
    padding: 6px 0;
    border-bottom: 1px solid;
  }
  .link{
    text-align: center;
    line-height: 34px;
    display: flex;
    justify-content: space-between;
    a{
      padding: 2px 10px;
      &.router-link-active{
        color: #e9a475;
      }
    }
  }
  .news{
    display: none;
    a{
      color: #267ef1;
    }
  }
}
@media (min-width: 540px) {
  .adapt {
    width: 100%;
    height: 82px;
    position: relative;
    z-index: 999;
    .box, .link, .news{
      position: absolute;
    }
    .box{
      left: 0;
      border-bottom: none;
    }
    .link, .news{
      right: 0;
    }
    .link{
      margin-top: 10px;
      display: flex;
      a{
        padding: 0 14px;
        font-size: 18px;
      }
    }
  }
}
@media (max-width: 540px) {
  .navigation.adapt{
    .box{
      display: none;
    }
    .link{
      border-bottom: 1px solid #ccc;
    }
  }
}
@media (min-width: 768px) {
  .adapt{
    max-width: 1180px;
    position: fixed;
    top: 0;
    background-color: rgba(255, 255, 255, .4);
    backdrop-filter: saturate(180%) blur(2px);
    .link a{
      padding: 0 30px;
      font-size: 18px;
    }
    .news{
      display: block;
      top: 44px;
      margin-top: 9px;
      color: #8995ff;
      text-align: right;
      height: 20px;
      overflow: hidden;
      li{
        max-width: 400px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      ul{
        animation: change 15s steps(1, end) infinite;

      }
    }
    @keyframes change {
      0%{
        transform: translateY(0);
      }
      25%{
        transform: translateY(-21px);
      }
      50%{
        transform: translateY(-42px);
      }
      75%{
        transform: translateY(-63px);
      }
    }
  } 
}
</style>