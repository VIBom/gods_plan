# gods_plan

[toc] 

## 开发日志

### 1.0.0

1. 引入了https://codepen.io/TurkAysenur/pen/ZEpxeYm的UI设计

2. 对UI结构进行拆分组件以至于更好的开发体验

3. 更改了网页标题名，index.html 中 <title>热浪</title>

4. 修改网页图标 :记住一定要找到路径为止，去掉原先的ico后，vite好像配置自动寻找ico根路径会失效，所以一定要配置好相对路径

   ```html
   <link rel="shortcut icon" href="/public/favicon.ico">
   ```

<<<<<<< HEAD
5. 在gitee上传新分支：basis 

   基础分支，可以直接和主分支合并，即可回退到纯净版本



### 1.0.1
1. 通过@media控制自适应的宽度

@media:如果文档宽度小于 945 像素则让这个元素消失

```css
@media screen and (max-width: 945px) {
    display: none;
  }
```

2. 抽离全局的less，放入assets/style中，并完成全局less引入

   通过vite.config.ts配置css文件

   新建一个css对象，在css对象中新建一个预处理器对象preprocessorOptions

   在预处理器对象中，新建less对象

   插入键值对

   charset: false,

   additionalData: '@import "./src/assets/style/global.less";',

   ``` ts
   css: {
       // css预处理器
       preprocessorOptions: {
         less: {
           charset: false,
           additionalData: '@import "./src/assets/style/global.less";',
         },
   
       },
   ```


### 1.0.2

1. 引入嵌套路由概念，目前的计划：由主页（欢迎）和app主要内容两级，app父级路由内包含4个子路由

   --/

   --/app

   ----/apps

   ----/work

   ----/discover

   ----/market

2. SweetHome/index.vue（头部菜单栏）组件对应/app路由，默认重定向/apps(Apps组件)

3. 开始SweetHome/index.vue（头部菜单栏）组件的开发:

   一、派生点击事件，根据数字动态切换class，使点击的tab栏高亮

   二、派生获取焦点和失去焦点事件，使input搜索框动态展示，当获取焦点时，隐藏头部tab栏内的所有选项和内容，只显示Search搜索框，失去焦点则返回

4. 在根目录SweetHome文件夹下新建 Apps 、Discover、Knowledge、Music文件夹,分别新建index.vue（应用组件，发现组件，知识组件，音乐组件）

5. 开始Apps（侧边栏left-side）组件开发，主要是抽离右侧的主要内容区域，并且给左侧的每一栏绑定相应的路由router-link

6. 开始container（内容区域）组件开发，主要分All pps,Updates...等组件内容（待完善）

7. 对全局组件DarkLight进行开发，主要功能切换背景色

   ```js
   import { onMounted } from 'vue'
   // 通过点击事件，用户可以手动切换亮色主题或者暗色主题
   const toggleButton = () => {
     let status = localStorage.getItem('dark-light')
     if (status === 'dark') {
       localStorage.setItem('dark-light', 'light')
       document.body.classList.add('light-mode')
     } else if (status === 'light') {
       localStorage.setItem('dark-light', 'dark')
       document.body.classList.remove('light-mode')
     }
   }
   
   onMounted(() => {
     // 因为换肤是永久性的，不能刷新就又变成黑色模式，所以在挂在阶段就通过 localStorge 浏览器缓存 light 与 dark 的状态键值对
     let status = localStorage.getItem('dark-light')
     // 如果是 light ，就向 body 添加全局 class：light-mode
     if (status === 'light') {
       document.body.classList.add('light-mode')
     // 如果是 dark ，就向 body 删除全局 class：light-mode
     } else if (status === 'dark') {
       document.body.classList.remove('light-mode')
     // 如果不存在，就向用户存储默认dark
     } else {
       localStorage.setItem('dark-light', 'dark')
     }
   })
   ```

8. 通过js判断移动端还是web端,如果是移动端就删除video

   ```js
   // 识别用户是否是移动端，如果移动端，就让 video 标签失效
   const IsPc = () => {
     let userAgent = navigator.userAgent, Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
     return Agents.some((i) => {
       return userAgent.includes(i)
     })
   }
   let status  = IsPc()
   ```

   

### 1.0.s3

1. 完成了dialog组件，通过父向子defineProps传参和子向父传参emit 来开启关闭对话框，父组件通过插槽绘制input，手机号和验证码，并实现其功能（未完成

