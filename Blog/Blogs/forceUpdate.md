# <center>**React 更新应用setState和forceUpdate**</center>
<article align="left" padding="0 12px">

React应用创建完成后，只有执行this.setState或this.forceUpdate方法才能更新应用，forceUpdate一般用得比较少，在有些比较另类的需求里比较适合吧。它们的使用方法如下:

setState(partialState,callback)　　;更新组件的state,partialState是新的state部分对象，callback是更新完成后的回调函数
forceUpdate(callback)　　　　　  ;强制更新整个应用，callback是更新完成后的回调函数

### 从setState, forceUpdate, unstable_batchedUpdates看React的批量更新

setState同步异步问题，React批量更新一直是一个比较模糊的问题，本文希望从框架设计的角度说明一下这个问题。

React有个著名的UI = f(data) 公式：UI是由data推导出来的，所以在写应用的时候，我们只需要关心数据的改变，只需data ---> data'， 那么UI ---> UI'，在这个过程中，我们其实并不关心UI是怎么变化到UI‘的（即DOM的变化），这部分工作是React替我们处理了。

那么React是如何知道当数据变化的时候，需要修改哪些DOM的呢？最简单暴力的是，每次都重新构建整个DOM树。实际上，React使用的是一种叫virtual-dom的技术：用JS对象来表示DOM结构，通过比较前后JS对象的差异，来获得DOM树的增量修改。virtual-dom通过暴力的js计算，大大减少了DOM操作，让UI = f(data)这种模型性能不是那么的慢，当然你用原生JS/jquery直接操作DOM永远是最快的。

#### setState 批量更新
除了virtual-dom的优化，减少数据更新的频率是另外一种手段，也就是React的批量更新。 比如：
```
g() {
   this.setState({
        age: 18
    })
    this.setState({
        color: 'black‘
    })
}

f() {
    this.setState({
        name: 'yank'
    })
    this.g()
}
```
会被React合成为一次setState调用
```
f() {
    this.setState({
        name: 'yank',
        age: 18, 
        color: 'black'
    })
}
```
我们通过伪码大概看一下setState是如何合并的。

setState实现
```
setState(newState) {
    if (this.canMerge) {
        this.updateQueue.push(newState)
        return 
    }

    // 下面是真正的更新: dom-diff, lifeCycle...
    ...
}
```
然后f方法调用
```
g() {
   this.setState({
        age: 18
    })
    this.setState({
        color: 'black‘
    })
}

f() {
    this.canMerge = true

    this.setState({
        name: 'yank'
    })
    this.g()

    this.canMerge = false
    // 通过this.updateQueue合并出finalState
    const finalState = ...  
    // 此时canMerge 已经为false 故而走入时机更新逻辑
    this.setState(finaleState) 
}
```
可以看出 setState首先会判断是否可以合并，如果可以合并，就直接返回了。

不过有同学会问：在使用React的时候，我并没有设置this.canMerge呀？我们的确没有，是React隐式的帮我们设置了！事件处理函数，声明周期，这些函数的执行是发生在React内部的，React对它们有完全的控制权。
```
class A extends React.Component {
    componentDidMount() {
        console.log('...')
    }

    render() {
        return (<div onClick={() => {
            console.log('hi')
        }}></div>
    }
}
```
在执行componentDidMount前后，React会执行canMerge逻辑，事件处理函数也是一样，React委托代理了所有的事件，在执行你的处理函数函数之前，会执行React逻辑，这样React也是有时机执行canMerge逻辑的。

批量更新是极好滴！我们当然希望任何setState都可以被批量，关键点在于React是否有时机执行canMerge逻辑，也就是React对目标函数有没有控制权。如果没有控制权，一旦setState提前返回了，就再也没有机会应用这次更新了。
```
class A extends React.Component {
    handleClick = () => {
        this.setState({x: 1})
        this.setState({x: 2})
        this.setState({x: 3})

        setTimeout(() => {
            this.setState({x: 4})
            this.setState({x: 5})
            this.setState({x: 6})
        }, 0)
    }   

    render() {
        return (<div onClick={this.handleClick}></div>
    }
}
```
handleClick 是事件回调，React有时机执行canMerge逻辑，所以x为1，2，3是合并的，handleClick结束之后canMerge被重新设置为false。注意这里有一个setTimeout(fn, 0)。 这个fn会在handleClick之后调用，而React对setTimeout并没有控制权，React无法在setTimeout前后执行canMerge逻辑，所以x为4，5，6是无法合并的，所以fn这里会存在3次dom-diff。React没有控制权的情况有很多： Promise.then(fn), fetch回调，xhr网络回调等等。

