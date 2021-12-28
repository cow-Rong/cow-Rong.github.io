# <center>**Object.defineProperty**</center>
<article align="left" padding="0 12px">

### Object.defineProperty

Object.defineProperty() 和 Proxy 对象————数据劫持
当访问或者修改某个对象的某个属性的时候，通过一段代码进行拦截，然后进行额外操作后返回结果

>Object.defineProperty(obj, prop, descriptor);

* descriptor——数据描述符
```javascript
const obj = {
  name: 'kongzhi'
};

// 对obj对象已有的name属性添加数据描述
Object.defineProperty(obj, 'name', {
  configurable: true | false,  // 可配置:是否可以删除目标属性
  enumerable: true | false,   // 是否可以被枚举，比如使用 for..in 或 Object.keys() 这样的
  value: '任意类型的值',       // 属性对应的值
  writable: true | false      // 属性的值是否可以被重写
});

// 对obj对象添加新属性的描述
Object.defineProperty(obj, 'newAttr', {
  configurable: true | false,
  enumerable: true | false,
  value: '任意类型的值',
  writable: true | false
});
```

* descriptor——访问器描述符
```javascript
const obj = {};

let initValue = 'kongzhi';

Object.defineProperty(obj, 'name', {
  get: function() {
      return initValue;
  },
  set: function(value) {
      initValue = value;
  },
  configurable: true | false,
  enumerable: true | false
});
```

### 使用场景
1. 双向绑定
```html
<!DOCTYPE html>
 <html>
    <head>
      <meta charset="utf-8">
      <title>标题</title>
    </head>
    <body>
      <input type="text" id="demo" />
      <div id="xxx">{{name}}</div>

      <script type="text/javascript">
        const obj = {};
        Object.defineProperty(obj, 'name', {
          set: function(value) {
            document.getElementById('xxx').innerHTML = value;
            document.getElementById('demo').value = value;
          }
        });
        document.querySelector('#demo').oninput = function(e) {
          obj.name = e.target.value;
        }
        obj.name = '';
      </script>
    </body>
</html>
```
2. 监听数组
数组赋值有一个新对象的时候，会执行set方法，但是当我们改变数组中的某一项值的时候，或者使用数组中的push等其他的方法，或者改变数组的长度，都不会执行set方法。
```typescript
const obj = {};

let initValue = 1;

Object.defineProperty(obj, 'name', {
  set: function(value) {
    console.log('set方法被执行了');
    initValue = value;
  },
  get: function() {
    return initValue;
  }
});

console.log(obj.name); // 1

obj.name = []; // 会执行set方法，会打印信息

// 给 obj 中的name属性 设置为 数组 [1, 2, 3], 会执行set方法，会打印信息
obj.name = [1, 2, 3];

// 然后对 obj.name 中的某一项进行改变值，不会执行set方法，不会打印信息
obj.name[0] = 11;

// 然后我们打印下 obj.name 的值
console.log(obj.name);

// 然后我们使用数组中push方法对 obj.name数组添加属性 不会执行set方法，不会打印信息
obj.name.push(4);

obj.name.length = 5; // 也不会执行set方法
```
重写 Array.property.push方法，并且生成一个新的数组赋值给数据
```typescript
const arrPush = {};

// 如下是 数组的常用方法
const arrayMethods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];
// 对数组的方法进行重写
arrayMethods.forEach((method) => {

  const original = Array.prototype[method]; 
  arrPush[method] = function() {
    console.log(this);
    return original.apply(this, arguments);
  }
});

const testPush = [];
// 对 testPush 的原型 指向 arrPush，因此testPush也有重写后的方法
testPush.__proto__ = arrPush;

testPush.push(1); // 打印 [], this指向了 testPush

testPush.push(2); // 打印 [1], this指向了 testPush
```
在vue中
```typescript
function Observer(data) {
  this.data = data;
  this.walk(data);
}

var p = Observer.prototype;

var arrayProto = Array.prototype;

var arrayMethods = Object.create(arrayProto);

[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function(method) {
  // 使用 Object.defineProperty 进行监听
  Object.defineProperty(arrayMethods, method, {
    value: function testValue() {
      console.log('数组被访问到了');
      const original = arrayProto[method];
      // 使类数组变成一个真正的数组
      const args = Array.from(arguments);
      original.apply(this, args);
    }
  });
});

p.walk = function(obj) {
  let value;
  for (let key in obj) {
    // 使用 hasOwnProperty 判断对象本身是否有该属性
    if (obj.hasOwnProperty(key)) {
      value = obj[key];
      // 递归调用，循环所有的对象
      if (typeof value === 'object') {
        // 并且该值是一个数组的话
        if (Array.isArray(value)) {
          const augment = value.__proto__ ? protoAugment : copyAugment;
          augment(value, arrayMethods, key);
          observeArray(value);
        }
        /* 
         如果是对象的话，递归调用该对象，递归完成后，会有属性名和值，然后对
         该属性名和值使用 Object.defindProperty 进行监听即可
         */
        new Observer(value);
      }
      this.convert(key, value);
    }
  }
}

p.convert = function(key, value) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log(key + '被访问到了');
      return value;
    },
    set: function(newVal) {
      console.log(key + '被重新设置值了' + '=' + newVal);
      // 如果新值和旧值相同的话，直接返回
      if (newVal === value) return;
      value = newVal;
    }
  });
}

function observeArray(items) {
  for (let i = 0, l = items.length; i < l; i++) {
    observer(items[i]);
  }
}

function observer(value) {
  if (typeof value !== 'object') return;
  let ob = new Observer(value);
  return ob;
}

function def (obj, key, val) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: true,
    writable: true,
    configurable: true
  })
}

// 兼容不支持 __proto__的方法
function protoAugment(target, src) {
  target.__proto__ = src;
}

// 不支持 __proto__的直接修改先关的属性方法
function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}


// 下面是测试数据

var data = {
  testA: {
    say: function() {
      console.log('kongzhi');
    }
  },
  xxx: [{'a': 'b'}, 11, 22]
};

var test = new Observer(data);

console.log(test); 

data.xxx.push(33);
```
参考：https://www.cnblogs.com/tugenhua0707/p/10261170.html
</article>