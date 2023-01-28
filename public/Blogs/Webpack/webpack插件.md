# <center>**webpack**</center>
<article align="left" padding="0 12px">

#### html模板内容定制化：

想在跟页面打包后，插入我们特定script的引用，来达到全局变量的效果（暴露在Window下）
* `add-asset-html-webpack-plugin`
AddAssetHtmlPlugin`add-asset-html-webpack-plugin`：会将文件先复制到dist目录下
```
new AddAssetHtmlPlugin([
    {filepath: path.resolve(__dirname, '../src/axios.min.js'),
          outputPath: 'smc_public/dll/',
          publicPath: path.join(publicPath, 'smc_public/dll'),
          includeSourcemap: true}
  ])
```
* `html-webpack-tags-plugin`
HtmlWebpackTagsPlugin`html-webpack-tags-plugin`不会复制文件，需要配合CopyWebpackPlugin`copy-webpack-plugin`使用
```
plugins: [
  new CopyWebpackPlugin([
    { from: 'node_modules/bootstrap/dist/css', to: 'css/'},
    { from: 'node_modules/bootstrap/dist/fonts', to: 'fonts/'}
  ]),
  new HtmlWebpackTagsPlugin({
    links: ['css/bootstrap.min.css', 'css/bootstrap-theme.min.css']
  })
]
```
* `html-webpack-deploy-plugin`
html-webpack-tags-plugin的增强库
```

```
* `webpack-concat-plugin`
对于目标js资源, 会自动复制到当前webpack配置output目录下, 不需要配合copy-webpack-plugin使用.
```

```
* `webpack.ProvidePlugin`
*上述插件只是在script标签中插入脚本。本质上是挂载在window对象下。当我们想要暴露的全局变量不想在window对象下被找到（安全问题）时：*
webpack.ProvidePlugin
```
// 内置模块提供全局变量
   new webpack.ProvidePlugin({
        csm:path.resolve(__dirname, '../src/app.bundle.js')
    }),
```



</article>