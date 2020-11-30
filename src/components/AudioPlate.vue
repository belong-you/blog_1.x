<template>
	<div>
		<div class="audio-title">
			<strong>{{ audioTitleList[num] }}</strong>
			<i class="el-icon-s-operation fr" @click="showAudioList = !showAudioList"> 歌单</i>
		</div>
		<audio
			ref="audio"
			:src="'http://bozai.tech' + audioSrcList[num]"
			controls
			controlslist="nodownload"
			oncontextmenu="return false"
			@ended="autoPlay"
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
export default {
	data() {
		return {
			audioTitleList: JSON.parse(localStorage.getItem('audioList')) || [],  // 歌单
			audioSrcList: [],  // 歌曲地址列表
			curAudio: '',  // 正在播放的歌曲
			curAudioSrc: '',  // 正在播放的歌曲地址
			num: Number(localStorage.getItem('audioIndex')) || 0,  // 默认播放歌曲的索引值
			showAudioList: true,  // 是否显示歌单
		};
	},
	created () {
		if (localStorage.getItem('audioList') === null) {
			this.$axios.get(`/data/audio`).then(res => {
				const audioList = localStorage.setItem('audioList', JSON.stringify(res.data));
				this.audioTitleList = res.data;
				this.audioInit();  // 歌曲初始化
			})
		}
		this.audioInit();  // 歌曲初始化
		
	},
	methods: {
		// 歌曲初始化
		audioInit () {
			this.curAudio = this.audioTitleList[this.num];
			const arr = [];
			this.audioTitleList.forEach((val, i) => {
				arr.push('/audio/' + val);
			});
			this.audioSrcList = arr;
			this.curAudioSrc = arr[this.num];
		},

		/**
		 * 歌曲切换
		 * @param {Event} e 事件源对象
		 * @param {Number} number 要切换的歌曲索引值
		 */
		switchAudio (e, number) {
			this.num = number;
			localStorage.setItem('audioIndex', number);
			this.$refs.audio.autoplay = 'autoplay';
		},
		
		// 自动播放
		autoPlay () {
			this.num ++;
			this.$refs.audio.autoplay = 'autoplay';
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