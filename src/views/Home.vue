<template>
	<section class="home">
		<div class="sign-in">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					<router-link to="/users">Sign in</router-link>&nbsp;
					<i class="el-icon-arrow-down" />
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<span @click="signOut">Sign out</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</section>
</template>

<script>
import axios from '@/axios/users';

export default {
	name: "Home",
	methods: {
		// 登出
		async signOut () {
			this.$confirm('是否退出登录', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				await axios.signOut().then(res => {
					this.$message('bye, see you!');
				})
			}).catch(() => {
				return;
			})
		}
	}
};
</script>

<style lang="less" scoped>
.home {
	width: 100vw;
	.navigation {
		position: absolute;
		left: 50%;
		top: 45%;
		transform: translate(-50%, -50%);
	}
}
.sign-in{
	text-align: right;
	a{
		color: #409EFF;
	}
}

@media (max-width: 768px) {
	.el-message-box__wrapper .el-message-box {
		width: 300px;
	}
	.sign-in{
		margin: 30px;
	}
}
</style>
