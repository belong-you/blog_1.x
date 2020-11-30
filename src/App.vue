<template>
	<div id="app">
		<el-backtop>up</el-backtop>
		<!-- 回到顶部 -->
		<navigation-bar :class="$route.meta.nav" />
		<transition :enter-active-class="'animate__animated animate__' + $route.meta.enterType">
			<router-view class="leayer view" />
		</transition>

		<!-- 底部信息 -->
		<footer>
		<p>
			Copyright © 2020
			<router-link to="/">bozai.tech</router-link>
			<a href="http://www.beian.miit.gov.cn/">晋ICP备20006880号</a>
		</p>
		<p>Powered by Yubo.Yang</p>
		</footer>
		<audio-comp />
	</div>
</template>

<script>
import canvas1 from "@/util/canvas-nest1";
import canvas2 from "@/util/canvas-nest2";
import util from "@/util/util";

export default {
	components: {
		NavigationBar: () => import(/* webpackChunkName: "navigation" */ "@/components/nav/NavigationBar"),
		AudioComp: () => import(/* webpackChunkName: "AudioComp" */ "@/components/audio/AudioComp"),
	},
	name: "app",
};
</script>

<style lang="less">
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul {
	margin: 0;
}
body,
a {
	color: #404040;
}
body {
	font-size: 16px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: 400;
}
ul {
	list-style: none;
	padding: 0;
}
button {
	border: none;
	outline: none;
}
a {
	text-decoration: none;
}
.fl {
	float: left;
}
.fr {
	float: right;
}
.leayer {
	max-width: 1200px;
	margin: 0 auto;
}
.clearfix::after {
content: "";
	display: block;
	clear: both;
}
footer {
	height: 100px;
	margin-top: 30px;
	text-align: center;
	font-size: 14px;
	color: #666;
	line-height: 30px;
	border-top: 1px solid #ccc;
	box-sizing: border-box;
	padding-top: 20px;
	a {
		color: #666;
		font-size: 14px;
	}
}
.v-modal{  // 抽屉
	position: static !important;
}
.view {
	padding: 0 10px;
	box-sizing: border-box;
	min-height: calc(100vh - 25vh);
}
.el-message-box__wrapper .el-message-box{
	width: auto;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	.bg-animet {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: -1;
		// display: none;
	}
}
@media (min-width: 768px) {
	body {
		margin-top: 100px;
	}
}
@media (min-width: 769px) {
	#cn_2 {
		display: none;
	}
}
@media (max-width: 768px) {
	#cn_1 {
		display: none;
	}
}
</style>
