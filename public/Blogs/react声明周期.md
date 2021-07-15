# <center>**React生命周期函数**</center>
<article align="left" padding="0 12px">
 旧版：

 ![](2021-07-15-19-51-33.png)
生命周期图主要分为： 初始化阶段、挂载阶段、更新阶段、卸载阶段。

* **初始化(initialization)阶段**
>**constructor**
在constructor 中进行state、props的初始化，
这个阶段修改 state，不会执行更新阶段的生命周期，可以**直接对 state 赋值**。
父组件的props注入给子组件，功子组件读取(组件中**props只读不可变，state可变**)。

* **挂载阶段**
>**componentWillMount（弃）**
    发生在 render 函数之前，还**没有挂载 Dom**，**只会被调用一次**，这边调用this.setState不会引起组件重新渲染，也可以把写在这边的内容提前到constructor()中，很少用。
**render**
**componentDidMount**
    发生在 render 函数之后，**已经挂载 Dom**，**只会被调用一次**

* **更新阶段**
https://www.jianshu.com/p/514fe21b9914
组件的重新render：
1、setState引起的state更新
2、父组件重新引起的props更新
>*props：*
    **componentWillReceiveProps(nextProps,nextState)（弃）**
        这个生命周期主要为我们提供对 **props 发生改变的监听**，如果你需要在 props 发生改变后，相应改变组件的一些 state。在这个方法中**改变 state 不会二次渲染**，而是直接合并 state。
    **shouldComponentUpdate(nextProps,nextState)**
        这个生命周期需要返回一个 Boolean 类型的值，判断是否需要更新渲染组件，优化 react 应用的主要手段之一，当返回 false 就不会再向下执行生命周期了，在这个阶段不可以 setState()，会导致循环调用。
    **componentWillUpdate(nextProps,nextState)（弃）**
        这个生命周期主要是给我们一个时机能够处理一些在 Dom 发生更新之前的事情，如获得 Dom 更新前某些元素的坐标、大小等，在这个阶段不可以 setState()，会导致循环调用。
    **一直到这里 this.props 和 this.state 都还未发生更新**
    **render**
        执行 render 函数。
    **componentDidUpdate(prevProps, prevState)** 
        在此时已经完成渲染，Dom 已经发生变化，State 已经发生更新，prevProps、prevState 均为上一个状态的值。
**state（具体同上）**
    1. shouldComponentUpdate
    2. componentWillUpdate（**弃**）
    3. render
    4. componentDidUpdate

* **卸载阶段**
>componentWillUnmount
组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如:
1、清除 timer，
2、取消网络请求
3、清除在componentDidMount中创建的订阅等
componentWillUnmount 中不应调用 setState，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

所谓的 setState 是“异步”的，并非 setState 函数插入了新的宏任务或微任务，而是在进行到 componentDidUpdate 这个生命周期之前，React 都不会更新组件实例的 state 值。

</article>