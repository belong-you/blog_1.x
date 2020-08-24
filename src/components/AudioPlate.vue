<template>
  <div>
    <div class="audio-title">
      <strong>{{ audioTitleList[num] }}</strong>
      <i class="el-icon-s-operation fr" @click="showAudioList = !showAudioList"> 歌单</i>
    </div>
    <audio
      :src="audioSrcList[num]"
      controls
      controlslist="nodownload"
      oncontextmenu="return false"
    >音频</audio>
    <div class="list" :style="{height: showAudioList === true ? '300px' : '0'}">
      <ul>
        <li
          v-for="(item, index) in audioTitleList"
          :key="index"
          @click="switchAudio($event, index)"
          class="clearfix"
          :class="index === num ? 'active' : ''"
        >
          <span class="number fl">{{ index + 1 }}</span>
          <span class="name fl">{{ item.split('_')[0] }}</span>
          <i class="el-icon-s-data" :style="{display: index === num ? 'inline' : 'none'}"></i>
          <span class="author fr">{{ item.split('_')[1].slice(0, -4) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      audioTitleList: [],
      audioSrcList: [],
      curAudio: '',
      curAudioSrc: '',
      num: 0,
      showAudioList: false,
    };
  },
  created () {
    Axios.get(`${this.$store.state.site}/data/audio`).then(res => {
      const arr = [];
      this.audioTitleList = res.data;
      this.curAudio = res.data[0];
      res.data.forEach((val, i) => {
        arr.push(this.$store.state.site + '/audio/' + val);
      });
      this.audioSrcList = arr;
      this.curAudioSrc = arr[0];

      this.$el.childNodes[1].onended = () => {
        this.num ++;
        this.$el.childNodes[1].autoplay = 'autoplay';
      }
    })
  },
  methods: {
    switchAudio (e, number) {
      this.num = number;
      this.$el.childNodes[1].autoplay = 'autoplay';
    }
  }
};
</script>

<style lang="less" scoped>
audio {
    outline: none;
    width: 100%;
    height: 30px;
  }
  .audio-title{
    margin: 20px 10px;
    i{
      cursor: pointer;
      color: #76b1fd;
    }
  }
  .list{
    will-change: height;
    height: 300px;
    margin: 0 5px;
    border: .5px dashed #ccc;
    overflow: auto;
    transition: height .4s;
    &::-webkit-scrollbar{
      width: 4px;
    }
    &::-webkit-scrollbar-track{
      background: #eee;
    }
    &::-webkit-scrollbar-thumb{
      background: #ccc;
    }
    li{
      margin: 0 5px;
      line-height: 2.2;
      min-width: 300px;
      cursor: pointer;
      &:hover, &.active{
        background: lavender;
      }
      &.active{
        color: orange;
      }
      &:not(:last-of-type){
        border-bottom: 1px solid #ccc;
      }
    }
    .el-icon-s-data{
      margin-left: 10px;
      color: #76b1fd;
    }
    .number{
      display: inline-block;
      width: 40px;
      text-align: center;
    }
  }
</style>