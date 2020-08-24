<template>
  <div class="dynamic clearfix">
    <navigation-bar class="adapt"></navigation-bar>
    <div class="wrapper-left fl">

      <!-- 动态文章 -->
      <ul class="dynamic-wrap">
        <li class="border" v-for="(item, key, index,) in dynamic" :key="key">
            <h2>
              <router-link :to="'article/'+ Object.keys(dynamic)[index]">{{ item.title }}</router-link>
            </h2>
            <p class="timer">
              <i class="el-icon-time"></i>&nbsp;
              {{ Object.keys(dynamic)[index] }}&nbsp;
              <button 
                :style="{background: colors[getIndex(types, item.type)]}"
              >{{ item.type }}</button>&nbsp;
              <i class="el-icon-view"></i>&nbsp;
              {{ item.readingVolume }}&nbsp;
              <i class="el-icon-cold-drink"></i>&nbsp;
              {{ item.praise }}
            </p>
        </li>
      </ul>
    </div>
    <div class="wrapper-right fr">

      <!-- 关于我 -->
      <div class="about border">
        <h3 class="title"><i class="el-icon-user"></i>&nbsp;关于我</h3>
        <div class="content">
          <p>职业：<a>前端工程师</a></p>
          <p>GitHub：<a href="https://github.com/belong-you" target="_blank">@/belong-you</a></p>
          <p>技术文章收藏：<a href="https://juejin.im/user/1996368847835037/collections" target="_blank">掘金</a></p>
          <p>Gmail：<a href="mailto:1781926993@qq.com">1781926993@qq.com</a></p>
          <p>Address：<a>山西 长治</a></p>
          <p>WeChat：<a>weixinvip00000</a></p>
        </div>
      </div>

      <!-- 推荐列表 -->
      <div class="recommend border">
        <h3><i class='el-icon-notebook-2'></i>&nbsp;推荐列表</h3>
        <ul class="list">
          <li v-for="(item, index) in recommends" :key="index">
            <i>{{ index + 1 }}</i>&nbsp;
            <router-link :to="'/article/' + item[0]">{{ item[1].title }}</router-link>
          </li>
        </ul>
      </div>

      <!-- 友链 -->
      <div class="friend-link border">
        <h3><i class="el-icon-link"></i>&nbsp;友情链接</h3>
        <div class="content">
          <a v-for="(item, index) in friendLink" :key="index" :href="item.link" target="_blank">{{ item.name }}</a>
        </div>
      </div>

    </div>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
// import { mapState } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      colors: ['#f54545', '#8eb9f5', '#ffac38', '#6c80a8', '#229955',  '#185886'],
      types: ['HTML', 'CSS', 'JavaScript', 'Chrome', 'Vue', 'Linux'],
      dynamic: {},  // 文章
      recommends: {},

      // 友链
      friendLink: [
        {name: 'Mr.Yong', link: 'https://www.myong.top'},
        {name: 'Khari & Yaru的美好记忆', link: 'https://www.qianyaru.cn'},
        {name: '刘浩的博客', link: 'http://lh.likefqq.top'},
      ],
    }
  },
  created () {
    // let num = this.getIndex(this.types, 'CSS');
    // console.log(num);
    axios.get(`${this.$store.state.site}/data/dynamic`, {
      timeout: 1000
    }).then(res => {
      this.dynamic = res.data;

      // 推荐列表
      const obj = Object.entries(res.data);  // 对象转数组
      const arr = [];
      [...obj].forEach((val, i) => {
        arr.push(val);
      })
      this.recommends = arr.sort(() => Math.random() - .5).slice(0, 5);
    });
  },
  methods: {
    // 生成随机数
    random: (max, min = 0) => Math.floor(Math.random() * (max - min) + min),
    getIndex (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if(arr[i] == val) {
          return i;
        }
      }
      return -1;
    }
  },
  components: {
    NavigationBar
  }
}
</script>

<style lang="less" scoped>
.border{
  border: 1px solid #ddd;
  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 1px 6px 1px rgba(0,0,0,.05),
              inset 0 0 1px 1px rgba(0,0,0,.05);
  &:hover{
    box-shadow: 0 1px 6px 2px rgba(0,0,0,.1);
  }
}
.time-line{
  margin-top: 30px;
}
.wrapper-left{
  width: 68%;
}
.wrapper-right{
  width: 31%;
  line-height: 2;
  h3{
    border-bottom: 1px solid #ccc;
  }
  .content{
    margin-top: 12px;
  }
}
.dynamic-wrap, .wrapper-right{
  margin-top: 10px;
}
// 动态
.dynamic-wrap{
  li{
    line-height: 1.6;
    h2{
      font-size: 20px;
    }
    .timer{
      color: #999;
      font-size: 14px;
    }
    button{
      box-sizing: border-box;
      background: #b3d8ff;
      padding: 2px 8px;
      border-radius: 4px;
      color: white;
    }
  }
}

// 关于我
.about{
  a{
    color: #10ac8d;
  }
}

// 友情链接
.friend-link{
  a{
    display: inline-block;
    padding: 0 14px;
    border-radius: 5px;
    background: #eee;
    margin-right: 20px;
    margin-bottom: 10px;
    font-size: 14px;
  }
}

// 推荐文章
.recommend{
  .list{
    font-size: 14px;
    margin-top: 10px;
    i{
      padding: 1px 3px;
      background: #8eb9f5;
      color: white;
    }
    li{
      &:nth-of-type(1) i {
        background: #f54545;
      }
      &:nth-of-type(2) i {
        background: #ff8547;
      }
      &:nth-of-type(3) i {
        background: #ffac38;
      }
    }
  }
}
@media (max-width: 768px) {
  .wrapper-right{
    display: none;
  }
  .wrapper-left{
    width: 100%;
  }
}
@media (min-width:540px) {
  .time-line{
    width: 60%;
    margin: 30px auto;
  }
}
</style>