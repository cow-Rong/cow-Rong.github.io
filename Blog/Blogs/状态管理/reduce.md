# <center>**reduce**</center>
<article align="left" padding="0 12px">

```
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```
使用pipeline

```
[func1, func2].reduce((p, f) => p.then(f), Promise.resolve());
// 等同于
Promise.resolve().then(func1).then(func2);
// 等同于
let applyAsync = (acc,val) => acc.then(val);
let composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));
// 等同
let transformData = composeAsync(func1, asyncFunc1, asyncFunc2, func2);
transformData(data);

// 通过async/await
for (let f of [func1, func2]) { 
    await f();
}

```


</article>