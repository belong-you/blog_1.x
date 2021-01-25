var nodemailer = require('nodemailer');

/**
 * 发送邮件
 * @param {*} addressee 收件人邮箱号
 * @param {*} title 标题
 * @param {*} content 内容
 */
module.exports.mailDelivery = (addressee, title, content) => {
    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: '1419201583@qq.com', // 你的邮箱
            pass: 'szemogwtqnlvbaaf',  // QQ 授权码
        }
    });
    
    let mailOptions = {
        from: '"belong-you 的博客" <1419201583@qq.com>', // sender address
        to: addressee,  // 收件人
        subject: title,  // 标题
        html: content  // 发送text或者html格式
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });
}