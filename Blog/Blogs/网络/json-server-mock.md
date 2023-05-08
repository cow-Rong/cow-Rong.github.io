# <center>**json-server-mock**</center>

<article align="left" padding="0 12px">

### 基本使用篇

npm install json-server
创建文件夹 json-server,里面添加文件 db.json
在启动脚本中添加命令："mock": "json-server --watch json-server/db.json --port 3002"
执行命令 npm run mock 启动 mock 服务

```json
{
  "data1": [
    {
      "id": "001",
      "name": "sherry",
      "age": 13
    },
    {
      "id": "002",
      "name": "sherry",
      "age": 23
    }
  ]
}
```

GET http://localhost:3002/data1 返回 data1 下面的所有数据数组
GET http://localhost:3002/data1/001 返回 id="001"的单个对象
GET http://localhost:3002/data1?name=sherry 返回所有 name="sherry"的对象数组
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2

- 可以用 . 访问更深层的属性。

GET /comments?author.name=typicode

POST http://localhost:3002/data1 body 中是属性数据，添加 data1 数据

PUT http://localhost:3002/data1/001 body 中是属性数据，修改 data1 的 id="001"数据,没有则新增

PATCH http://localhost:3002/data1/001 body 中是属性数据，修改 data1 的 id="001"数据的属性

DELETE http://localhost:3002/data1/001 删除数组列表中 id="001"的一项

### 过滤参数

\_gte: 大于等于

\_lte: 小于等于

\_ne: 不等于

\_like: 包含

> http://localhost:3001/data1?age_gte=20&age_lte=30
> \_page：访问第几页数据

\_limit：一页多少条（默认一页 10 条）

\_sort：设定排序字段

\_order：设定排序的方式（升序：asc；降序：desc；默认升序）

> http://localhost:3001/data1?\_sort=age&\_order=asc

\_start：数据截取起始坐标

\_end：数据截取终止坐标

\_limit：截取数据条数

> http://localhost:3001/data1?\_start=0&\_end=1

### 关联查询

q：全文搜索关键字

> GET /posts?q=internet

\_embed：关联子实体。用来获取包含下级资源 children 的数据。

\_expand：关联父实体。用来获取包含上级资源 parent 的数据。

> 如下 db.json（comments 中的项，关联了 postId。所以 posts 是上级资源、comments 是下级资源）：

```json
{
  "posts": [
    { "id": 1, "title": "post的第一个title", "author": "typicode" },

    { "id": 2, "title": "post的第二个title", "author": "tangcaiye" }
  ],

  "comments": [
    { "id": 1, "body": "some comment1111", "postId": 2 },

    { "id": 2, "body": "some comment2222", "postId": 1 }
  ],

  "profile": { "name": "typicode" }
}
```

ps:
omments 每个 item 的 postId，指明当前 comment 与 posts 的关联。

即：第一条 comment 指明，它关联 posts 中 id=2 的 item，也就是  { "id": 2, "title": "post 的第二个 title", "author": "tangcaiye" } 这个对象。注意，这里的命名方式，严格遵循字面匹配。期望和 posts 数组进行关联时，关联 id 的 key，叫做 postId，期望和 tests 数组进行关联，关联 id 的 key，就叫做 testId。

> http://localhost:3001/posts?\_embed=comments

```js
;[
  {
    id: 1,
    title: 'post的第一个title',
    author: 'typicode',
    comments: [{ id: 2, body: 'some comment2222', postId: 1 }],
  },

  {
    id: 2,
    title: 'post的第二个title',
    author: 'tangcaiye',
    comments: [{ id: 1, body: 'some comment1111', postId: 2 }],
  },
]
```

> http://localhost:3001/comments?\_expand=post

```js
;[
  {
    id: 1,
    body: 'some comment1111',
    postId: 2,
    post: { id: 2, title: 'post的第二个title', author: 'tangcaiye' },
  },

  {
    id: 2,
    body: 'some comment2222',
    postId: 1,
    post: { id: 1, title: 'post的第一个title', author: 'typicode' },
  },
]
```

### 高级自定义篇

#### 自定义路由

json-server --watch --routes route.json db.json

```json
// route.json
{
  "/data/*": "/$1", // /data/data1  ==>  /data1
  "/:resource/:id/show": "/:resource/:id", //    /data1/001/show ==> /data1/001
  "/data1/:name": "/data1?name=:name", //    /data1/Sherry ==> /data1?name=Sherry
  "/:anyArray\\?id=:id": "/:anyArray/:id" //    /data1?id=002 ==> /data/002
}
```

