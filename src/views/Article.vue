<template>
	<section class="article">
		<div class="wrap">
		<!-- 侧边栏 -->
		<ul class="right" :style="{'top': scrollTop}">
			<i class="el-icon-loading" v-if="render === ''"></i>
			<template v-else>
				<li v-for="item in sidebarList" :key="item.id">
					<a :href="'#' + item.id" @click="linkJump">{{ item.text }}</a>
				</li>
			</template>
		</ul>

		<!-- 内容区 -->
		<div class="left">
			<p class="load" v-if="render === ''">
				<i class="el-icon-loading"></i>
			</p>
			<div class="article-main" :class="animate" v-html="render"></div>
			<hr>

			<!-- 浏览量 -->
			<ul class="browse">
				<li>
					<span><i class="el-icon-view"></i>&nbsp;{{ readingVolume }}</span>
					<span class="praise"
						:class="[flag === false ? 'active' : '']"
					><i class="el-icon-thumb"
						@click="praiseClick"
					></i>&nbsp;{{ praise }}</span>
				</li>
				<li class="share" @click="copyLink($event)"><i class="el-icon-share"></i>&nbsp;分享</li>
			</ul>

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

			<!-- 版权 -->
			<div class="explain">
				<p>作者：belong-you <router-link to="/about">（联系作者）</router-link></p>
				<p>版权说明：自由转载-非商用-非衍生-保持署名</p>
			</div>
		
			<discuss-plate :address="pathNum" />
		
		</div>

		</div>
	</section>
</template>

<script>
// @ is an alias to /src
import util from '@/util/util'
import axios from '@/axios/article'
import showdown from 'showdown'
import cheerio from 'cheerio'
import NProgress from 'nprogress'

export default {
	beforeCreate() {
		NProgress.start()
	},
	components: {
		DiscussPlate: () => import(/* webpackChunkName: "stay" */ '@/components/discuss/DiscussPlate'),
	},
	data () {
		return {
			scrollTop: 0,
			pathNum: this.$route.params.id,
			render: '',  // 要渲染的文章
			sidebarList: [],  // 侧边栏
			showReward: false,  // 是否显示打赏二维码
			readingVolume: 0,  // 浏览量
			praise: 0, // 点赞数
			dynamicData: {},  // 要发送的数据
			flag: true,  // 为 false 时取消点赞
			animate: '',
			count: 0,  // 点击次数计数
		}
	},
	async created () {
		const [data] = await axios.getArticle(this.pathNum);
		await axios.quantity(this.pathNum, 1, 0).then(res => {
			this.readingVolume = ++ data.look;
		});

		const converter = new showdown.Converter();
		const html = converter.makeHtml(data.content)

		this.praise = data.praise;
		this.readingVolume = data.look;

		setTimeout(() => {
			this.render = html;
			this.animate = 'show';
			NProgress.done()
		}, 1200)

		this.olList(html)

		document.title = data.title;


		document.onscroll = () => {
			let num = document.documentElement.scrollTop;
			if (num > 60) {
				this.scrollTop = num + 'px';
			} else {
				this.scrollTop = 0;
			}
		}

	},
	methods: {
		copyLink () {
			util.copyTextToClipboard(location.href);
			this.$message.success('链接地址已复制到剪贴板');
		},
		async praiseClick () {
			this.count ++;
			if (this.count % 2 !== 0) {  // 点赞 +1
				await axios.quantity(this.pathNum, 0, 1).then(res => {
					this.praise ++;
				});
			} else {  // 点击第二次点赞 -1
				await axios.quantity(this.pathNum, 0, -1).then(res => {
					this.praise --;
				});
			}

			this.flag = !this.flag;
		},
		olList (html) {
			const $ = cheerio.load(html);
			const Arr = Array.from($('h1,h2,h3'));
			
			Arr.forEach(val => {
				const id = val.attribs.id;
				const text = val.children[0].data;
				this.sidebarList.push({id, text});
			})
		},
		linkJump (e) {
			e.preventDefault();
			const str = e.target.href.split('#')[1];
			if (str === '') return;
			const el = document.getElementById(str);
			const num = el.offsetTop;
			window.scrollTo({ 
				top: num + 10, 
				behavior: "smooth" 
			});
		}
	},
	
}
</script>

<style lang="less">
@import url('../util/markdown');
.article{
	.article-main h1{
		text-align: center;
	}
	.wrap{
		box-sizing: border-box;
		width: 100%;
		margin-top: 30px;
		position: relative;
		.right{
			position: absolute;
			right: 0;
			width: 260px;
			border: 1px solid #ddd;
			padding: 10px;
			border-radius: 5px;
			max-height: 80vh;
			overflow-y: scroll;
			&::-webkit-scrollbar{
				width: 4px;
			}
			&::-webkit-scrollbar-thumb{
				background: rgba(0,0,0,.1);
			}
			li{
				line-height: 32px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.left{
			box-sizing: border-box;
			padding-right: 320px;
			width: 100%;
			.load {
				text-align: center;
			}
		}
	}
	hr{
		border: none;
		border-bottom: 1px dashed #ddd;
		margin-top: 20px;
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
	.browse{
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #999;
		span{
			margin-right: 20px;
		}
		.share, .praise{
			cursor: pointer;
		}
		.praise.active{
			color: #409EFF;
		}
	}
	.explain{
		margin-top: 20px;
		font-size: 14px;
		color: #999;
		a{
			color: #409EFF;
		}
	}
}
@media (max-width: 960px) {
	.article .wrap {
		.left{
			padding-right: 0;
		}
		.right{
			display: none;
		}
	}
}
.article-main{
	transform: translateY(60px);
	opacity: 0;
	transition: all 1s cubic-bezier(0, 0, 0.57, 0.98);
}
.show{
	transform: translate(0, 0);
	opacity: 1;
}

</style>