#### unstable_batchedUpdates 手动合并
那x为4，5，6有办法合并吗？是可以的，需要用unstable_batchedUpdates这个API，如下：
```
class A extends React.Component {
    handleClick = () => {
        this.setState({x: 1})
        this.setState({x: 2})
        this.setState({x: 3})

        setTimeout(() => {
            ReactDOM.unstable_batchedUpdates(() => {
                this.setState({x: 4})
                this.setState({x: 5})
                this.setState({x: 6})
            })
        }, 0)
    }   

    render() {
        return (<div onClick={this.handleClick}></div>
    }
}
```
这个API，不用解释太多，我们看一下它的伪码就很清楚了
```
function unstable_batchedUpdates(fn) {
    this.canMerge = true

    fn()

    this.canMerge = false
    const finalState = ...  //通过this.updateQueue合并出finalState
    this.setState(finaleState)
}
```
so, unstable_batchedUpdates 里面的setState也是会合并的。

#### forceUpdate的说明
forceUpdate从函数名上理解：“强制更新”。 既然是“强制更新”有两个问题容易引起误解：

forceUpdate 是同步的吗？“强制”会保证调用然后直接dom-diff吗？
“强制”更新整个组件树吗？包括自己，子孙后代组件吗？ 这两个问题官方文档都没有明确说明。
```
class A extends React.Component{

    handleClick = () => {
        this.forceUpdate()
        this.forceUpdate()
        this.forceUpdate()
        this.forceUpdate()
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <Son/> // 一个组件
            </div>
        )
    }
}
```
对于第一个问题：forceUpdate在批量与否的表现上，和setState是一样的。在React有控制权的函数里，是批量的。

对于第二个问题：forceUpdate只会强制本身组件的更新，即不调用“shouldComponentUpdate”直接更新，对于子孙后代组件还是要调用自己的“shouldComponentUpdate”来决定的。

所以forceUpdate 可以简单的理解为 this.setState({})，只不过这个setState 是不调用自己的“shouldComponentUpdate”声明周期的。

#### Fiber 的想象
显示的让开发者调用unstable_batchedUpdates是不优雅的，开发者不应该被框架的实现细节影响。但是正如前文所说，React没有控制权的函数，unstable_batchedUpdates好像是不可避免的。 不过 React16.x的fiber架构，可能有所改变。我们看下fiber下的更新
```
setState(newState){
    this.updateQueue.push(newState)
    requestIdleCallback(performWork)
}
```
requestIdleCallback 会在浏览器空闲时期调用函数，是一个低优先级的函数。

现在我们再考虑一下：
```
handleClick = () => {
        this.setState({x: 1})
        this.setState({x: 2})
        this.setState({x: 3})

        setTimeout(() => {
            this.setState({x: 4})
            this.setState({x: 5})
            this.setState({x: 6})
        }, 0)
    }
```
当x为1，2，3，4，5，6时 都会进入更新队列，而当浏览器空闲的时候requestIdleCallback会负责来执行统一的更新。

由于fiber的调度比较复杂，这里只是简单的说明，具体能不能合并，跟优先级还有其他都有关系。不过fiber的架构的确可以更加优雅的实现批量更新，而且不需要开发者显示的调用unstable_batchedUpdates

#### 广告时间
最后，广告一下我们开源的RN转小程序引擎alita，alita区别于现有的社区编译时方案，采用的是运行时处理JSX的方式。

所以alita内置了一个mini-react,这个mini-react同样提供了合成setState/forceUpdate更新的功能，并对外提供了unstable_batchedUpdates接口。如果你读react源码无从下手，可以看一下alita minil-react的实现，这是一个适配小程序的react实现， 且小。

alita地址：https://github.com/areslabs/alita。 欢迎star & pr & issue

原文地址：https://zhuanlan.zhihu.com/p/72929556
参考：https://cloud.tencent.com/developer/article/1499505

</article>