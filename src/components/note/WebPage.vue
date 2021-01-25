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
							<a :href="`/note/webPage/${item}/1`" style="display: block;">{{ item }}</a>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

			</el-breadcrumb-item>

			<el-breadcrumb-item>{{ activeName }}</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 选项卡 -->
		<transition>
			<el-tabs v-model="activeName" :tab-position="offsetW > 768 ? 'left' : 'top'" @tab-click="handleClick">
			<el-tab-pane 
				v-for="(item, index) in note[tag]"
				:key="index"
				:label="item.hash + ' ' + item.name" 
				:name="item.hash"
				v-html="html"
				:class="animate"
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
						<img src="@/assets/wx.png" alt="">
						<p>微信支付</p>
					</span>
					<span>
						<img src="@/assets/zfb.jpg" alt="">
						<p>支付宝</p>
					</span>
				</div>
				</el-collapse-transition>
			</div>

			</el-tabs>
		</transition>
	</div>
</template>

<script>
import util from '@/util/util'
import { clearTimeout } from 'timers'
import axios from "@/axios/note"
import { callbackify } from 'util'
import '@/util/myMarkdown.less'

export default {
	// 路由改变时，并且组件被复用时调用，可以访问到 this
    beforeRouteUpdate (to, from, next) {
		const id = to.params.id;
		this.getText(id)
        next();
    },
	data () {
		return {
			offsetW: document.body.offsetWidth,  // 视口宽
			tag: this.$route.params.type,  // 标签
			id: this.$route.params.id,
			activeName: '',
			html: '',  // 转义后的html结构
			options: [],  // 下拉菜单
			href: location.href,
			note: {},
			showReward: false,  // 是否显示打赏二维码
			animate: '',
		}
	},
	async created () {
		await axios.getNotePage().then(res => {
			this.note = res;
			if (!res[this.tag]) {
				document.title = 'belong-you | 个人笔记';
				this.$notify({
					message: `笔记 ${this.tag} 还没有上传呦...`,
				});
				return;
			}
			this.options = Object.keys(this.note);  // 下拉菜单

			// 判断数据中有没有相应的数据
			if (this.id === '') this.activeName = this.note[this.tag][0].hash;
			else this.activeName = this.id;

			this.getText(this.id);  // 获取对应的 .md 文件
		})

	},
	methods: {
		// 回到顶部
		gotop () {
			let num = window.scrollY, timer = null;
			timer = setInterval(() => {
				if (num < 0) clearInterval(timer);
				num -= 14;
				window.scrollTo(0, num);
			}, 10)
		},

		// 列表切换
		handleClick(tab, event) {
			if (this.$route.params.id === tab.name) return;  // 检查路由 id 是否与 tab.name 一致

			this.animate = '';
			this.$router.replace(`/note/webPage/${this.tag}/${tab.name}`)
			this.getText(tab.name);  // 重新发送请求
			this.gotop();
		},

		// 获取对应的 .md 文件
		async getText (id = 1) {

			await axios.getNoteMd(this.tag, id).then(res => {
				// return res;
				const text = res.text;
				document.title =  this.tag + ' | ' + text.match(/#\s.{0,100}?(\n|\r\n)/)[0].slice(2, -1),
				this.html = util.interpretMd(text);
				this.animate = 'show';
			}, () => {
				this.html = '';  // 请求不到让内容为空
				this.$notify({
					message: '该笔记还没有上传呦...',
				});
			})
			
		},
	}
}
</script>

<style lang="less">
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
	.el-tabs__nav{
		z-index: 0;
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
.el-tab-pane{
	transform: translateY(50px);
	opacity: 0;
	transition: all .8s cubic-bezier(0, 0, 0.57, 0.98);
}
.el-dropdown-menu{
	max-height: 70vh;
	overflow-y: scroll;
	&::-webkit-scrollbar{
		width: 4px;
	}
	&::-webkit-scrollbar-thumb{
		background: rgba(0,0,0,.2);
	}
}
.show{
	transform: translate(0, 0);
	opacity: 1;
}
</style>