<template>
<div>
	<!-- 留言内容 -->
	<form class="discuss-wrap" action="">
		<div class="tlt">
			<div class="name">
				<span>昵称：</span>
				<span class="text">
				<el-input v-model="nickName" placeholder="请输入昵称"></el-input>
				</span>
			</div>
		</div>
		<div class="discuss">
			<span class="say">留言：</span>
			<span class="text">
				<el-input type="textarea" :rows="5" placeholder="请输入文字" v-model="textarea"></el-input>
			</span>
		</div>
		<div class="btn">
			<el-button type="primary" plain @click="submit">提交</el-button>
			<el-button type="info" plain @click="nickName = textarea = ''">清空</el-button>
		</div>
	</form>

	<!-- 留言列表 -->
	<ul class="discuss-list">
		<li v-for="(item, index) in discussData" :key="index">
		<span class="circular" :style="{background: item.color}">{{ item.name.slice(0, 1) }}</span>
		<div class="text">
			<strong class="name">{{ item.name }}
				<span>{{ item.system }}</span>
				<span>{{ item.browser }}</span>
			</strong>
			<p @click="reply(index)">{{ item.content }}</p>
				<div class="reply" :style="{display: item.reply === undefined ? 'none' : 'block'}">
				<span class="author">站长：</span>
			<p class="speak">{{ item.reply }}</p>
			</div>
		</div>
		<div class="del" v-if="ipFlag(item.key)" @click="delData(index)">删除</div>
		</li>
	</ul>
</div>
</template>

<script>
import axios from '@/axios/interface'
import util from '@/util/util'
import bro from '@/util/browser'

export default {
	props: {
		value: {
			type: String
		}
	},
	data () {
		return {
			nickName: '',
			email: '',
			textarea: '',
			preFlag: true,
			discussData: [],
			ip: returnCitySN["cip"],
			dynamic: {},
		}
	},
	async created () {
		this.$axios.get(`/data/dynamic`).then(res => {
			this.dynamic = res.data;
			this.discussData = res.data[this.value].discuss;
		})
	},
	methods: {
		// 消息回复
		reply (num) {
			if (sessionStorage.getItem('master') !== 'salabaji') return;
			this.$prompt('回复内容', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(({ value }) => {
				const obj = this.discussData[num]
				this.$set(obj, 'reply', value);
				this.sendRequest();
			})
		},
		delData (num) {
			this.$confirm('删除该条评论', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$delete(this.discussData, num);
				this.sendRequest();
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			});
		},
		ipFlag (ip) {
			if (sessionStorage.getItem('master') === 'salabaji' || ip === this.ip) {
				return true;
			}
			return false;
		},
		randowColor () {
			const num1 = util.num_random(60, 99);
			const num2 = util.num_random(60, 99);
			const num3 = util.num_random(60, 99);
			return '#' + num1 + num2 + num3;
		},
		submit () {
			if (this.nickName === '') {
				this.$message.error('请输入您的昵称');
				return;
			}
			if (this.textarea === '') {
				this.$message.error('留下您的内容');
				return;
			}
			const data = {
				key: this.ip,
				name: this.nickName,
				color: this.randowColor(),
				content: this.textarea,
				system: bro.getOsInfo(),
				browser: bro.bro()
			}
			this.discussData.unshift(data);
			this.sendRequest();
		},
		sendRequest () {
			this.dynamic[this.value].discuss = this.discussData;

			this.$axios.get(`/data/dynamic/discuss`, {
				params: {
					obj: this.dynamic
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import url('../util/DiscussPlate');
</style>>