# <center>**Refs**</center>
<article align="left" padding="0 12px">

#### string类型Refs
* 问题：
1. 它要求 React 跟踪当前呈现的组件（因为它无法猜测this）。这使得 React 有点慢。
2. 它不像大多数人所期望的那样使用“渲染回调Render Callback”模式（例如），因为 ref 会因为上述原因``<DataGrid renderRow={this.renderRow} />``而被放置。DataGrid
3. 它是不可组合的，即如果一个库在传递的子节点上放置一个 ref，用户不能在它上面放置另一个 ref（例如在 ReactTransitionGroup 中获取 refs 的任何更好的方法？ #8734）。回调引用是完全可组合的。

```js
/*Render Callback  */
const foo = (hello) => {
  return hello('foo')
}

foo((name) => {
  return `hello from ${name}`
})

// hello from foo
```

#### 回调Refs
* 更精细的控制何时refs被设置和解除

通过传递函数
函数中接收React组件实例或者Dom元素，使它们能在其他地方被存贮和访问

```ts
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

```
在组件挂载时，会调用 ref 回调函数并传入 DOM 元素，当卸载时调用它并传入 null。
componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的。

组件间传递回调形式的 refs:
```ts
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```
Parent 中的 this.inputElement 被设置为与 CustomTextInput 中的 input 元素相对应的 DOM 节点


#### createRef
> React 16.3 版本引入的 React.createRef()
```ts
/* 创建 */
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
/* 访问 */
const node = this.myRef.current;
```
ref 的值根据节点的类型而有所不同：
* 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
* 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
* **你不能在函数组件上使用 ref 属性**，因为他们没有实例。
> 如果要在函数组件中使用 ref，你可以使用 forwardRef（可与 useImperativeHandle 结合使用），或者可以将该组件转化为 class 组件。

#### 将DOM Refs暴露给父组件
 16.3 或更高版本的 React:
* **ref转发**
将ref自动通过组件床底到子组件
```ts
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
>* 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。
> * 常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。

Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。
16.2 或更低版本的 React
* **将 ref 作为特殊名字的 prop 直接传递**
在子组件上露出一个特殊的属性。这个属性可以命名为 ref 以外的任何名称（例如 inputRef）。然后子组件可以将 prop 作为 ref 属性转发到 DOM 节点。这让父级通过中间的组件将其 ref 传递给子级的 DOM 节点。
```ts
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}
```

#### 区别于useRef
```ts
const refContainer = useRef(initialValue);
```
>useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。

常见场景：命令式访问子组件：
```ts
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
区别：
* ref 对象以``<div ref={myRef} />``形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 .current 属性设置为相应的 **DOM 节点**。
* useRef() 比 ref 属性更有用。它可以很方便地**保存任何可变值**，其类似于在 class 中使用实例字段的方式。

*useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。*

当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。
<article>