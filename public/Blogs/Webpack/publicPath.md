# <center>**PublicPath**</center>
<article align="left" padding="0 12px">
最近在学习webpack打包原理及过程，在配置出口output时遇到了个难题，就是publicPath配置项，一直没搞明白他有什么作用，官网上就解释它是用来按需加载或者加载外部资源时要用到，当我们打包的时候webpack会在静态文件路径前面添加publicPath的值，当我们把资源放到CDN上的时候，把publicPath的值设为CDN的值就可以了，对于我这种小白来说肯迪是一脸懵逼，所以还是决定自己去一探究竟。
首先我想要说一下publicPath的作用是分环境的，在开发环境中，也就是启动webpack-dev-server时，webpack会将打包好的静态文件放在publicPath中，如果需要访问其中的资源直接加上pubilcPath路径就行，而在生产环境中，当时用webpack进行打包时，webpack会在静态文件前面加上publicPath的值，在这里你可能有个疑问，webpack-dev-server不是启动服务器吗，怎么会进行打包呢？？？？？，实际上是会的，只是我们看不到，他会实时监听你的代码，只要你的代码一变动，他就会打包，同时在默认情况下会将打包后的文件放入更目录下，如果你加上publicPath他就会帮你打包到指定的路径下。下面我们分两种情况来验证一下一个是手动创建的index.html,一个是webpack打包生成的index.html，通过这两种情况我们来分析下publicPath的作用。
首先我们自己搭建一个项目。

https://www.jianshu.com/p/775bc50c55c7
https://juejin.cn/post/6844903686632636423
* `output.path` 表示 output 目录对应的一个绝对路径。
* `output.publicPath` 表示打包生成的 index.html 文件里面引用资源的前缀。
* `devServer.publicPath` 表示打包生成的静态文件所在的位置，若 `devServer.publicPath` 没有设置，则会取 `output.publicPath` 的值。
* `devServer.contentBase` 表示服务器从哪里提供内容。一般只有在提供静态文件时才需要。

webpack:`output.publicPath`

在cra中：在`package.json`中配置`homepage`字段
```json
{
  "homepage": "/e-admin/"
}
```
或者脚本启动时候使用环境变量`PUBLIC_URL`
```json
{
  "script": {
    "build": "cross-env PUBLIC_URL=/e-admin/ node scripts/build.js"
  }
}
```

修改`publicPath`之后，如果路由使用history模式，需要给`Router`组件添加`basename`，
```html
<BrowserRouter
  basename="/e-admin"
>
  <App />
</BrowserRouter>
```
如果使用`history`
```ts
const history = createBrowserHistory({
  basename: '/e-admin'
})
```
静态服务器（使用nginx）做重定向配置
```nginx
# 因为前端使用了BrowserHistory，所以将路由 fallback 到 index.html
location /e-admin {
  try_files $uri $uri/ /e-admin/index.html;
}
```
</article>