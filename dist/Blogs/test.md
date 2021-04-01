# <center>**埋点方案**</center>
<article align="left" padding="0 12px">

## 一、什么是埋点

> 埋点也叫事件追踪，对应的英文是Event Tracking。**它主要是针对特定用户行为或事件进行捕获、处理和发送的相关技术及其实施过程。**

埋点是为了满足快捷、高效、丰富的数据应用而做的用户行为过程及结果记录。数据埋点是一种常用的数据采集的方法。埋点是数据的来源，采集的数据可以分析网站/APP的使用情况，用户行为习惯等，是建立用户画像、用户行为路径等数据产品的基础。

![这是图片](./images/test-event-tracking.png 'pic')

## 二、埋点的作用

对于产品来说，用户在你的产品里做了什么、停留了多久、有什么异样，都是可以通过数据埋点来实现监控的。

1. **提高渠道转化率**：通过用户的操作序列，找到用户流失的节点。
2. **改善产品**：通过用户行为分析产品是否有问题，例如用户有没有因为设计按钮过多导致用户行为无效等问题，以此发现功能设计缺陷等。
3. **精准客户运营**：对客户进行分组（例如有的喜欢运营，有的喜欢监控等），实现精准定位，合理分析运营场景等。
4. **完善客户画像**：基本属性（职位等），行为属性（设备操作习惯等）。
5. **数据分析**：埋点作为原料放在数据仓库中。提供渠道转化、个性推荐等。

## 三、埋点的流程
### 1、梳理产品逻辑，清晰产品的脉络和架构
做好埋点需求分析，明确埋点范围，减少不必要的埋点需求。
### 2、梳理各角色需求，明确业务目标，事件设计
进行需求梳理需要先明确我们要分析什么场景，解决什么业务问题，要解决这个问题需要看怎样的数据，以什么作为衡量指标。
不同角色会关心不同的问题，一般会按照业务线进行需求梳理。
### 3、数据采集、数据收集
在页面代码中插入埋点sdk，收集数据，然后请求发送给后端
### 4、构建指标体系，后端处理、数据分析
通过http解析拿到数据，分析处理，然后返回给前端
### 5、分析结果呈现
统计结果的展示

![这是图片](./images/test-event-tracking-flow.png 'pic')

## 四、如何设计数据埋点方案
### 1、埋点方式的选择
**从前后端埋点可分为：客户端埋点和服务端埋点。**

![这是图片](./images/test-event-tracking-shot.png 'pic')

**从埋点方式还可分为：代码埋点、可视化埋点、全埋点。**

* #### 手动埋点（代码埋点）
纯手动写代码，调用埋点SDK的函数，在需要埋点的业务逻辑功能位置调用接口上报埋点数据  

（自定义精细化分析，需要产品开发运营之间相互反复沟通，成本也很高。导致整个数据收集周期变长，成本变高，效率变低。每次有埋点更新，或者漏埋点，都需要重新走上线发布流程，更新成本也高，对线上系统稳定性也有一定危害）

**代码手动埋点常用的方式**：

1.命令式
```
$(document).ready(()=>{
// ... 这里是你的业务逻辑代码
sendData(params);  //这里是发送你的埋点数据，params是你封装的埋点数据
});
// 按钮点击时发送埋点请求
$('button').click(()=>{
// ... 业务逻辑
sendData(params); //同上
});
```
2.声明式
```
<button data-mydata="{key:'uber_comt_share_ck', act: 'click',msg:{}}">打车</button>
```
声明自定义属性data-mydata,在你的SDK中去扫描和识别这些自定义属性，并解析封装数据，在SDK中按照自定义规则去绑定事件并发送这些埋点数据。

3.前端框架式  
如果使用Vue或者React等前端框架，这些框架都有自己的各种生命周期，为了减少重复性的手动埋点次数，可以在各个生命周期位置，根据你的需求封装你所需的埋点。

4.css埋点
```
.link:active::after{
    content: url("http://www.example.com?action=yourdata");
}
<a class="link">点击我，会发埋点数据</a>
```

