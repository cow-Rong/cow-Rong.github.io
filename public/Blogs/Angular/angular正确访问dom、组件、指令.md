# <center>**Angular正确访问dom、组件、指令**</center>
<article align="left" padding="0 12px">


#### @ViewChild属性装饰器

应用场景：
* 访问父组件中的子组件元素、
* 表单属性脏检查、
* 触发事件，
* 父组件中的指令

在 ngAfterViewInit 钩子函数中、后可以正确获取到元素

**@ViewChild 获取组件服务Service类**
* 子组件通过(providers)提供服务类ChildService：
```
import {Component, OnInit} from '@angular/core';
import {ChildService} from './child.service';

@Component({
  selector: 'app-child',
  template: `
    <h1>自定义的一个子组件</h1>
  `,
  providers: [
    ChildService
  ]
})
export class ChildComponent implements OnInit {

  constructor(public childService: ChildService) {
  }

  ngOnInit() {
  }

}
```
父组件通过@ViewChild 拿到服务类
```
 @ViewChild(ChildService) childService: ChildService;
```
* 组件provider通过string token提供的服务类
```
import {Component} from '@angular/core';
import {StringTokenValue} from './string-token-value';

@Component({
  selector: 'app-child',
  template: `
    <h1>自定义的一个子组件</h1>
  `,
  styleUrls: ['./child.component.less'],
  providers: [
    {provide: 'tokenService', useClass: StringTokenValue}
  ]
})
export class ChildComponent {


}
```
子组件的pprovider通过 string token valued的形式提供了一个StringTokenValue类，string token 对应的是tokenService。

父组件里面我们就可以拿到子组件provider的这个StringTokenValue类：
```
@ViewChild('tokenService') tokenService: StringTokenValue;
```
**@ViewChild 使用模板变量名**
```
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to Angular World</h1>
    <p #greet>Hello {{ name }}</p>
  `,
})
export class AppComponent {
  name: string = 'Semlinker';

  @ViewChild('greet') greetDiv: ElementRef;

  ngAfterViewInit() {
    console.dir(this.greetDiv);
  }
}
```
编译后ES5的代码片段

```
var core_1 = require('@angular/core');

var AppComponent = (function () {
    function AppComponent() {
        this.name = 'Semlinker';
    }
    __decorate([
        core_1.ViewChild('greet'), // 设定selector为模板变量名
        __metadata('design:type', core_1.ElementRef)
], AppComponent.prototype, "greetDiv", void 0);
```

**@ViewChild 使用模板变量名及设置查询条件**
```
import { Component, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to Angular World</h1>
    <template #tpl>
      <span>I am span in template</span>
    </template>
  `,
})
export class AppComponent {

  @ViewChild('tpl') tplRef: TemplateRef<any>;

  @ViewChild('tpl', { read: ViewContainerRef }) tplVcRef: ViewContainerRef;

  ngAfterViewInit() {
    console.dir(this.tplVcRef);
    this.tplVcRef.createEmbeddedView(this.tplRef);
  }
}
```
**@ViewChild 使用类型查询**
child.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'exe-child',
    template: `
      <p>Child Component</p>  
    `
})
export class ChildComponent {
    name: string = 'child-component';
}
```
app.component.ts
```
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'my-app',
  template: `
    <h4>Welcome to Angular World</h4>
    <exe-child></exe-child>
  `,
})
export class AppComponent {

  @ViewChild(ChildComponent) childCmp: ChildComponent;

  ngAfterViewInit() {
    console.dir(this.childCmp);
  }
}
```
**@ViewChild 获取到指定指令对象**
```
import {Directive, ElementRef} from '@angular/core';

/**
 * 指令，测试使用,这里使用了exportAs，就是为了方便我们精确的找到指令
 */
@Directive({
  selector: '[appTestDirective]',
  exportAs: 'appTest'
})
export class TestDirective {

  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.value = '我添加了指令';
  }

}
```


参考：
https://tommy0604.github.io/%E6%B7%B1%E5%85%A5%E5%88%86%E6%9E%90Angular%E4%B8%AD%E7%9A%84ViewChild/

https://blog.csdn.net/wuyuxing24/article/details/84927282

https://segmentfault.com/a/1190000008695459

</article>