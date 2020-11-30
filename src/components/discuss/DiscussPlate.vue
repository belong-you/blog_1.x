<template>
	<div>
		<!-- 留言内容 -->
		<form class="discuss-wrap" action>
			<div class="discuss">
				<span class="say">留言：</span>
				<span class="text">
					<el-input ref="input" type="textarea" :rows="5" placeholder="请输入文字" v-model="textarea"></el-input>
				</span>
			</div>
			<div class="btn">
				<el-button type="primary" plain @click="submit">提交</el-button>
				<el-button type="info" plain @click="empty">清空</el-button>
			</div>
		</form>

		<!-- 评论 -->
		<ul class="discuss-list">
			<li v-for="(item) in discussData" :key="item.id">
				<span class="circular" :style="{background: item.color}">{{ item.name.slice(0, 1) }}</span>
				<div class="text">
					<strong class="name" :style="{color: item.color}">{{ item.name }}</strong>
					<em>{{ item.time }}</em>
					<p>
						<span>{{ item.content }}</span>
						<i @click="comeBack(item)" >回复</i>
					</p>

					<!-- 回复 -->
					<ul class="reply">
						<li v-for="reply in replyDataFilter(item.id)" :key="reply.id">
							<strong class="name" :style="{color: reply.color}">{{ reply.name }}</strong>
							<em>{{ reply.time }}</em>
							<p>
								<span>{{ reply.content }}</span>
								<i @click="comeBack(item, reply)" >回复</i>
							</p>
						</li>
					</ul>

				</div>
			</li>
		</ul>

		<p class="more">没有更多留言了...</p>
	</div>
</template>

<script>
import axios from '@/axios/discuss'
import util from "@/util/util"
import { dateFormater, switchTimeFormat } from "@/util/sign"
import bro from "@/util/browser"
import "./DiscussPlate.less"

export default {
	props: {
		address: {
			type: String,
			required: true
		},
		
	},
	data() {
		return {
			nickName: "",
			email: "",
			textarea: "",
			preFlag: true,
			discussData: [],
			replyData: [],
			replyId: null,
			sendMailName: null,
		};
	},
	created() {
		this.getDiscuss();
	},

	methods: {
		// 获取所有的留言
		async getDiscuss () {
			const data = await axios.getDiscuss(this.address);
			const discussData = [], replyData = [];

			data.filter(val => {
				val.time = switchTimeFormat(val.time)
				if (val.reply_id === null) {
					discussData.push(val);
				} else {
					replyData.push(val);
				}
			})
			this.discussData = discussData;
			this.replyData = replyData;
		},
		replyDataFilter (num) {
			const arr = this.replyData.filter(val => {
				if (val.reply_id === num) {
					return true;
				}
			})
			return arr.reverse();
		},
		
		// 消息回复
		comeBack (replyObj1, replyObj2 = {name: ''}) {
			const { id, name: name1 } = replyObj1
			const { name: name2 } = replyObj2;
			this.replyId = id;
			// console.log(this.replyId)

			const el = this.$refs.input.$el.children[0];
			this.textarea = '';
			this.sendMailName = name2 || name1;
			el.placeholder = `回复给${name1}`
			el.focus();
			
			if (name2 !== ''){
				el.placeholder = `回复给${name2}`
				this.textarea = `@${name2};`
			}
		},

		// 删除对应数据
		delData(num) {
			console.log(num)
		},

		// 提交按钮，回复评论
		async submit() {

			const content = this.textarea,
				time = dateFormater(),
				address = this.address,
				replyId = this.replyId;
			
			if (content === '') {
				this.$message.warning('评论内容为空，亲');
				return;
			}
			await axios.addDiscuss(content, time, address, replyId).then(res => {
				console.log(res)
				if (res.code === 401) {
					this.$confirm('检测到您并未登录，是否前往登录页面进行登录?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/users/signIn');
						return;
					})
				}
				this.getDiscuss();  // 重新发送请求渲染数据
				this.textarea = '';
			})

			// 发送邮箱告知对方
			if (this.sendMailName) {
				await axios.sendMail(this.sendMailName, content, location.href).then(res => {
					console.log(res)
				})
			}

		},

		// 清空
		empty () {
			const el = this.$refs.input.$el.children[0];
			this.textarea = '';
			el.placeholder = '请输入文字';
			this.replyId = null;
			this.sendMailName = null;
		},

	}
};
</script>

<style lang="less" scoped>

</style>>