1. 完成了项目打包上线，但是因为路由使用了history模式，vue的单页面应用都是假路由，所以Nginx服务器刷新，真路由路径找不到，页面会报404找不到资源错误 

   ==解决方案==：在宝塔站点中修改域名伪静态，统一指向默认地址
   
   ```nginx
   if (!-e $request_filename) {
       rewrite ^/(.*) /index.html last;
       break;
   }
   ```
   
1. 测试axios跨域设置，后端接口postman验证成功，引入api.ts中进行登录验证~新增接口

   /==发送验证码==/==验证验证码==/==手机登录==

   并且当登录验证成功后在 pinia 中存入 userlist 数组中，由于登录成功后pinia获得的是proxy代理的对象，所以在pinia中引入了 toRaw 解析对象

   ```ts
   // 用户信息
       userInfoActions(userinfo: any) {
         this.userStore.userinfo = userinfo
         this.userStore.online = true
         setSession('userStore',toRaw(this.userStore))
       }
   ```

   

   但是解析的对象还不能存入sessionStroge,因为sessionStroge存储只接收字符串，所以在utils中封装了session.ts 专门把对象转化成json数据存入到sessionStroge中

   ```ts
   export const setSession = (key: string, value: any) => {
     if (typeof value == "object" || 'array') {//如果要存储对象，则先转为json串
       value = window.JSON.stringify(value);
     }
     sessionStorage.setItem(key, value);
   }
   ```

1. 完成登录接口的调试！在main.ts中封装了pinia持久化插件，防止刷新后数据丢失

   ```ts
   // pinia全局持久化
   type Options = {
     key?: string
   }
   
   const __pinaiaKey__: string = 'unknown'
   
   const setStorage = (key: string, value: unknown) => {
     localStorage.setItem(key, JSON.stringify(value))
   }
   const getStorage = (key: string) => {
     return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
   }
   
   const piniaPlugin = (options: Options) => {
     // console.log(options)
   
     return (context: PiniaPluginContext) => {
       const { store } = context
       const data = getStorage(`${options?.key ?? __pinaiaKey__}-${store.$id}`)
       console.log(data);
       
       // 当store发生改变时，触发subscribe
       store.$subscribe(() => {
         // 把用户需要的key和内容存入到localStorage
         setStorage(`${options?.key ?? __pinaiaKey__}-${store.$id}`, toRaw(store.$state))
       })
       // console.log(context, 'context')
       return {
         ...data
       }
     }
   
   }
   
   const store = createPinia()
   store.use(piniaPlugin({
     key: 'pinia'
   }))
   
   ```
   
   
   
1. 新增路由导航功能，对没有登录的访问者弹出回到首页中

   ``` js
   // 路由导航
   router.beforeEach((to,from,next) => {
     let loginStatus = localStorage.getItem('pinia-CloudMusic')
     if(whileList.includes(to.path) || loginStatus) {
       next()
     }else {
       alert('请登录后访问~')
       next({
         path:'/'
       })
     }
   })
   ```
   
   
   
1. 完成My Music模块的基本功能全部歌单已经实现（未来也许会添加评论等内容扩展，并且子标题中也可以加入滚轮监听事件，吸顶导航~），通过动态路由传参给playlistDetail模块传一个id参数

1. playlistDetail模块基本功能完善中，通过pinia记录上次传参的歌单id，这样用户去别的页面回来后还是在上次听歌的歌单里哦~（待：渲染歌单的所有歌曲、渲染此歌单的评论数）

1. 完成了My Home 的功能退出登录（其他功能暂定）



### 1.0.4



## 环境配置

#### npm 安装依赖

npm install element-plus

#### 在全局main.ts中引入 element-plus

```	ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
```



### 引入axios

#### npm 安装依赖

npm install axios -S



### 服务器跨域

详见gods_server开发日志
### 代理跨域配置

代理了 '/api' 和 '/backstage' 的 http 路径

rewrite 中使用正则过滤掉请求过去的 api 文件后缀名

target 中配置http路径代理，记得要补充域名和端口号

changeOrigin 开启跨域

```	
proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://124.223.168.27:8889',
        rewrite:path => path.replace(/^\/api/,'')
      },
      '/backstage': {
        changeOrigin: true,
        target: 'http://124.223.168.27:8887',
        rewrite:path => path.replace(/^\/backstage/,'')
      }
    },
```







This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
