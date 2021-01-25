## node 服务文件说明

```
server
├─ package-lock.json
├─ package.json
├─ routes  // 接口
│  ├─ article.js
│  ├─ audio.js
│  ├─ discuss.js
│  ├─ friendLink.js
│  ├─ index.js
│  ├─ init.js
│  ├─ users.js
│  ├─ visitNum.js
│  └─ webNote.js
├─ server.js  // 启动文件
├─ services  // 一些业务处理
│  ├─ cookies.js
│  ├─ errorCheck.js
│  ├─ jwt.js
│  ├─ logger.js
│  ├─ mailDelivery.js
│  └─ readAudio.js
└─ spider  // Mysql 数据库操作
   ├─ article.js
   ├─ audio.js
   ├─ discuss.js
   ├─ friendLink.js
   ├─ users.js
   └─ visitNum.js
```

- 其中的 power.js 没有上传，涉及一些权限问题
