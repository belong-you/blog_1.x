## 项目名称：个人技术博客

该博客用来记录一些个人学习笔记，如果喜欢，欢迎 `star`

[在线预览](http://bozai.tech)

## 技术栈

博客站点：Vue2、vue-router、Element-UI、Axios、Animate、Less、cheerio、showdown

管理系统：React、TypeScript、Sass、Antd、react-router-dom

后台接口：NodeJS、express、jwt、nodemailer

数据库：Mysql、Redis

## 项目运行

```js
git clone https://github.com/belong-you/blog

// 切换分支
git checkout site  // 博客站点
git checkout vise  // 后台管理系统
git checkout server  // 后台接口
git checkout db  // 数据库结构

npm install
// 接下来可按 package.json 配置脚本运行
```

or 按分支拉取：

```js
git clone -b site https://github.com/belong-you/blog
```

> 拉取代码仅供学习参考，因后台缺少 power.js 文件，又针对非 GET 请求进行了加密验证处理
## 线上部署

nginx 代理、pm2

```nginx
server {
    listen       80;
    server_name  bozai.tech;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

代码压缩（文件镜像）`vue.config.js` 代码体积从 `5M` 左右减小至不到 `2M`，因自己的服务器是`10M`宽带，所以效果不是特别明显。 ^_^

```js
const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
	configureWebpack: config => {
		config.plugins.push(new CompressionPlugin({
			filename: '[path].gz[query]',
			//压缩算法
			algorithm: 'gzip',
			//匹配文件
			test: /\.js$|\.css$|\.html$|\.woff$|\.ttf$|\.eot$|/,
			//压缩超过此大小的文件,以字节为单位
			threshold: 1024,
			minRatio: 0.8,
			//删除原始文件只保留压缩后的文件
			deleteOriginalAssets: false
		}))
		// 删除console
		config.optimization.minimizer[0].options.terserOptions.compress = { drop_console: true, drop_debugger: false, pure_funcs: ['console.log'] } // 移除console
	},
	// 是否生成 sourceMap 文件
	productionSourceMap: false,
}
```

部署目录：

```js
blog
├─ public  // 静态资源存放(图片、音乐、笔记文件...)
├─ dist  // 博客站点
├─ vise  // 后台管理系统
└─ server  // 后台服务接口
```

> 此项目并未做 SSR 渲染，请切换储存库 [@/blog_nuxt](https://github.com/belong-you/blog_nuxt)

## 数据库

- Mysql （留言数据结构设计）

    |   id*   | name*（外键指向用户数据） | content* |  time*   | address* |                       reply_id                       |
    | :-----: | :-----------------------: | :------: | :------: | :------: | :--------------------------------------------------: |
    | 评论 ID |          用户名           | 评论内容 | 评论时间 | 评论地址 | 这条评论指向 ID（Null 表示`评论`，反之为`回复评论`） |

    ```mysql
    SELECT t1.id, t1.name, t1.time, content, color, reply_id
    FROM discuss AS t1 LEFT JOIN users AS t2  -- 查询 discuss 与 users 表
    ON t1.name = t2.name
    WHERE address = ?  -- 给定一个地址
    ORDER BY t1.time DESC;  -- 按时间升序排列
    ```

    前端渲染数据，将 `评论` 与 `回复评论` 进行过滤

    ```js
    const data = await axios.getDiscuss(this.address);  // 接口就不写了 ^_^
    const discussData = [], replyData = [];
    
    data.filter(val => {
        if (val.reply_id === null) {  // reply_id 为 Null 表示`评论`，反之为`回复评论`
            discussData.push(val);
        } else {
            replyData.push(val);
        }
    }
    ```

    最终就渲染成了 [留言区](http://bozai.tech/stay) 这个丫子的

- Redis （文件读取数据）

    博客的笔记部分我并没有用数据库来做，而是 `.json` 和 `.md` 文件，这样也方便我后续管理。在访问笔记部分时，路由的来回切换回导致客户端向服务器不断的发送请求并读取文件来返回数据。于是我选用了 `redis` 做缓存

    具体配置请看博客笔记 [Redis 响应缓存体](http://bozai.tech/note/webPage/redis/4) 

## 技术攻克

1. 文章锚链接跳转动画

    在原生的 `JavaScript` 中滚动条可以配置过渡效果

    ```js
    /**
     * 滚动条跳转过渡，默认回到顶部
     * @param num 滚动条距离顶部的位置
     */
    export const scrollTo = (num) => {
        const num = ele.offsetTop || 0;
        window.scrollTo({
            top: num,
            behavior: "smooth", // 过渡类型
        });
    }
    ```

    有了这个函数之后便是要知道我们想要去什么位置了，`.md` 文档解析我选用了 `showdown` 来进行编译，编译之后 `h1`-`h6` 标签上会多一个 `id` 属性

    ![](http://bozai.tech/images/1611392857473_jmj2oe.jpg)

    即便是这样，终究还是存在问题的（有的标签上 `id` 值为空），这样的瑕疵虽是少数，但给我的感觉实在别扭

    ![](http://bozai.tech/images/1611393125377_szeyzk.jpg)

    可能 `showdown` 可以配置，文档中没找到，于是开启了我的自行编译模式（自己编译的并不是特别完美，对于自己来说足够用了 ^_^ ）

    ```js
    // 多级标题
    if (/^#/.test(item)) {
        /^#\s/.test(item) && (arr[prop] = `<h1 id="${iter.next().value}">${item.slice(2, num)}</h1>`);
        /^##\s/.test(item) && (arr[prop] = `<h2 id="${iter.next().value}">${item.slice(3, num)}</h2>`);
        /^###\s/.test(item) && (arr[prop] = `<h3 id="${iter.next().value}">${item.slice(4, num)}</h3>`);
        /^####\s/.test(item) && (arr[prop] = `<h4 id="${iter.next().value}">${item.slice(5, num)}</h4>`);
        /^#####\s/.test(item) && (arr[prop] = `<h5>${item.slice(6, num)}</h5>`);
        /^######\s/.test(item) && (arr[prop] = `<h6>${item.slice(7, num)}</h6>`);
    }
    
    // 引用
    /^>\s/.test(item) && (arr[prop] = `<blockquote class='notes'>${item.slice(2, num)}</blockquote>`);
    
    // 分割线
    /^-{4}/.test(item) && (arr[prop] = '<hr/>');
    
    // ............
    ```

    仔细的话可能会注意到我在匹配标题时用到了一个函数

    ```js
    /**
     * 数字生成器
     */
    export function *createNum() {  // 生成器函数传参毫无意义
        let n = 0
        while (true) {
            yield n;
            n++;
        }
    }
    ```

    每调用一次加一，这样就不会有漏网之鱼了，也不会存在 `id` 重复的情况

    ![](http://bozai.tech/images/1611394472699_hbeto9.png)

    之后就是利用 `cheerio` 将我们想要的标签筛选出来 —— 生成`a` 标签 —— 绑定事件 来进行锚连接进行跳转了。

    ```js
    <a :href="'#' + item.id" @click="linkJump">{{ item.text }}</a>
    
    linkJump (e) {
        e.preventDefault();
        const str = e.target.href.split('#')[1];
        if (str === '') return;
        const el = document.getElementById(str);
        const num = el.offsetTop;
        scrollTo(num);  // 上面我们封装的那个函数
    }
    ```

2. 公共组件在不同路由下的显示效果

    需求是这样的，我的导航栏想在不同的页面展现不同的 [效果](http://bozai.tech/)，但组件又在 `App.vue` 中，一个页面引用组件着实麻烦

    后来想到了 `vue-router` ，它上面不是可以设置 meta 参数吗，通过获取 `meta` 参数值来渲染不同的样式，给一个特定的 `class` （解决方式虽易，记录一下）

3. 数据缓存（性能优化）

    在博客 [笔记](http://bozai.tech/note/webLabel) 部分，具有众多的路由地址，每切换一次，客户端便会像服务器发送一次请求，如果在访问量特别大的情况下，会给服务器造成不小的压力

    解决方式：对数据做缓存，参考博客笔记 [Redis 响应缓存体](http://bozai.tech/note/webPage/redis/4)

## 完善功能

博客站点：

- [x] 登录、注册、邮箱验证、密码修改
- [x] 用户评论

后台管理系统：
- [x] 文件上传
- [x] 文章发布、编辑、删除
- [x] 留言、友链管理
- [x] 邮箱推送消息

### 联系我

微信：15581766609 （手机同号）

邮箱：1781926993@qq.com