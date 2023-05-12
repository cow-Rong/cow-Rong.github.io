# <center>**css原子化演进史**</center>

参考来源：https://juejin.cn/post/7181749210482475065

<article align="left" padding="0 12px">

### css语义化

##### 关注点分离（Separation of Concerns）
**关注点分离**：根据文本内容来命名类名，比如 greeting
但是 CSS 的嵌套结构里掺杂了 HTML 标签
反例：类 text-center 表明文本居中的设计，这违反了关注点分离的思路(*HTML 中只应该包含有关内容的信息，而所有的样式都应该交给 CSS 来实现*)，将样式信息渗入到了 HTML 中。

解决 CSS 样式嵌套的耦合，比较出名的是 **BEM**:跟 HTML 标记也没有了关联，CSS 类名也是语义化的
article__name
```css
.article{
    padding: 8px 12px;
    background: white;
 
    &__name{
        font-size: 20px;
    }
}
```
### css组件化
创建不依赖 HTML 内容的可复用的类名定义

常见的 UI 框架 Bootstrap 也采用这种思想 ，提供了包括：导航、标签、工具条、按钮等一系列组件

### css原子化

tailwindcss


</article>