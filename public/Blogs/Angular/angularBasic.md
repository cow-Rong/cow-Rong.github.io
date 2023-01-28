# <center>**Angular7基础**</center>
<article align="left" padding="0 12px">

### 一、Angular模块

* Angular应用是模块化的，拥有自己的模块系统，称为NgModule。
* 一个NgModule是一个容器，里面存放一些内聚的代码块，这些代码块专注于某应用领域、某工作流或一组紧密相关的功能。
* NgModule可以包含组件、服务提供商、指令等，这些组件既可以在本模块中使用，也可以以某种方式供外部模块使用。
* 一个应用至少包含一个NgModule，我们成为根模块（AppModule），根模块和其他普通的模块有点不同，因为它要引导应用启动。

> 模块创建
> ng generate module 模块名

```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports:      [ BrowserModule ],
  providers:    [ Logger ],
  declarations: [ AppComponent ],
  exports:      [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```
@NgModule()函数是装饰器，其中的参数就是元数据对象，紧挨着的是模块类

* imports（导入表）——该模块**依赖**的**其他模块**应该写在这个数组中，这样本模块才可以使用其他模块导出的指令、组件、管道！
* providers（服务提供商）——本模块依赖或者提供的服务，一个模块级别的服务，可以被注入（被使用）到该模块的任何地方
* declarations（可声明对象表）——属于本模块的**组件、指令、管道**都应该放在这个数组中，这些可声明对象在本模块中随处可用。它们三者是Angular中唯三的**可声明对象**！
*注意*：同一个可声明对象不能出现在两个模块中，只需要也只能在一个Angular模块中声明。
* exports（导出表）——本模块**提供给其他外部模块使用的可声明对象**（一定是declarations数组的子集），其他模块可以通过导入该模块（写在imports数组中）来使用这些可声明对象
* bootstrap：启动引导的组件，或者也叫根组件，Angular**在启动引导的时候**，会**将这数组中的组件插到index.html页面**中，默认只有一个根组件（随着引用扩大，会形成单根组件树），当然你也可以在该组件放多个引导启动的组件，这样这些组件都会是自己组件树的根
>**根模块**和普通模块的区别就在于这个**bootstrap**，因为，boostrap只应该出现在根模块中!

#### 思考
我们应该将什么样的可声明对象写在这个exports数组中呢？

### 二、组件和模板


</article>