<template>
	<div class="sign-in">
		<router-view></router-view>
		<p>提示： 更改用户名、密码等信息，请前往
			<router-link to="/users/resetUser">找回密码</router-link>
		页面进行更改</p>
		<div class="next">
			<span  @click="jump">返回首页</span>
		</div>
	</div>
</template>

<script>
export default {
	components: {
		SignIn: () => import(/* webpackChunkName: "users" */ "@/components/users/SignIn"),
		SignUp: () => import(/* webpackChunkName: "users" */ "@/components/users/SignIn"),
		ResetUser: () => import(/* webpackChunkName: "users" */ "@/components/users/ResetUser"),
	},
	methods: {
		jump () {
			this.$router.replace('/');
		},
	}
};
</script>

<style lang='less'>
.sign-in{
	.wrapper{
		margin: 30px auto;
		text-align: center;
		max-width: 400px;
		padding: 20px;
		// border: 1px solid #ccc;
		border-radius: 10px;
		box-shadow: 0 6px 16px rgba(0,0,0,.2);
		h2{
			margin-bottom: 20px;
		}
		// .el-input, .el-switch{
		// 	margin-bottom: 20px;
		// }
	}
	a{
		margin-right: 10px;
	}
	.next{
		margin-top: 40px;
		color: #409EFF;
		text-align: right;
		span{
			cursor: pointer;
		}
	}
	.box {
        height: 100%;
        .el-input{
            width: 30%;
        }
        .el-button{
            width: 70%;
        }
	}
	p{
		margin-top: 30px;
		text-align: center;
		color: #999;
	}
	.el-dropdown{
		width: 100%;
	}
}

</style>