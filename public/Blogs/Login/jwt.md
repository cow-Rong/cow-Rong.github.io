# <center>**jwt**</center>
<article align="left" padding="0 12px">

### 原理
登录后，服务器认证，生成一个json对象，通过加签名发送给客户端，之后通信，通过客户端每次请求的cookie中带的session_id：签名认证后值来识别用户

### 认证流程
1、浏览器发请求登录（用户名+密码）
2、服务器根据用户名和铭文密码到数据库验证身份，根据算法，将用户标识符打包成token
3、服务器返回jwt信息给浏览器
4、浏览器发请求获取用户数据（此后的请求中都带有token，一般放在header中的authorization中）
5、服务器接收请求验证token的用户信息后（再次签名？）返回用户数据
6、服务器可以在payload中设置过期时间，过期后让客户重新发起验证

### 数据结构
* header头部
```javascript
{ "alg": "HS256", "typ": "JWT"}   
// algorithm => HMAC SHA256
// type => JWT
```
* payload负载、载荷等字段
```javascript
iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：编号
```
* 签名（对前两部分简明，防止数据篡改）
```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```
ecret是一段字符串，后端保存，需要注意的是JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法。

### 使用方法
HTTP 请求的头信息Authorization字段里面, Bearer也是规定好的
```javascript
Authorization: Bearer <token>
```
通过url传输（不推荐）
```javascript
http://www.xxx.com/pwa?token=xxxxx
```
如果是post请求也可以放在请求体中

### demo
```typescript
let Koa = require('koa');
let Router = require('koa-router');
let bodyparser = require('koa-bodyparser');
let jwt = require('jwt-simple');
let router = new Router()
let app = new Koa();
app.use(bodyparser());
// 可以自己自定义
let secret = 'zhenglei';
// 验证是否登陆
router.post('/login',async(ctx)=>{ 
    let {username,password} = ctx.request.body;
    if(username === 'admin' && password === 'admin'){
       // 通常会查数据库，这里简单的演示
       let token =  jwt.encode(username, secret);
       ctx.body = {
            code:200,
            username,
            token,
       }
    }
});
// 验证是否有权限
router.get('/validate',async(ctx)=>{ 
    let Authorization = ctx.get('authorization')
    let [,token] = Authorization.split(' ');
    if(token){
        try{
            // 如果解密后的内容和之前的username一致，则验证通过
            let r = jwt.decode(token,secret);
            ctx.body = {
                code:200,
                username:r,
                token
            }
        }catch(e){
            ctx.body = {
                code:401,
                data:'没有登陆'
            }
        }
    }else{
        ctx.body = {
            code:401,
            data:'没有登陆'
        }
    }
  
});
app.use(router.routes());
app.listen(4000);
```
1. 两个接口 一个是/login 验证是否登录，一个是 validate,验证是否有权限
2. 请求login接口的时候，客户端带username和password, 后端一般会查数据库，验证是否存在当前用户，如果存在则为username进行签名，千万不要给password这些敏感信息也带进来签名
3. 客户端接收后端给的token令牌，再请求其他接口，比如这个例子的/validate的时候，ajax请求的时候，可以在header指定authorization字段，后端拿到token进行decode，然后将header和payload进行再一次的签名，如果前后的签名一致，说明没有被篡改过，则权限验证通过。因为是同步的过程，所以可以用try catch来捕捉错误

https://github.com/cow-Rong/lerna-repo
pakages-nodeserver

### 加密原理
1. sha256哈希算法，可以用nodejs的内置加密模块crypto, 生成base64字符串，要注意的是生成base64需要为+ - = 做一下替换，=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法。
2. token令牌的组成是header, payload和sigin的通过.来组成
3. base64urlUnescape的解码是固定写法，decode出base64的内容
```typescript
let myJwt = {
    sign(content,secret){
        let r = crypto.createHmac('sha256',secret).update(content).digest('base64');
        return this.base64urlEscape(r)
    },
    base64urlEscape(str){
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    },
    toBase64(content){
        return this.base64urlEscape(Buffer.from(JSON.stringify(content)).toString('base64'))
    },
    encode(username,secret){
        let header = this.toBase64({ typ: 'JWT', alg: 'HS256' });
        let content = this.toBase64(username);
        let sign = this.sign([header,content].join('.'),secret);
        return  [header,content,sign].join('.')
    },
    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    },
    decode(token,secret){
        let [header,content,sign] = token.split('.');
        let newSign = this.sign([header,content].join('.'),secret);
        if(sign === newSign){
            return Buffer.from(this.base64urlUnescape(content),'base64').toString();
        }else{
            throw new Error('被篡改')
        }
    }
}
```

### 优缺点
1. JWT默认不加密，但可以加密。生成原始令牌后，可以使用改令牌再次对其进行加密。
2. 当JWT未加密方法是，一些私密数据无法通过JWT传输。
3. JWT不仅可用于认证，还可用于信息交换。善用JWT有助于减少服务器请求数据库的次数。
4. JWT的最大缺点是服务器不保存会话状态，所以在使用期间不可能取消令牌或更改令牌的权限。也就是说，一旦JWT签发，在有效期内将会一直有效。
5. JWT本身包含认证信息，因此一旦信息泄露，任何人都可以获得令牌的所有权限。为了减少盗用，JWT的有效期不宜设置太长。对于某些重要操作，用户在使用时应该每次都进行进行身份验证。
6. 为了减少盗用和窃取，JWT不建议使用HTTP协议来传输代码，而是使用加密的HTTPS协议进行传输。


转自：https://juejin.cn/post/6873700061000237069

</article>