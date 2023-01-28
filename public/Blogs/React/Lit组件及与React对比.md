# <center>**跨框架组件Lit与React对比**</center>
<article align="left" padding="0 12px">

随着前端框架的流行，组件化开发已经趋于常态，我们通常会把功能通用的模块抽取然后封装成单个组件，这样使用和维护起来都会变得更加简单。
但组件也受限于框架，例如一旦离开框架本身，组件就无法使用了，那有没有跨越框架范围的技术构建通用的组件呢？有的，那就是 Web Components。

### 一、Web Components
Web Componets是一组web平台的Api集合，允许你创建自定义、可重用的web组件，它可以在**任何前端框架**中使用，是浏览器自带的api，兼容当前流行所有浏览器。

### 二、什么是Lit
Lit是一个轻量级的**Web Componets库**，可以在任何框架或根本没有框架的情况下快速开发组件Web Componets。

### 三、Lit与React对比
Lit 的基本概念和功能在很多方面与 React 相似，但也有一些关键区别，本文通过对比方式来介绍其基本功能：

#### 1、JSX和Lit模板：
JSX 是一个 JavaScript 语法扩展，允许 React 用户在他们的 JavaScript 代码中轻松创建模板。它可以很好地描述 UI，呈现出它应有交互的本质形式。
在 React 中，你会像这样渲染一个 JSX Hello World：
```
import 'react';
import ReactDOM from 'react-dom';

const name = 'Josh Perez';
const itemsToBuy = [
  <li>Bananas</li>,
  <li>grapes</li>
];
const disabled = false;
const myClass = 'my-class';
const value = 'myvalue';

const element = (
  <>
    <h1>Hello, {name}</h1>
    <ol>
      {itemsToBuy}
    </ol>
    <input
      disabled={disabled}
      className={`static-class ${myClass}`}
      defaultValue={value}
      onChange={e => console.log(e.target.value)}
      />;
  </>
);

ReactDOM.render(
  element,
  mountNode
);
```
上面的例子在 Lit 中:
```
import {html, render} from 'lit';

const name = 'Josh Perez';
const itemsToBuy = [
  html`<li>Bananas</li>`,
  html`<li>grapes</li>`
];
const element = html`
  <h1>Hello, ${name}</h1>
  <ol>
    ${itemsToBuy}
  </ol>
  <input
      ?disabled=${disabled}
      class="static-class ${myClass}"
      .value=${value}
      @input=${e => console.log(e.target.value)}
      >
  `;

render(
  element,
  mountNode
);
```
**总结**：
1、Lit中模板变量用${}
2、Lit中通过前缀?是用于激活或停用元素上的属性的绑定语法
3、Lit中通过前缀.是用于设置元素属性的绑定语法
4、Lit中通过前缀@是事件侦听器的绑定语法

#### 2、属性和状态：
React中，通过**props和state**绑定属性：
```
import React from 'react';
import ReactDOM from 'react-dom';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

const element = <Welcome name="Elliott"/>
ReactDOM.render(
  element,
  mountNode
);
```
在Lit中通过@**property和@state**来绑定属性：
```
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators';

@customElement('welcome-banner')
class WelcomeBanner extends LitElement {
  // 外部传入属性
  @property({type: String})
  name = '';

  // 内部属性
  @state
  myname = '';

  render() {
    return html`<h1>Hello, ${this.name}</h1>`
  }
}
```
html文件中引用组件：
```
 <welcome-banner name="Elliott"></welcome-banner>
```
#### 3、生命周期：
React中:
```
import React from 'react';

class MyEl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  render() {
    return <div>Hello World</div>
  }

  componentDidMount() {
    this._chart = new Chart(this.chartElRef.current, {...});
    this.window.addEventListener('resize', this.boundOnResize);
  }

  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title) {
      this._chart.setTitle(this.props.title);
    }
  }

  componentWillUnmount() {
    this.window.removeEventListener('resize', this.boundOnResize);
  }
}
```
Lit中:
```
class MyEl extends LitElement {
  @property({type: Number}) counter = 0;
  constructor() {
    this.counter = 0;
  }

  render() {
    return html`<div>Hello World</div>`;
  }

  firstUpdated() {
    this._chart = new Chart(this.chartEl, {...});
  }

  connectedCallback() {
    super.connectedCallback();
    this.window.addEventListener('resize', this.boundOnResize);
  }

  updated(prevProps: PropertyValues<this>) {
    if (prevProps.has('title')) {
      this._chart.setTitle(this.title);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.window.removeEventListener('resize', this.boundOnResize);
  }
}

```
**总结**：
|  React   | Lit  | 说明  |
|  ----  | ----  | ----  |
| constructor  | constructor |\|
| render  | render |\|
| componentDidMount  | firstUpdated+connectedCallback |firstUpdated:第一次在组件根处呈现组件模板时调用;connectedCallback:每次将自定义元素插入 DOM 树时都会调用|
| componentDidUpdate  | updated |\|
| componentWillUnmount  | disconnectedCallback |\|

