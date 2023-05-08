# <center>**浏览器绘制和web性能**</center>
<article align="left" padding="0 12px">

Mac上的Shift+Cmd+P
PC上的Control+Shift+P

**输入render,找到Show Rendering,然后可以选择下列工具：**
* Layer borders:用于显示呈现的层的边框。
* paint flashing:用于突出显示重新绘制的网页区域。
* Layout Shift Regions:用于显示布局改变的区域。

如果需要更新样式：
* div.style.background=" "
* div.style.display=" "
* div.classList.add(' ') —— 为DIV添加class，class中包含执行的属性
* div.remove( ) —— 触发移除当前所有的节点，其他元素relayout（重新布局）

#### 三种更新方式
>**第一种，全走**   

比如 div.remove( ) —— 触发移除当前所有的节点，其他元素relayout（重新布局）

>**第二种，跳过Layout**

比如改变背景颜色，直接repaint（重新绘制）+composite（合成）

>**第三种，跳过Layout和Paint**

比如改变transform(变换)，只需composite（合成）

#### 各环节的优化方式
##### 优化JavaScript
* **对于动画效果的实现，避免使用 setTimeout 或 setInterval，请使用requestAnimationFrame。**
* 将长时间运行的 JavaScript 从主线程移到 Web Worker。
* 使用微任务来执行对多个帧的 DOM 更改。
* 使用 Chrome DevTools 的 Timeline 和 JavaScript 分析器来评估 JavaScript 的影响。

##### 优化Style（样式）
* **使用will-change或translate**
* 降低选择器的复杂性；使用以类为中心的方法，例如 BEM（块、 元素、修饰符）。
* 减少必须计算其样式的元素数量。

##### 优化Layout（布局）
* 布局的作用范围一般为整个文档。
* DOM 元素的数量将影响性能；应尽可能避免触发布局。
* 评估布局模型的性能；新版 Flexbox 一般比旧版 Flexbox 或基于浮动的布局模型更快。
* 避免强制同步布局和布局抖动；先读取样式值，然后进行样式更改

##### 优化Paint（绘制）
* 除 transform 或 opacity 属性之外，更改任何属性始终都会触发绘制。
* 绘制通常是像素管道中开销最大的部分；应尽可能避免绘制。
* 通过层的提升和动画的编排来减少绘制区域。
* 使用 Chrome DevTools 绘制分析器来评估绘制的复杂性和开销；应尽可能降低复杂性并减少开销。

##### 优化composite（合成）
* **坚持使用 transform 和 opacity 属性更改来实现动画。**
* 使用 will-change 或 translateZ 提升移动的元素。
* 避免过度使用提升规则；各层都需要内存和管理开销。
https://zhuanlan.zhihu.com/p/125057695


</article>