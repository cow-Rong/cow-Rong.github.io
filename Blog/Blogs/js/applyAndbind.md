# <center>apply、bind和call</center>

### 作用
**call和apply是调用函数，bind是返回一个新的函数（绑定函数）**

MDN解释：
>call() 方法***调用***一个函数, 其具有一个指定的this值和分别地提供的参数(参数的列表)。  fun.call(thisObj,arg1,arg2,...)
>apply() 方法***调用***一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数。  fun.apply(thisObj,[arg1,arg2,...])
>bind()方法***新建***一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。  var funObj = fun.bind(obj,arg1,arg2,...)

### 为什么要改变this指向
```
var name="lucy";
let obj={
 name:"martin",
 say:function () {
 console.log(this.name);
 }
};

// 正常情况下 say 方法中的 this 是指向调用它的 obj 对象的
obj.say(); //martin，this指向obj对象

/* 定时器 setTimeout 中的 say 方法中的 this 是指向window对象的(在浏览器中),
   因为 say 方法在定时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行,
   我们需要的是 say 方法中 this 指向obj对象，因此我们需要修改 this 的指向。
*/

setTimeout(obj.say,0); //lucy，this指向window对象
```

### 先说一下call和apply的不同点  

这两个函数都是为了改变函数运行时的上下文（改变函数内部this指向），返回函数执行结果  
————只有一点，那就是向函数传递参数的方式不同。
```
// call是逐个的向函数传递参数
fun.call(thisObj,arg1,arg2,...)

// apply是通过将参数以数组的形式传递到函数中
fun.apply(thisObj,[arg1,arg2,...])
```

### bind绑定函数
```
var obj={};
function test(){
    console.log(this === obj);
} 

test() // false

// 绑定函数testObj内部this指向创建它时传入bind的第一个参数
var testObj = test.bind(obj,arg1,arg2,...);
testObj(); // true
``` 
*注意*：绑定函数(bind函数返回的新函数)不可以再通过apply和call改变其this指向，即当绑定函数调用apply和call改变其this指向时，并不能达到预期效果。

### 使用场景
1.将类数组转换成数组
```
// arguments
// 返回值为数组，arguments保持不变
var arg = [].slice.call(arguments);

// nodeList
var nList = [].slice.call(document.getElementsByTagName('li'));
```  

2.方法借用,改变函数的this
```
var foo = {
    name: 'joker',
    showName: function() {
        console.log(this.name);
    }
};
var bar = {
    name: 'rose'
};

foo.showName.call(bar); // rose
```  

3.在继承中应用?????
```
// parent
var Person = function(name) {
    this.name = name;
    this.gender = ['man', 'woman'];
}

// child
var Student = function(name, age) {

    // inherit
    Person.call(this);
}
Student.prototype.message = function() {
    console.log('name:'+this.name+', age:'+this.age+', gender:.'+this.gender[0]);
}

var xm = new Student('xiaom', 12);
xm.message(); //name:undefined, age:undefined, gender:.man
```  

4.判断数据的类型
```
let arrayType = Object.prototype.toString.apply([])
let objType = Object.prototype.toString.apply({})
let stringType = Object.prototype.toString.apply("wwwww")
let numberType = Object.prototype.toString.apply(1111)
let nullType = Object.prototype.toString.apply(null)
let undefinedType = Object.prototype.toString.apply(c)
console.log(arrayType,objType,stringType,numberType,nullType,undefinedType)
//[object Array] [object Object] [object String] [object Number] [object Null] [object Undefined]
```
上面的apply换成call也可以

### 实现原理
myBind:
```
Function.prototype.myBind = function() {
    var _this = this;
    var context = [].shift.call(arguments);// 保存需要绑定的this上下文
    var args = [].slice.call(arguments); //剩下参数转为数组
    console.log(_this, context, args);
    return function() {
        return _this.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
};
```
myCall:
```
/**
 * 每个函数都可以调用call方法，来改变当前这个函数执行的this关键字，并且支持传入参数
 */
Function.prototype.myCall = function(context) {
    //第一个参数为调用call方法的函数中的this指向
    var context = context || global;
    //将this赋给context的fn属性
    context.fn = this;//此处this是指调用myCall的function

    var arr = [];
    for (var i=0,len=arguments.length;i<len;i++) {
        arr.push("arguments[" + i + "]");
    }
    //执行这个函数，并返回结果
    var result = eval("context.fn(" + arr.toString() + ")");
    //将this指向销毁
    delete context.fn;
    return result;
}
```

myApply:
```
/**
 * apply函数传入的是this指向和参数数组
 */
Function.prototype.myApply = function(context, arr) {
    var context = context || global;
    context.fn = this;
    var result;
    if (!arr) {
        result = context.fn(); //直接执行
    } else {
        var args = [];
        for (var i=0,len=arr.length;i<len;i++) {
            args.push("arr[" + i + "]");
        }
        result = eval("context.fn([" + args.toString() + "])");
    }
    //将this指向销毁
    delete context.fn;
    return result;
}
```