* #### 可视化埋点（框架式埋点、无痕埋点）
首先需要搭建可视化工具配置节点标记，通过每个元素节点的唯一标识，在设置中过滤处需要的监控元素，实现针对某些 元素的自动上报数据需求。
```
const getPath = function (elem) {
     if (elem.id != '') {
        return '//*[@id="' + elem.id + '"]';
     } 
     if (elem == document.body) {
        return '/html/' + elem.tagName.toLowerCase();
     } 
     let index = 1, siblings = elem.parentNode.childNodes;
     for (const i = 0, len = siblings.length; i < len; i++) {
        const sibling = siblings[i];
         if (sibling === elem) {
            return arguments.callee(elem.parentNode) + '/' + elem.tagName.toLowerCase() + '[' + (index) + ']';
         } else if (sibling.nodeType === 1 && sibling.tagName === elem.tagName) {
            index++;
         } 
     }
 }
```
当我们点击某个元素时，将触发的元素event.target传入，即可得到完整的dom路径。
如果将其换做dom的选择器，类似：div#container>div:nth-of-type(2)>p:nth-of-type(1)，由此，可以定位到具体的DOM节点  
Mixpanel可视化埋点的方案分三层结构：
>* 基本工具层：提供类型判断、遍历、继承、bind 等基本的工具函数；json、base64、utf8 编解码能力；url 参数读写函数；cookie、localStorage 读写能力；dom 事件绑定能力；dom 节点查询能力；info 浏览器信息获取能力。
>* 功能模块层：提供基于 DomTracker 实现的 LinkTracker 跳链接埋点、FormTracker 提交数据埋点功能；autotrack 自动埋点功能；基于 cookie 或 localStorage 的 MixpanelPersistence 持久化功能；MixpanelNotification 提示功能；gdbr 依据欧盟《通用数据保护条例》，首先判断用户是否设置了 navigator.doNotTrack 避免数据被追踪，其次判断持久层是否禁止数据被追踪，当两者同时允许追踪埋点数据时，mixpanel 才会上报埋点数据。
>* 核心实现层：MixpanelLib 串联功能、处理选项、发送埋点数据等；MaxpanelGroup；MaxpanelPeople

神策可视化埋点方案：
>使用者在自己的网页引入 Sensors Analytics 的 JavaScript SDK 代码后，从 Sensors Analytics 的后台可视化埋点管理界面跳转到使用者的网站界面时，会自动进入到可视化埋点模式。在这个模式下，使用者在网页上点击任意 html元素时，Sensors Analytics 都会取到这个元素的url，层级关系等信息来描述这个 html 元素，当使用者设置了这个元素和某个事件相关联时，SDK 会把这些关联信息和客户生成配置信息，并且存放在 Sensors Analytics 提供的相应保存位置。当真正的用户以普通模式访问这个网页时，SDK 会自动加载配置信息，从而在相应的元素被点击时，使用 Sensors Analytics 的数据发送接口来 track 事件。

可视化埋点能够覆盖的功能有限，目前并不是所有的控件操作都可以通过这种方案进行定制；同时，Mixpanel 为首的可视化埋点方案是不能自己设置属性的，例如，一个界面上有一个文本框和一个按钮，通过可视化埋点设置点击按钮为一个“提交”事件时，并不能将文本框的内容作为事件的属性进行上传的，因此，对于可视化埋点这种方案，在上传事件时，就只能上传 SDK 自动收集的设备、地域、网络等默认属性，以及一些通过代码设置的全局公共属性。

* #### 无埋点（自动埋点、全埋点）
不需要工程师在业务代码里面插入侵入式的代码。只需要简单的加载了一段定义好的SDK代码，使用与部署简单，避免了需求变更，埋点错误导致的重新埋点。

通过这个SDK代码，前端会自动全量采集全部事件并上报埋点数据，能够呈现用户行为的每一次点击、每一次跳转、每一次登录等全量、实时用户行为数据，这些数据传到后端后，可通过用户分群、漏斗对比等功能，分析不同访问来源、不同城市、不同广告来源等多维度的不同转化细节，细而全。

无埋点会发送大量的请求，因为无埋点会针对很多DOM节点添加事件。当用户在页面中有交互时，就会触发大量的数据请求。数据可靠性欠佳，耗费网络流量，会增加服务器负载。

看看神策和Mixpanel对无埋点的实现方案：

>神策： 根据官方的介绍，设置AutoTrack之后，SDK就会自动解析HTML页面上的( a 、 button 、 input )标签。 并记录这些标签的点击情况，一旦页面某一个按钮发生了点击行为，SDK就会去采集此按钮的一些信息，例如: 这个按钮的标签类型，这个按钮的文本内容，这个按钮的 name ，这个按钮的 id 、 class 名，还有一些按钮特有的属性如 href等。

>Mixpanel： 设置AutoTrack之后，SDK会监测页面上的所有 form表单 、 input标签 、 select和textarea标签 产生的 submit 、 change 、 click 事件，并采集这些标签上的属性一起上报。

