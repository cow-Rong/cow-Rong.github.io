# <center>**Rxjs**</center>
<article align="left" padding="0 12px">

## 概念
RxJS 库：通过使用 observable 序列来编写异步和基于事件的程序。

核心类型 Observable，附属类型 (Observer、 Schedulers、 Subjects)

1. 异步行为产生的数据，可以被称之为一个流。
2. 在Rxjs中，称之为ovservalbe（抛开英文，本质其实就是一个数据的集合，只是这些数据不一定是一开始就设定好的，而是随着时间而不断产生的）。
3. Rxjs，就是为了处理这种流而产生的工具，比如流与流的合并，流的截断，延迟，消抖等等操作。

> 可以把 RxJS 当做是用来处理事件的 Lodash.

在 RxJS 中用来解决异步事件管理的的基本概念是：
* **Observable (可观察对象)**: 表示一个概念，这个概念是一个可调用的未来值或事件的集合。
* **Observer (观察者)**: 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
* **Subscription (订阅)**: 表示 Observable 的执行，主要用于取消 Observable 的执行。

```
import { Observable } from "rxjs";

// 构建一个流：stream$尾部的$是表示当前这个变量是个ovservable
const stream$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next([1, 2, 3]);
  }, 500);
  setTimeout(() => {
    subscriber.next({ a: 1000 });
  }, 1000);
  setTimeout(() => {
    subscriber.next("end");
  }, 3000);
  setTimeout(() => {
    subscriber.complete();
  }, 4000);
});

// 启动流
const subscription = stream$.subscribe({
  complete: () => console.log("done"),
  next: v => console.log(v),
  error: () => console.log("error")
});
// output
// [1,2,3]  // 500ms时
// {a:1000} // 1000ms时
// end // 3000ms时
// done // 4000ms时

```

* **Operators (操作符)**: 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。
* **Subject (主体)**: 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
* **Schedulers (调度器)**: 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他。






</article>