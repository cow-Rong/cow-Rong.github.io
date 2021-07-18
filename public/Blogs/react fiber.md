# <center>**React Filber**</center>
<article align="left" padding="0 12px">

**React Fiber的机制**: 利用浏览器 requestIdleCallback 将可中断的任务进行分片处理，每一个小片的运行时间很短，这样唯一的线程就不会被独占

因为React Fiber Reconciliation 这个过程有可能暂停然后继续执行，所以挂载和更新之前的生命周期钩子就有可能不执行或者多次执行；

react为这几个生命周期钩子提供了别名，分别是：
UNSAFE_componentWillMount
UNSAFE_componentWillReceiveProps
UNSAFE_componentWillUpdate

#### 同步更新过程的局限









原文：https://zhuanlan.zhihu.com/p/26027085
https://www.jianshu.com/p/fc63256a3a16
https://www.cnblogs.com/penghuwan/p/6707254.html
</article>