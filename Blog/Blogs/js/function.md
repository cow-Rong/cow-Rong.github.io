## <center>立即执行函数</center>
<article align="left" padding="0 12px">

### 立即执行函数：声明并马上调用这个匿名函数
```
(function(){alert('我是匿名函数')})() <———— 调用此函数
```
### 写法：
```
// 函数定义语句,
// JS引擎规定，如果function出现在行首，一律解析成语句，不能在后面直接加圆括号执行调用
function fn(){}

// 解决方法：将其放在一个圆括号里，JS引擎将其理解为一个表达式
(function(){

}())
或
(function(){

})()

// 表达式
var fn = function(){};

```

### 作用：
1. （改变）形成单独作用域（全局变量for循环问题），避免全局变量污染  
3. 封装临时变量（节省空间）  

### 全局变量的for循环问题：
 ```
 <body>
    <ul id="list">
        <li>公司简介</li>
        <li>联系我们</li>
        <li>营销网络</li>
    </ul>
    <script>
       var list = document.getElementById("list");
      var li = list.children;
      for(var i = 0 ;i<li.length;i++){
        li[i].onclick=function(){
          alert(i);  // 结果总是3.而不是0，1，2
        }
      }
     </script>  
</body>
 ```
alert总是3：  
因为i作用域是全局的，而不是给每个li分配一个i，
点击事件是异步的，for运行完之后，i已经变成3，再执行点击函数

解决方案1：  
```
// 立即执行函数
<body>
    <ul id="list">
        <li>公司简介</li>
        <li>联系我们</li>
        <li>营销网络</li>
    </ul>
    <script>
       var list = document.getElementById("list");
      var li = list.children;
      for(var i = 0 ;i<li.length;i++){
       ( function(j){
            li[j].onclick = function(){
              alert(j);
          })(i); 把实参i赋值给形参j
        }
      }
     </script>  
</body>
```

解决方案2：
```
ES6块作用域
<body>
    <ul id="list">
        <li>公司简介</li>
        <li>联系我们</li>
        <li>营销网络</li>
    </ul>
    <script>
       var list = document.getElementById("list");
      var li = list.children;
      for(let i = 0 ;i<li.length;i++){
        li[i].onclick=function(){
          alert(i);  // 结果是0，1，2
        }
      }
     </script>  
</body>
```
### 使用场景  

1、页面加载后必须执行一些设置工作，这些工作只执行一次，里面有些临时变量，出事后过程再也不会被用到，如果将这些变量作为全局变量，不是好主意，用立即执行函数包裹在局部作用域中，不会让任何变量泄露成全局变量。

```
当前时间：<span id="today"><span>
<script>
var result = (function(){
    var todaydom = document.getElementById('today');
    var days = [xxxx];
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var data = today.getDate();
    var day = today.getDay();
    var msg = year + "年" + month + ”月“ + date + ”日“ + days[day];
    todaydom.innerHTML = msg;
    return function(){
        return msg;
    }
})()
</script>
```
可以通过闭包将msg保存下来

### 立即执行函数的参数

如果立即执行函数中需要全局变量，全局变量（i实参）会被作为参数还给立即执行函数（j形参）
```
(function(j){
// 代码中可以使用j
})(i)
```

### 立即执行函数的返回值

立即执行函数能返回任何类型的值，比如对象，函数
```
var result = (function(){
    var res = 2+2;
    return function(){
        return res;
    }
})()
console.log(result());//4
```
立即执行函数的返回值（函数）赋给了一个变量result，执行result(),返回的函数被执行，返回res的值（这个值事先被计算并被存储在立即执行函数的闭包中）;

</article>