#### 4、子组件和插槽：
在React中，子组件默认通过props.children继承，例如：
```
const MyArticle = (props) => {
 return <article>{props.children}</article>;
};

```
其中props.children是 React 组件而不是 HTML 元素。
在Lit中，子组件在渲染函数中由插槽元素引入，连接进来的是HTMLElement，这种连接成为**投影**。
```
@customElement("my-article")
export class MyArticle extends LitElement {
  render() {
    return html`
      <article>
        <slot></slot>
      </article>
   `;
  }
}
```
**多插槽：**
```
// React
const MyArticle = (props) => {
  return (
    <article>
      <header>
        {props.headerChildren}
      </header>
      <section>
        {props.sectionChildren}
      </section>
    </article>
  );
};

// Lit
@customElement("my-article")
export class MyArticle extends LitElement {
  render() {
    return html`
      <article>
        <header>
          <slot name="headerChildren"></slot>
        </header>
        <section>
          <slot name="sectionChildren"></slot>
        </section>
      </article>
   `;
  }
}

```
对应上面的my-article（React中MyArticle）组件，分配具名插槽方式如下：
```
// React
const MyNewsArticle = () => {
 return (
   <MyArticle
     headerChildren={<h3>Extry, Extry! Read all about it!</h3>}
     sectionChildren={<p>Children are props in React!</p>}
   />
 );
};

// Lit
@customElement("my-news-article")
export class MyNewsArticle extends LitElement {
  render() {
    return html`
      <my-article>
        <h3 slot="headerChildren">
          Extry, Extry! Read all about it!
        </h3>
        <p slot="sectionChildren">
          Children are composed with slots in Lit!
        </p>
      </my-article>
   `;
  }
}

```
#### 5、Refs：
在 React 中，refs 是包含生成的 HTMLElement 的内存空间：
```
const RefsExample = (props) => {
 const inputRef = React.useRef(null);
 const onButtonClick = React.useCallback(() => {
   inputRef.current?.focus();
 }, [inputRef]);

 return (
   <div>
     <input type={"text"} ref={inputRef} />
     <br />
     <button onClick={onButtonClick}>
       Click to focus on the input above!
     </button>
   </div>
 );
};
```
在上面的示例中，React 组件将执行以下操作：
* 渲染一个空文本条目和一个带有文本的按钮
* 单击按钮时聚焦输入

在Lit中:
```
@customElement("my-element")
export class MyElement extends LitElement {
  @query('input') // Define the query
  inputEl!: HTMLInputElement; // Declare the prop

  // Declare the click event listener
  onButtonClick() {
    // Use the query to focus
    this.inputEl.focus();
  }

  render() {
    return html`
      <input type="text"></input>
      <br />
      <button @click=${this.onButtonClick}>
        Click to focus on the input above!
      </button>
   `;
  }
}
```
装饰器@**query和@queryAll**分别执行querySelector和querySelectorAll，等价于：
```
get inputEl() {
  return this.renderRoot.querySelector('input');
}
```
#### 6、组件间传值：
React数据流自顶向下,父元素通过props传递状态给子元素，子元素通过props中的回调于父元素交流：
```
const CounterButton = (props) => {
  const label = props.step < 0
    ? `- ${-1 * props.step}`
    : `+ ${props.step}`;

  return (
    <button
      onClick={() =>
        props.addToCounter(props.step)}>{label}</button>
  );
};
```
上面示例写 Lit 组件：
```
@customElement('counter-button')
export class CounterButton extends LitElement {
  @property({type: Number}) step: number = 0;

  onClick() {
    const event = new CustomEvent('update-counter', {
      bubbles: true,
      detail: {
        step: this.step,
      }
    });

    this.dispatchEvent(event);
  }

  render() {
    const label = this.step < 0
      ? `- ${-1 * this.step}`  // "- 1"
      : `+ ${this.step}`;      // "+ 1"

    return html`
      <button @click=${this.onClick}>${label}</button>
    `;
  }
}
```
Lit中回调通常通过dispatchEvent分发事件。

#### 7、样式：
Lit内联样式：
```
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators';

@customElement('my-element')
class MyElement extends LitElement {
  render() {
    return html`
      <div>
        <h1 style="color:orange;">This text is orange</h1>
      </div>
    `;
  }
}
```
Lit CSS模板样式：
```
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators';

const ORANGE = css`orange`;

@customElement('my-element')
class MyElement extends LitElement {
  static styles = [
    css`
      #orange {
        color: ${ORANGE};
      }
    `
  ];

  render() {
    return html`
      <div>
        <h1 id="orange">This text is orange</h1>
      </div>
    `;
  }
}
```
Lit样式表达式：
```
import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators';
import {styleMap} from 'lit/directives/style-map';

@customElement('my-element')
class MyElement extends LitElement {
  @property({type: String})
  color = '#000'

  render() {
    // Define the styleMap
    const headerStyle = styleMap({
      'border-color': this.color,
    });

    return html`
      <div>
        <h1 style="border-style:solid;
          <!-- Use the styleMap -->
          border-width:2px;${headerStyle}">
          This div has a border color of ${this.color}
        </h1>
      </div>
    `;
  }
}
```
### 四、总结
Lit 以更小更快的性能体验，不需要编译即可运行的快捷，适用于任意框架的优势，非常适合作为web组件输出，嵌入到任意需要复用组件的页面。

</article>