建议无埋点最好使用在那些按钮不是很多的，相对简单的页面。

#### 数据采集能能力方面
点击确认按钮，如果使用无埋点和可视化埋点，在这里可能只能获取到某时刻某个人点击了确认，提交了一个订单，仅此而已。如果你希望拿到里面的首付款，月供，车型车款、用户详情等深度业务信息，就只能靠手动埋点获取。

无埋点和可视化埋点虽然使用和部署都很简单，但是在数据精确度和详细程度的获取能力上代码埋点更强大。一般来说，我产品都是根据业务场景混合使用三种埋点模式来完成我们的数据收集。

#### 埋点规范
某些企业，保守估计，手动埋点的错误率可能会高达50%，比如一些简单页面的进入应该埋在 viewDidAppear（didMount...），按钮点击应该埋在 onClickListener等等都经常被开发弄错。埋点工作本身并不难，是纯粹的体力活，但是要展开一个好的埋点工作，需要BI先梳理，然后再传达给RD，然后RD再去开发实现，最后应该经过测试验收，因为没有统一的标准，每个人的理解不一样，就很容易弄错。

新功能还在设计阶段就先把衡量指标及埋点梳理好，而具体负责埋点的RD需要每天不断的与BI沟通确保语义一致。

自动埋点更适合公司在埋点规范没有完全建立，埋点质量普遍不高的阶段。到一定程度后，RD和产品经理将会更频繁的和手动埋点接触，

#### 总结
| 埋点方案 | 优点 | 缺点 | 适用场景 |
| ------- | --- | ---- | ------- |
| 代码埋点 | 可以按照业务详情、定制化数据 | 需要业务、开发人员参与，更新维护成本高 | 对上下文理解要求较高的业务数据 |
| 全埋点 | 对人员依赖低，仅需嵌入一次SDK，可以全量上报通用数据，对代码入侵性小 | 数量量太大，占用更多资源，给后续数据筛选和分析带来一定的难度 | 上下文相对独立的、通用的数据 |
| 可视化埋点 | 可以按照业务需求上报数据，对上下文数据有一定收集能力 | 标记事件有一定的操作难度，界面变化时标记的元素可能失效 | 业务上下文数据相对简单，操作交互比较固定的界面 |

### 2、事件设计和数据采集埋点设计

> **B端常见的埋点事件**  
> **1、点击事件**  
> 用户每点击页面上的一个按钮都会记录一次数据，例如点击一次排行榜，就会上报一次事件  
> **2、曝光事件 PV 页面访问量**  
> page view页面访问量：当用户成功进入一个页面时记录一次数据PV计数+1，刷新一次页面也会记录一次数据
> **3、UV 独立访客访问数**  
> user view用户的访问量：一台电脑终端为一个访客，uv可以通过pv筛user处理得出

参考文献（方案概要）：  
https://www.jianshu.com/p/a1c7a8c3f07a
https://www.imooc.com/article/27151
https://segmentfault.com/a/1190000037512181
https://zhuanlan.zhihu.com/p/81170799
https://juejin.cn/post/6844903808405880845
https://baijiahao.baidu.com/s?id=1668565634173667539&wfr=spider&for=pc
http://www.woshipm.com/pmd/3418056.html
http://www.woshipm.com/data-analysis/665420.html
https://www.jianshu.com/p/250001a9e57b

参考文献（技术实现）：
https://juejin.cn/post/6844903650603565063
https://segmentfault.com/a/1190000014922668
https://cloud.tencent.com/developer/article/1550077
https://my.oschina.net/u/3150903/blog/2086076
https://www.sensorsdata.cn/manual/js_sdk_heatmap.html
https://manual.sensorsdata.cn/sa/latest/page-17571614.html
http://unclechen.github.io/2017/12/24/JS%E5%9F%8B%E7%82%B9%E6%8A%80%E6%9C%AF%E5%88%86%E6%9E%90/
https://github.com/534591395/collection
https://www.infoq.cn/article/m87HruEwihlzHWIeYCU0
https://blog.csdn.net/baozhuona/article/details/103087682
https://www.jianshu.com/p/1fa6ec85633d
https://zhuanlan.zhihu.com/p/27659302
https://my.oschina.net/u/3150903/blog/2086076
https://www.sensorsdata.cn/2.0/manual/fast_access_js.html
https://www.sensorsdata.cn/2.0/manual/data_model.html
https://www.sensorsdata.cn/2.0/manual/fast_access_js.html
</article>