import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: '鹏北海，凤朝阳。又携键盘两茫茫',  // title
			nav: 'fixed',  // 导航栏 class 传参
		},
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		meta: {
			title: 'belong-you | 首页',
			nav: 'fixed'
		}
	},
	{
		path: '/users',
		name: 'Users',
		component: () => import(/* webpackChunkName: "users" */ '../views/Users'),
		redirect: '/users/signIn',
		children: [
			{
				path: 'signIn',
				name: 'SignIn',
				component: () => import(/* webpackChunkName: "users" */ '../components/users/SignIn'),
				meta: {
					title: 'belong-you | 登录',
					nav: 'none'
				},
			},
			{
				path: 'signUp',
				name: 'SignUp',
				component: () => import(/* webpackChunkName: "users" */ '../components/users/SignUp'),
				meta: {
					title: 'belong-you | 注册',
					nav: 'none'
				},
			},
			{
				path: 'resetUser',
				name: 'ResetUser',
				component: () => import(/* webpackChunkName: "users" */ '../components/users/ResetUser'),
				meta: {
					title: 'belong-you | 密码找回',
					nav: 'none'
				},
			},
		]
	},
	{
		path: '/dynamic',
		name: 'Dynamic',
		component: () => import(/* webpackChunkName: "dynamic" */ '../views/Dynamic'),
		meta: {
			title: 'belong-you | 动态文章',
			nav: 'adapt'
		}
	},
	{
		path: '/article/:id',
		name: 'Article',
		props: true,
		component: () => import(/* webpackChunkName: "article" */ '../views/Article'),
		meta: {
			nav: 'adapt'
		}
	},
	{
		path: '/note',
		name: 'Note',
		component: () => import(/* webpackChunkName: "note" */ '../views/Note'),
		redirect: '/note/webLabel',
		children: [
			{
				path: 'webLabel',
				name: 'WebLabel',
				component: () => import(/* webpackChunkName: "note" */ '../components/note/WebLabel'),
				meta: {
					title: 'belong-you | 个人笔记',
					nav: 'adapt'
				},
			},
			{
				path: 'webPage/:id',
				name: 'WebPage',
				component: () => import(/* webpackChunkName: "note" */ '../components/note/WebPage'),
				meta: {
					title: 'belong-you | 个人笔记',
					nav: 'adapt'
				},
			},
		]
	},
	{
		path: '/stay',
		name: 'Stay',
		component: () => import(/* webpackChunkName: "stay" */ '../views/Stay'),
		meta: {
			title: 'belong-you | 访客留言',
			nav: 'adapt'
		},
	},
	{
		path: '/about',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '../views/About'),
		meta: {
			title: 'belong-you | 关于博客',
			nav: 'adapt'
		}
	},
	{
		path: '/notFound',
		name: 'NotFound',
		component: () => import(/* webpackChunkName: "about" */ '../views/NotFound'),
		meta: {
			title: '找不到该页面',
			nav: 'none'
		}
	},
	{
		path: '*',
		redirect(to) {
			return '/NotFound'
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
	const enters = [
		'bounce',
		'backInDown',
		'backInRight',
		'backInUp',
		'fadeInUp',
		'flipInX',
		'flipInY',
		'lightSpeedInRight',
		'zoomIn',
		'zoomInLeft',
		'zoomInUp',
		'slideInDown',
		'slideInRight',
		'slideInUp',
	];
	document.title = to.meta.title;  // 设置 title 值
	to.meta.enterType = enters[Math.floor(Math.random() * enters.length)];
	next();
})

export default router
