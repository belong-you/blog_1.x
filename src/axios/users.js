import axios from 'axios';

export default {
    // 注册账号
    signUp: (name, mail, pwd, time, isReceive = 1, color) => axios.post('users', {
        params: {
            name,
            mail,
            pwd,
            time,
            isReceive,
            color,
        }
    }),
        
    // 登录
    signIn: (name, pwd) => axios.get('users/signIn', {
        params: {
            name,
            pwd
        }
    }),

    // 修改名称密码
    resetUser: (mail, name, pwd, isReceive) => axios.put('users/reset', {
        params: {
            mail,
            name,
            pwd,
            isReceive,
        }
    }),

    // 发送验证码
    sendOutCheck: (mail, checkNum) => axios.put('users/mailCheck', {
        params: {
            mail,
            checkNum,
        }
    }),

    // 退出
    signOut: () => axios.get('users/signUp'),
}