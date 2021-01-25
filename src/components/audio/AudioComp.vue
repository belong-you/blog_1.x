<template>
	<div class="audio-comp">
		<i class="el-icon-headset" :class="[playBtn === false ? 'turn' : '']" @click="drawer = true"></i>
		<i :class="playBtn === true ? 'el-icon-video-play' : 'el-icon-video-pause'" @click="playPause"></i>
		<audio ref="audio" :src="src" controls @ended="autoPlay"></audio>
		<el-drawer
			title="音乐列表"
			:visible.sync="drawer"
			:with-header="true"
			direction="btt"
			:before-close="handleClose"
			size='90%'
		>
			<ul class="audio-list">
				<!-- <div class="operate">
					<div class="btns"></div>
					<div class="duration">
						<div class="box" :style="{width: currentTime + '%'}"></div>
					</div>
					{{ duration / 60 }}
				</div> -->
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
			duration: 0,  // 音乐时长
			currentTime: 0,  // 正在播放的时长
			src: '',
		}
	},
	created () {
		this.renderPage();
		this.src = this.audioList[this.audioNum].link
	},
	// updated () {
	// 	setInterval(() => {
	// 		const currentTime = this.$refs.audio.currentTime;
	// 		this.currentTime = (currentTime / this.duration).toFixed(4) * 100;
	// 		// console.log(this.currentTime)
	// 	}, 1500)
	// },
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
			
		},

		// 切换歌曲
		audioChange (num) {
			const audio = this.$refs.audio;
			this.audioNum = num;
			localStorage.setItem('audioNum', num);
			this.audioSrc = this.audioList[num].link;
			audio.autoplay = 'autoplay';
			this.playBtn = false;
			// this.duration = this.$refs.audio.duration;
		},

		// 播放&暂停
		playPause () {
			this.playBtn = !this.playBtn;
			if (this.playBtn === false) {
				this.$refs.audio.play();
			} else {
				this.$refs.audio.pause();
			}
			// this.duration = this.$refs.audio.duration

		},

		// 自动播放
		autoPlay () {
			this.audioNum ++;
			if (this.audioNum > this.audioList.length - 1) {
				this.audioNum = 0;
			}
			console.log(this.audioNum)
			this.$refs.audio.autoplay = 'autoplay'
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
	.operate{
		width: 100%;
		margin-bottom: 20px;
		.duration{
			width: 60%;
			height: 4px;
			background: #999;
			border-radius: 2px;
			.box{
				height: 100%;
				background: #000;
				border-radius: 2px;
			}
		}
	}
}

</style>