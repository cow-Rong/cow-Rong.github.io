# <center>**React 的内联函数和性能**</center>
<article align="left" padding="0 12px">

#### “内联函数”是什么
在 React 的语境中，内联函数是指在 React 进行 "rendering" 时定义的函数。 人们常常对 React 中 "render" 的两种含义感到困惑，一种是指在 update 期间从组件中获取 React 元素（调用组件的 render 方法）；另一种是渲染更新真实的 DOM 结构。本文中提到的 "rendering"都是指第一种。

```ts
class App extends Component {
  // ...
  render() {
    return (
      <div>
        
        {/* 1. 一个内联的“DOM组件”事件处理程序 */}
        <button
          onClick={() => {
            this.setState({ clicked: true })
          }}
        >
          Click!
        </button>
        
        {/* 2. 一个“自定义事件”或“操作” */}
        <Sidebar onToggle={(isOpen) => {
          this.setState({ sidebarIsOpen: isOpen })
        }}/>
        
        {/* 3. 一个 render prop 回调 */}
        <Route
          path="/topic/:id"
          render={({ match }) => (
            <div>
              <h1>{match.params.id}</h1>}
            </div>
          )
        />
      </div>
    )
  }
}

```
#### 为什么人们说内联函数很慢？
两个原因：**内存/垃圾回收**问题和 **shouldComponentUpdate** 。

转自：https://juejin.cn/post/6844903586757885959
</article>