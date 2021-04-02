# <center>vue路由</center>

### 基本使用：

安装vue-router引入VueRouter并且在当前vue示例中使用Vue.use(VueRouter)

```
<!-- 使用 router-link 组件来导航. -->
<!-- 通过传入 `to` 属性指定链接. -->
<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
<router-link to="/foo">Go to Foo</router-link>
<router-link to="/bar">Go to Bar</router-link>

<!-- 路由出口 -->
<!-- 路由匹配到的组件将渲染在这里 -->
<router-view></router-view>
```
>当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active

定义路由
```
// 创建 router 实例(注意顺序)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      // 会匹配以 `/user-` 开头的任意路径,$route.params.pathMatch会返回url通配符匹配的部分
      // this.$router.push('/user-admin') ————>this.$route.params.pathMatch = 'admin'
      path: '/user-*',
      name: 'Home',
      component: Home
    },
    {
      // 会匹配所有路径
      // this.$router.push('/non-existing') ————>this.$route.params.pathMatch = '/non-existing'
      path: '*',
      name: 'Home',
      component: Home
    }
  ]
})

// 挂载到根实例
const app = new Vue({
  router
}).$mount('#app')
```
在任何组件内可通过`this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由：
```
// Home.vue
export default {
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
```
### 动态路由匹配：
```
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:name', component: User }
  ]
})
```
/user/foo 和 /user/bar 都将映射到相同组件，组件实例会被复用
```
$route.params ——>{ name: 'foo' }、{ name: 'bar' }

/user/:username/post/:post_id ——> /user/evan/post/123
$route.params ——>{ username: 'evan', post_id: '123' }
```

因为两个路由都渲染复用同个组件，不再销毁再创建，所以**组件的生命周期钩子不会再被调用**。
此时如果相对路由参数变化做响应，在组件的watch中检测$route对象即可
```
watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
```
或者使用导航守卫
```
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
```
### 嵌套路由


### history模式
