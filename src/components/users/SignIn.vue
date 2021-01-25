<template>
	<div class="wrapper">
		<h2>登 录</h2>
		<el-form :model="ruleForm" :rules="rules" label-position="left" label-width="70px">
            <el-form-item label="用户名" prop="name">
				<el-input placeholder="请输入用户名或邮箱" v-model="ruleForm.name" autocomplete="off"></el-input>
			</el-form-item>
            <el-form-item label="密码" prop="pwd">
				<el-input placeholder="请输入密码" v-model="ruleForm.pwd" show-password></el-input>
			</el-form-item>
		</el-form>
		<router-link to="/users/signUp">
			<el-button plain ><i class="el-icon-back" />&nbsp;注册</el-button>
		</router-link>
		<router-link to="/users/resetUser">
			<el-button plain >找回密码&nbsp;<i class="el-icon-right" /></el-button>
		</router-link>
		<el-button type="primary" @click="signIn">登录</el-button>
	</div>
</template>

<script>
import axios from '@/axios/users'

export default {
	name: 'signIn',
	data () {
		return {
			ruleForm: {
				name: '',  // 登录账号
				pwd: '',  // 登录密码
			},
			rules: {
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
				]
			}
		}
	},
	methods: {
		async signIn () {
			const { name, pwd } = this.ruleForm;

			if (!name || !pwd) {
				this.$message.warning('填写信息不完整，亲');
				return;
			};

			await axios.signIn(name, pwd).then(res => {
				this.$message(res + '，即将返回上一页');
				setTimeout(() => {
					this.$router.go(-1);
				}, 1000)
			}, err => {
				this.$message.error('获取数据失败');
			})
		}
	}
};
</script>

<style>
</style>