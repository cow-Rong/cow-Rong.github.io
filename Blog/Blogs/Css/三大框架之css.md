# <center>三大框架之css</center>
<article align="left" padding="0 12px">

覆盖第三方样式
```
less使用/deep/
css使用>>>
angular中用::ng-deep，同时前面加:host
```
https://developer.aliyun.com/article/623994
（Angular Vue React 框架中的 CSS）

### Angular
angular提供3种样式封装选项
* ViewEncapsulation.Native（会使用shadow Dom）
具有所有优点的原生 Shadow DOM
<br/>
* ViewEncapsulation.Emulated（默认） 
没有 Shadow DOM，但样式封装模拟,   
为组件的模板添加了一些属性  
<br/>
* ViewEncapsulation.None
完全没有 Shadow DOM。因此，也没有样式封装。
意味着所有样式都适用于整个文档

https://blog.thoughtram.io/angular/2015/06/29/shadow-dom-strategies-in-angular2.html

可修改：
```ts
@Component({
  moduleId: module.id,
  selector: '...',
  templateUrl: '....component.html',
  styles: [`...`],
  encapsulation: ViewEncapsulation.None
})
```

默认的：
![](2022-02-09-17-10-27.png)
* 每个组件的宿主元素都会被分配一个唯一的属性<code>_nghost_xxx</code>
* 每个组件模板中的每个元素还会被分配一个该组件特有的属性<code>_ngcontent_xxx</code>

这些属性是怎样用于样式隔离的呢？
```css
.blue-button[_ngcontent-yke-c11] {
    background: blue;
}
```
Angular 又是如何做到这些的呢？
>Angular 将通过 styles 或 styleUrls 组件属性来查看哪些样式与哪些组件相关联。之后Angular 会将这些样式和该组件中元素特有的属性应用到一起，将生成的 css 代码包裹在一个 style 标签中并放到 header 里。

#### :host, :host-context, ::ng-deep
* 使用 :host 伪类选择器，用来作用于组件（宿主元素）本身。
```css
/* [_nghost-yke-c11] */
:host {
  display: block;
  border: 1px solid red;
}
```
* 使用 :host-context() 伪类选择器，在当前组件宿主元素的祖先节点中查找 CSS 类， 直到文档的根节点为止。
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-theme',
  template: `
    <button class="btn-theme">Button</button>
  `,
  styles: [`
    :host-context(.blue-theme) .btn-theme {
      background: blue;
    }
    :host-context(.red-theme) .btn-theme {
      background: red;
    }
  `]
})
export class BtnThemeComponent { }
// 在运行的时候按钮背景就是蓝色的。
<div class="blue-theme">
  <app-btn-theme></app-btn-theme>
</div>
```
* 使用 ::ng-deep 伪类选择器，改变第三方组件的一些样式。
```css
/* [_nghost-yke-c12] h2 */
:host ::ng-deep h2 {
  color: yellow;
}
```
原理：位于::ng-deep 后面的类，去掉了自动添加的属性，这时候根据css 的后代选择器机制。<code>app-child[_nghost-mye-c12] .child_span</code>会选中child 组件下面的所有带有.child_span 类的标签，而且根据优先级计算，<code>app-child[_nghost-mye-c12] .child_span</code> 高于child 组件生成的<code>.child_span[_nghost-mye-c11] </code>，于是child 组件中的样式就被覆盖掉了。

为啥有时候会失效？
子元素优先级更高
child 组件生成的样式.<code>child-div[_nghost-mye-c11] .child-span[_nghost-mye-c11]</code> 优先级高于parent 组件生成的样式<code>app-child[_nghost-mye-c12] .child</code>

### Vue
Scoped CSS 
>Scoped CSS规范是Web组件产生不污染其他组件，也不被其他组件污染的CSS规范。

```html

<template>
  <div class="example">hi</div>
  <!-- 借助 PostCSS转换后 <div class="example" data-v-f3f3eg9>hi</div> -->
</template>

<style scoped>
/* .example[data-v-f3f3eg9]  */
.example {
  color: red;
}
</style>
```

```html
<template>  
    <BasePanel class=”pricing-panel”>content</BasePanel>
    <!-- <BasePanel class=”pricing-panel” data-v-d17eko1>content</BasePanel> -->
</template>

<style scoped>
/* .pricing-panel[data-v-b52c41] */
.pricing-panel {    
    width: 300px;    
    margin-bottom: 30px;  
}
</style>
```

模拟方案：

1. 随机选择器 css modules  
```html
<template>  
    <!-- <button class=”ComponentName__button__2Kxy”></button> -->
    <button :class="$style.button" />
</template>

<style module> 
/* .ComponentName__button__2Kxy */
.button {   
    color: red
}
</style>
```

2. 随机属性 ``` <div abc>----div[abc]{ }```

### React
css module
css-in-js
内联

</article>