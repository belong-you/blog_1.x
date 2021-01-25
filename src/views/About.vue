<template>
	<div class="about">
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
				<!-- <p>{{ }}： <a :href="item.link" :target="item.target">{{ item.content }}</a></p> -->
				<span class="time">{{ item.time }}：</span>
					<ul>
						<li v-for="(text, index) in item.content" :key="index">{{ text }}</li>

					</ul>
				</el-timeline-item>
			</el-timeline>


		</div>

	</div>
</template>

<script>
import { setInterval } from 'timers'
import axios from '@/axios/visitNum'
export default {
	data () {
		return {
		abouts: [
			{ name: '职业', content: '前端攻城狮', },
			{ name: '就读学校', content: '山西建筑职业技术学院 计算机工程系 数字媒体艺术设计', },
			{ name: 'GitHub', content: '@/belong-you', link: 'https://github.com/belong-you', target: '_blank' },
			{ name: 'Gmail', content: 'yubo9807@gmail.com', link: 'mailto:yubo9807@gmail.com', },
			{ name: 'Address', content: '山西 长治', },
			{ name: 'WeChat', content: 'weixinvip00000', },
		],
		blog: [
			{ name: '博客地址', content: location.host, link: '/', },
			{ name: '上线时间', content: '2020年7月22日' },
			{ name: '博客内容', content: '主要包括一些 技术文章、个人笔记、留言板块、音乐播放等。PC与移动端均可正常浏览' },
			{ name: '运用技术', content: '运用 Vue2、 Element-UI 框架搭建页面，后端接口由 Node.js 搭建，数据库采用 Mysql，后台管理系统用 vite + React + TypeScript + antd 搭建' },
		],
		journal: [
			{ time: '2020-06', content: ['利用 vue-cli@4.0 搭建博客前端框架'] },
			{ time: '2020-07', content: ['博客上线，完善后台接口、json 数据请求'] },
			{ time: '2020-09', content: ['对一些组件进行整理，添加过渡动画，对数据库进行设计'] },
			{ time: '2020-11', content: [
				'数据 json 改用 Mysql 数据库；',
				'重写接口路由（对非 GET 请求进行加密验证）；',
				'完善用户登录/发送邮箱验证注册、密码找回功能；',
				'留言系统重做；',
				'对文章添加锚链接过渡，发布文章群发邮箱通知；',
				'搭建后台管理系统：“ /vise ”。',
			]},
			{ time: '2020-12', content: [
				'解决了一些 bug；',
				'后台管理系统新增上传文件功能；',
				'使用 redis 对部分数据做缓存。',
			]}
		],
		startTime: new Date('Fri Jul 22 2020 0:00:00 GMT+0800'),
		runTime: 0,
		visitNumber: 0
		}
	},
	async created () {

		await axios.getVisitNum().then(res => {
			this.visitNumber = res.number;
		})
		
		this.serverRunTime();
		setInterval(() => {
			this.serverRunTime();
		}, 1000);
	},
	methods: {
		serverRunTime () {
			let endTime = new Date().getTime();
			let time = (endTime - this.startTime) / 1000;
			let s = ('0' + Math.floor(time % 60)).slice(-2),
				m = ('0' + Math.floor(time / 60 % 60)).slice(-2),
				h = Math.floor(time / 60 / 60 % 24),
				t = Math.floor(time / 60 / 60 / 24);
			this.runTime = t + ' 天 ' + h + ' 小时 ' + m + ' 分 ' + s + ' 秒';
		}
	},
}
</script>

<style lang="less">
.about{
	.wrap, .time-line{
		margin: 20px 0;
	}
	.time-line{
		font-size: 16px;
		a, li{
			color: #10ac8d;
		}
	}
	.time, ul{
		display: inline-block;
		vertical-align: top;
	}
	ul{
		li{
		line-height: 30px;
	}
	}
	.time{
		margin-right: 10px;
	}
}
</style>
