<template>
    <div class="wrapper">
        <h2>注 册</h2>
        <el-form :model="ruleForm" label-position="left" :rules="rules" label-width="70px">
            <el-form-item label="用户名" prop="name">
                <el-input
                    placeholder="请输入用户名"
                    v-model="ruleForm.name">
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
                <el-input
                    placeholder="请输入邮箱（选填）"
                    v-model="ruleForm.mail">
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <div class="box">
                    <el-button type="primary" @click="recordTime">{{ checkText }} {{ time }}</el-button>
                    <el-input
                        placeholder="验证码"
                        v-model="mailCheck"
                    ></el-input>
                </div>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-input
                            placeholder="请输入密码"
                            v-model="ruleForm.pwd"
                            show-password>
                        </el-input>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>密码级别 {{ passGrade }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
            <el-form-item label="" prop="nextPwd">
                <el-input
                    placeholder="再次输入密码"
                    v-model="ruleForm.nextPwd"
                    show-password>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-switch
                    v-model="isReceiveNews"
                    inactive-text="是否接受邮箱推送消息">
                </el-switch>
            </el-form-item>
        </el-form>
        <div>
            <router-link to="/users/signIn">
                <el-button plain>登录&nbsp;<i class="el-icon-right" /></el-button>
            </router-link>
            <el-button type="primary" @click="signUp">注册</el-button>
        </div>
    </div>
</template>

<script>
import util from '@/util/util'
import axios from '@/axios/users'
import { isEmail, checkPwd, dateFormater } from '@/util/sign'

export default {
    data () {
        const validateName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入用户名'));
            } else {
                if (value.length > 20) {
                    callback(new Error('用户名过长，亲！你是想表白吗？'));
                }
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (/[`~!@#$%^&*()_+<>?:"{}\/;'[\]]/im.test(value)) {
                    callback(new Error('密码中包含特殊字符'));
                }
                if (value.length < 4 || value.length > 20) {
                    callback(new Error('请输入 4 ~ 20 位密码长度'));
                }
                this.passGrade = checkPwd(this.ruleForm.pwd);
                callback();
            }
        }
        const validateNextPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
        const validateMail = (rule, value, callback) => {
            if (value !== null) {
                this.isReceiveNews = true;
                callback();
            }
        }
        return {
            time: null,  // 倒计时
            temporaryCheckNum: null,  // 生成临时验证码
            mailCheck: null,  // 邮箱验证码
            checkText: '获取邮箱验证码',
            isReceiveNews: false,  // 是否接受邮箱推送消息
            passGrade: 0,  // 密码等级
            lock: true,

            ruleForm: {
                name: '',  // 注册账号名称
                mail: null,  // 注册邮箱
                pwd: '',  // 注册密码
                nextPwd: '',  // 重新输入密码
            },
            rules: {
                name: [
                    { validator: validateName, trigger: 'blur' },
                ],
                mail: [
                    // { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: validateMail, trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
                ],
                ruleForm: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
                pwd: [
                    { validator: validatePass, trigger: ['blur', 'change'] },
                ],
                nextPwd: [
                    { validator: validateNextPass, trigger: 'blur' },
                ],

            }
        }
    },
    methods: {

        // 注册账号
        async signUp () {
            
            const name = this.ruleForm.name,
                mail = this.ruleForm.mail,
                pwd = this.ruleForm.pwd,
                time = dateFormater(),
                isReceive = this.isReceiveNews === true ? 1 : 0,
                color = this.randowColor();

            if (!name || !pwd) return;  // 账号和密码有一项为空则返回

            if (mail !== null) {
                if (Number(this.mailCheck) !== this.temporaryCheckNum) {
                    this.$message.error('邮箱验证码错误，请重新获取');
                    return;
                }
            }

            await axios.signUp(name, mail, pwd, time, isReceive, color).then(res => {
                this.$message(res + '，将返回登录页');
                if (res == '注册成功') {
                    setTimeout(() => {
                        this.$router.push('/users/signIn');
                    }, 2000)
                }
            }, () => {
                this.$message.error('服务器断开连接')
            })
        },

        // 发送验证码
        async recordTime () {
            if (this.ruleForm.mail === '') {
                this.$message.error('请输入邮箱地址');
                return;
            }
            if (!this.lock || !isEmail(this.ruleForm.mail)) {
                return;
            }; 
            let number = 60;
            this.time = number + ' S';
            this.checkText = '获取邮箱验证码';
            this.lock = false;
            const timer = setInterval(() => {
                if (number <= 0) {
                    clearInterval(timer);
                    this.time = null;
                    this.checkText = '重新获取';
                    this.lock = true;
                    return;
                }
                number --;
                this.time = number + ' S';
            }, 1000)

            const num = util.num_random(1000000, 100000);
            this.temporaryCheckNum = num;
            // console.log(this.temporaryCheckNum);

            await axios.sendOutCheck(this.ruleForm.mail, num).then(res => {
                this.$message('验证码已发送至您的邮箱，请注意查收');
            });

            // 5 分钟后验证码失效
            setTimeout(() => {
                this.temporaryCheckNum = null;
            }, 1000 * 60 * 5)
        },

        // 生成一个随机颜色
		randowColor () {
			const num1 = util.num_random(60, 99);
			const num2 = util.num_random(60, 99);
			const num3 = util.num_random(60, 99);
			return "#" + num1 + num2 + num3;
		},
    }
}
</script>

<style>

</style>