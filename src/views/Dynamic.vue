<template>
	<div class="dynamic clearfix">
		<div class="wrapper-left fl">

			<!-- 动态文章 -->
			<ul class="dynamic-wrap">
				<li class="border" v-for="(item) in dynamic" :key="item.id">
					<dynamic-list :item="item" :colors="colors" />
				</li>
			</ul>
		</div>

		<div class="wrapper-right fr">

			<!-- 关于我 -->
			<div class="about border">
				<h3 class="title"><i class="el-icon-user"></i>&nbsp;关于我</h3>
				<div class="content">
					<p>职业：<a>前端工程师</a></p>
					<p>GitHub：<a href="https://github.com/belong-you/blog" target="_blank">@/blog</a></p>
					<p>Gmail：<a href="mailto:yubo9807@gmail.com">yubo9807@gmail.com</a></p>
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
						<router-link :to="'/article/' + item.id">{{ item.title }}</router-link>
					</li>
				</ul>
			</div>

			<!-- 友链 -->
			<div class="friend-link border">
				<h3><i class="el-icon-link"></i>&nbsp;友情链接</h3>
				<div class="content">
					<a v-for="item in friendLink" :key="item.id" :href="item.link" target="_blank">{{ item.name }}</a>
				</div>
			</div>

		</div>
    </div>
</template>

<script>
import axios1 from '@/axios/article'
import axios2 from '@/axios/note'
import { switchTimeFormat } from '@/util/sign'
import DynamicList from '../components/dynamic/DynamicList.vue'

export default {
	components: {
		DynamicList: () => import('@/components/dynamic/DynamicList')
	},
	data () {
		return {
			colors: [],  // 向子组件传递的颜色对象
			dynamic: {},  // 文章
			recommends: {},  // 推荐文章

			friendLink: [],  // 友链
		}
	},
	async created () {
		const data = await axios1.getArticleList();
		this.dynamic = data;

		await axios2.getNoteLabel().then(res => {
            this.colors = res;
        })

		// 推荐列表
		this.recommendList(data, 5);

		// 友情链接
		this.getFriendLink();

	},
	methods: {
		switchTime (time) {
			return switchTimeFormat(time);
		},
		// 生成随机数
		random: (max, min = 0) => Math.floor(Math.random() * (max - min) + min),
		getIndex (arr, val) {
			for (var i = 0; i < arr.length; i++) {
				if(arr[i] == val) return i;
			}
			return -1;
		},
		async getFriendLink () {
			await axios1.getFriendLink().then(res => {
				this.friendLink = res;
			})
		},
		
		// 推荐列表
		recommendList (data, num) {
			const arr = [];
			[...data].forEach((val, i) => {
				arr.push(val);
			})
			this.recommends = arr.sort(() => Math.random() - .5).slice(0, num);
		}
	},
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