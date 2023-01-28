# <center>**React.memo()**</center>
<article align="left" padding="0 12px">

## 如何使用React.memo()
// only renders if props have changed
### 包装函数
React v16.6.0出了一些新的包装函数(wrapped functions)，一种用于函数组件PureComponent / shouldComponentUpdate形式的React.memo()

本篇将介绍React.memo()的使用场景

>React.memo()是一个高阶函数，它与 React.PureComponent类似，但是一个函数组件而非一个类。[1]
```
import React  from 'react';

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date : new Date()
        }
    }

    componentDidMount(){
        setInterval(()=>{
            this.setState({
                date:new Date()
            })
        },1000)
    }

    render(){
        return (
            <div>
                <Child seconds={1}/>
                <div>{this.state.date.toString()}</div>
            </div>
        )
    }
}
```
现在有一个显示时间的组件,每一秒都会重新渲染一次，对于Child组件我们肯定不希望也跟着渲染，所有需要用到PureComponent

### PureComponent
```
class Child extends React.PureComponent {
    render(){
        console.log('I am rendering');
        return (
            <div>I am update every {this.props.seconds} seconds</div>
        )
    }
}
```
现在新出了一个React.memo()可以满足创建纯函数而不是一个类的需求

### React.memo()
```
function Child({seconds}){
    console.log('I am rendering');
    return (
        <div>I am update every {seconds} seconds</div>
    )
};
export default React.memo(Child)
```
>React.memo()可接受2个参数，第一个参数为纯函数的组件，第二个参数用于对比props控制是否刷新，与shouldComponentUpdate()功能类似。[2]
```
import React from "react";

function Child({seconds}){
    console.log('I am rendering');
    return (
        <div>I am update every {seconds} seconds</div>
    )
};

function areEqual(prevProps, nextProps) {
    if(prevProps.seconds===nextProps.seconds){
        return true
    }else {
        return false
    }

}
export default React.memo(Child,areEqual)
```
### React.memo() 与Redux[3]

>"react-redux": "5.1.0",
"redux": "4.0.1"
```
import React from "react";

function Child({seconds,state}){
    console.log('I am rendering');
    return (
      <div>
        <div>I am update every {seconds} seconds</div>
        <p>{state}</p>
      </div>
    )
};
const mapStateToProps = state => ({
    state: 'React.memo()用在connect()(内)'
});
export default connect(mapStateToProps)(React.memo(Child))
```
### 其他
>memoization方案在《JavaScript模式》和《JavaScript设计模式》都有提到。memoization是一种将函数执行结果用变量缓存起来的方法。当函数进行计算之前，先看缓存对象中是否有次计算结果，如果有，就直接从缓存对象中获取结果；如果没有，就进行计算，并将结果保存到缓存对象中。[4]

让我想到了计算斐波那契数列中有一个优化方案：利用惰性单例缓存对象进行优化，希望能受到一些启发。
```
    //惰性单例
    let fibonacci = (function() {
        let memory = {}    //memory设定为对象
        return function(n) {
            if(memory[n] !== undefined) {
                return memory[n]
            }
            return memory[n] = (n === 0 || n === 1) ? n : fibonacci(n-1) + fibonacci(n-2)
        }
    })()
```
原文：https://www.jianshu.com/p/b3d07860b778



</article>