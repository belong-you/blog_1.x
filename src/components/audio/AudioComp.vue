<template>
	<div class="audio-comp">
		<i class="el-icon-headset" :class="[playBtn === false ? 'turn' : '']" @click="drawer = true"></i>
		<i :class="playBtn === true ? 'el-icon-video-play' : 'el-icon-video-pause'" @click="playPause"></i>
		<audio ref="audio" :src="audioSrc" controls @ended="autoPlay"></audio>
		<el-drawer
			title="音乐列表"
			:visible.sync="drawer"
			:with-header="true"
			direction="btt"
			:before-close="handleClose"
			size='90%'
		>
			<ul class="audio-list">
				<li
					v-for="(item, index) in audioList"
					:key="item.id"
					@click="audioChange(index)"
					:class="[index === audioNum ? 'active' : '']"
				>
					<span class="number fl">{{ index + 1 }}</span>
					<span class="name fl">{{ item.name }}</span>
					<i class="el-icon-s-data"></i>
					<span class="author fr">{{ item.author }}</span>
				</li>
			</ul>
		</el-drawer>
	</div>
</template>

<script>
import axios from '@/axios/audio'
import util from '@/util/util'
export default {
	data () {
		return {
			playBtn: true,
			drawer: false,
			audioList: [],
			audioNum: Number(localStorage.getItem('audioNum')) || 0,
			audioSrc: ''
		}
	},
	created () {
		this.renderPage();
	},
	methods: {
		handleClose (done) {
			done()  // 关闭抽屉
		},

		// 渲染页面
		async renderPage () {
			if (sessionStorage.getItem('audioList') === null) {
				const data = await axios.getAudioList();
				sessionStorage.setItem('audioList', JSON.stringify(data));
			}
			if (localStorage.getItem('audioNum') === null) {
				localStorage.setItem('audioNum', 0);
			}
			this.audioList = JSON.parse(sessionStorage.getItem('audioList'));
			this.audioNum =  JSON.parse(localStorage.getItem('audioNum'));
			this.audioSrc = this.audioList[this.audioNum].link

		},

		// 切换歌曲
		audioChange (num) {
			const audio = this.$refs.audio;
			this.audioNum = num;
			localStorage.setItem('audioNum', num);
			this.audioSrc = this.audioList[num].link;
			audio.autoplay = 'autoplay';
			this.playBtn = false;
		},

		// 播放&暂停
		playPause () {
			this.playBtn = !this.playBtn;
			if (this.playBtn === false) {
				this.$refs.audio.play();
			} else {
				this.$refs.audio.pause();
			}
		},

		// 自动播放
		autoPlay () {
			this.audioNum ++;
			if (this.audioNum > this.audioList.length - 1) {
				this.audioNum = 0;
			}
			this.$refs.audio.autoplay = 'autoplay';
			localStorage.setItem('audioNum', this.audioNum);
		}
	}
}
</script>

<style lang='less'>
.audio-comp{
	position: fixed;
	bottom: 20px;
	left: 20px;
	border-radius: 1.2rem;
	background: white;
	border: 1px solid #bbb;
	audio{
		display: none;
	}
	&>i{
		padding: 4px;
		font-size: 1.4rem;
	}
	.el-icon-headset{
		border: 2px solid #267ef1;
		color:  #267ef1;
		border-radius: 50%;
		&.turn{
			animation: turn 6s infinite linear;	
		}
		@keyframes turn {
			0% {
				transform: rotate(0);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
	.el-drawer{
		margin: 0 auto;
		max-width: 1200px;
		background: rgba(255,255,255,.6);
		backdrop-filter: saturate(180%) blur(5px);
		outline: none;
		z-index: 999999;
		.el-drawer__header span{
			outline: none;
		}
	}
	.el-icon-video-play, .el-icon-video-pause{
		padding: 4px 10px;
		cursor: pointer;
	}
	.audio-list{
		vertical-align: bottom;
		padding: 20px;
		line-height: 1.6;
		max-height: 70vh;
		overflow-y: scroll;
		&::-webkit-scrollbar{
			width: 4px;
		}
		&::-webkit-scrollbar-thumb{
			background: rgba(0,0,0,.2);
		}
		li:not(:last-of-type) {
			border-bottom: 1px solid #ccc;
		}
		span{
			margin: 0 4px;
		}
		li{
			cursor: pointer;
			&.active{
				background: rgba(83, 178, 255, 0.4);
				color: orange;
				i{
					color: #76b1fd;
				}
			}
		}
	}
}

</style>