#### 自定义配置文件

json-server --watch -c config.json db.json

```json
// config.json
{
  "port": 3001,

  "watch": true,

  "static": "./public",

  "read-only": false,

  "no-cors": false,

  "no-gzip": false,

  "routes": "route.json"
}
```

#### 创建动态数据

json-server data.js

```js
// data.js
module.exports = () => {
  const data = { users: [] }
  // Create 50 users
  for (let i = 0; i < 50; i++) {
    data.users.push({ id: i, name: `user${i}` })
  }
  return data
}
```

> http://localhost:3001/users

```js
// 返回
;[
  { id: 0, name: 'user0' },
  { id: 1, name: 'user1' },
  ...{ id: 49, name: 'user49' },
]
```

#### 自定义

node server.js

```js
// server.js
const jsonServer = require('json-server')

const $db = require('./db') // db.json。或返回db.json数据格式的，db.js文件
const server = jsonServer.create()

const middlewares = jsonServer.defaults()

const router = jsonServer.router($db)

server.use(router)

// Set default middlewares (logger, static, cors and no-cache)

server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser

server.use(jsonServer.bodyParser)

server.listen(3002, () => {
  console.log('JSON Server is running at 3002')
})
```

- 自定义路由

```js
// server.js
const jsonServer = require('json-server')

// db.json。或返回db.json数据格式的，db.js文件
const $db = require('./db')

// add::>>>引入自定义路由配置文件
const $routeHandler = require('./routeHandler')
const server = jsonServer.create()

const middlewares = jsonServer.defaults()

// add::>>>路由格式处理。需要加在 server.use(router) 前
server.use(jsonServer.rewriter($routeHandler($db)))
const router = jsonServer.router($db)

// add::>>>可以把整个路由挂载到另外一个地址:所有/data/*的请求，都等同于/*请求
// server.use('/data', router);
server.use(router)

// Set default middlewares (logger, static, cors and no-cache)

server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser

server.use(jsonServer.bodyParser)

server.listen(3002, () => {
  console.log('JSON Server is running at 3002')
})
```

- 自定义某个请求

```js
// server.js
const jsonServer = require('json-server')

const $db = require('./db') // db.json。或返回db.json数据格式的，db.js文件
const server = jsonServer.create()

const middlewares = jsonServer.defaults()

const router = jsonServer.router($db)

server.use(router)

// add::>>>自定义post请求的返回值,path=具体某个请求如：/data1
server.post(path, (req, res) => {
  var contentText = fs.readFileSync(path, 'utf-8')

  res.send(contentText)
})

// add::>>>自定义get请求的返回值,path=具体某个请求如：/data1
server.get(path, (req, res) => {
  var contentText = fs.readFileSync(path, 'utf-8')

  res.send(contentText)
})
// Set default middlewares (logger, static, cors and no-cache)

server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser

server.use(jsonServer.bodyParser)

server.listen(3002, () => {
  console.log('JSON Server is running at 3002')
})
```

- 自定义输出内容

```js
// server.js
const jsonServer = require('json-server')

const $db = require('./db') // db.json。或返回db.json数据格式的，db.js文件
const server = jsonServer.create()

const middlewares = jsonServer.defaults()

const router = jsonServer.router($db)

server.use(router)

// add::>>>
router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data,
  })
}

// Set default middlewares (logger, static, cors and no-cache)

server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser

server.use(jsonServer.bodyParser)

server.listen(3002, () => {
  console.log('JSON Server is running at 3002')
})
```

- 自定义用户校验

```js
// server.js
const jsonServer = require('json-server')

const $db = require('./db') // db.json。或返回db.json数据格式的，db.js文件
const server = jsonServer.create()

const middlewares = jsonServer.defaults()

const router = jsonServer.router($db)

server.use(router)

// add::>>>
server.use((req, res, next) => {
  if (isAuthorized(req)) {
    // add your authorization logic here

    next() // continue to JSON Server router
  } else {
    res.sendStatus(401)
  }
})

// Set default middlewares (logger, static, cors and no-cache)

server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser

server.use(jsonServer.bodyParser)

server.listen(3002, () => {
  console.log('JSON Server is running at 3002')
})
```

</article>
