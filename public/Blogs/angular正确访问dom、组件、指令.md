# <center>**Angular正确访问dom、组件、指令**</center>
<article align="left" padding="0 12px">


#### @ViewChild属性装饰器

应用场景：
* 访问父组件中的子组件元素、
* 表单属性脏检查、
* 触发事件，
* 父组件中的指令

在 ngAfterViewInit 钩子函数中后可以正确获取到元素

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

  @ViewChild('greet')
  greetDiv: ElementRef;

  ngAfterViewInit() {
    console.dir(this.greetDiv);
  }
}
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

  @ViewChild('tpl')
  tplRef: TemplateRef<any>;

  @ViewChild('tpl', { read: ViewContainerRef })
  tplVcRef: ViewContainerRef;

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

  @ViewChild(ChildComponent)
  childCmp: ChildComponent;

  ngAfterViewInit() {
    console.dir(this.childCmp);
  }
}
```
参考：
https://tommy0604.github.io/%E6%B7%B1%E5%85%A5%E5%88%86%E6%9E%90Angular%E4%B8%AD%E7%9A%84ViewChild/

https://blog.csdn.net/wuyuxing24/article/details/84927282

https://segmentfault.com/a/1190000008695459

</article>