<template>
  <section class="home">
    <navigation-bar></navigation-bar>

    <div class="quick-link">
      <el-button type='text' to="/"  @click="open">Sign in</el-button>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '@/components/NavigationBar'

export default {
  name: 'Home',
  components: {
    NavigationBar
  },
  methods: {
    open() {
      this.$prompt('请输入管理员密码', '管理员登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /123456/,
        inputErrorMessage: '密码错误',
        inputType: 'password'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '密码输入正确',
        });
        sessionStorage.setItem('master', 'salabaji');
      });
    }
  }
}
</script>

<style lang="less" >
.home{
  width: 100vw;
  .navigation{
    position: absolute;
    left: 50%; top: 45%;
    transform: translate(-50%, -50%);
  } 
  .dog{
    position: fixed;
    left: 50%;
    width: 350px;
    transform: translateX(-50%); 
    img{
      width: 100%;
    }
  }
}

.quick-link{
  position: fixed;
  top: 10vh; right: -10vh;
  width: 30vh;
  line-height: 2;
  padding: 0 10px;
  background: #76b1fd;
  transform: skew(-25deg);
  color: white;
  transition: transform .4s;
  .el-button{
    color: white;
    width: 100%;
    text-align: left;
    &:hover{
      color: white;
    }
  }
  
}

@media (max-width: 768px) {
  .el-message-box__wrapper .el-message-box{
    width: 300px;
  }
  .quick-link{
    &:hover{
      transform: translateX(-6vh) skew(-25deg);
    }
  }
}
</style>
