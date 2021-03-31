# <center>**埋点方案**</center>
<article align="left" padding="0 12px">

### 一、什么是埋点

> 埋点也叫事件追踪，对应的英文是Event Tracking。**它主要是针对特定用户行为或事件进行捕获、处理和发送的相关技术及其实施过程。**

埋点是为了满足快捷、高效、丰富的数据应用而做的用户行为过程及结果记录。数据埋点是一种常用的数据采集的方法。埋点是数据的来源，采集的数据可以分析网站/APP的使用情况，用户行为习惯等，是建立用户画像、用户行为路径等数据产品的基础。

![这是图片](./Blogs/images/test-event-tracking.png 'pic')

### 二、埋点的作用

对于产品来说，用户在你的产品里做了什么、停留了多久、有什么异样，都是可以通过数据埋点来实现监控的。

1. **提高渠道转化率**：通过用户的操作序列，找到用户流失的节点。
2. **改善产品**：通过用户行为分析产品是否有问题，例如用户有没有因为设计按钮过多导致用户行为无效等问题，以此发现功能设计缺陷等。
3. **精准客户运营**：对客户进行分组（例如有的喜欢运营，有的喜欢监控等），实现精准定位，合理分析运营场景等。
4. **完善客户画像**：基本属性（职位等），行为属性（设备操作习惯等）。
5. **数据分析**：埋点作为原料放在数据仓库中。提供渠道转化、个性推荐等。

### 三、埋点的流程
![这是图片](./Blogs/images/test-event-tracking-flow.png 'pic')

##### 1、梳理产品逻辑，清晰产品的脉络和架构
做好埋点需求分析，明确埋点范围，减少不必要的埋点需求。
##### 2、梳理各角色需求
进行需求梳理需要先明确我们要分析什么场景，解决什么业务问题，要解决这个问题需要看怎样的数据，以什么作为衡量指标。
不同角色会关心不同的问题，一般会按照业务线进行需求梳理。

### 四、如何设计数据埋点方案
#### 1、埋点方式的选择
**从前后端埋点可分为：客户端埋点和服务端埋点。**
![这是图片](./Blogs/images/test-event-tracking-shot.png 'pic')

**从埋点方式还可分为：代码埋点、可视化埋点、全埋点。**
![这是图片](./Blogs/images/test-event-tracking-shot-all.png 'pic')

**大致适用场景可梳理为：**
![这是图片](./Blogs/images/test-event-tracking-shot-compare.png 'pic')

**思考**

1、代码埋点的劣势怎么解决：工作量大，更新代价大、不灵活。针对工作量大，可部分采用可视化埋点；针对更新代价大，可将核心代码和配置、资源分开，App启动时通过网路更新配置和资源。

2、可视化埋点和无埋点的区别：可视化埋点需要先决定收集数据的控件，而无埋点先收集所有控件的操作数据，然后通过界面配置需要分析的项。无埋点相对于可视化埋点，解决了问题的回溯问题，启发式信息。但两者都不能灵活的自定义属性，传输时效性和数据可靠性欠佳。

3、优先使用哪种埋点：我偏向于优先使用代码埋点，前端代码埋点作为后端埋点的补充。对于复杂产品，虽然全埋点可回溯数据，但其将导致需要传输、存储、清洗的数据数量级的提升，为了几个可能存在的回溯点，我们有没有必要做这个选择。所以这就需要我们摸清产品的“底细”，预判产品走向。

如果产品简单，没有复杂的功能，自然也推荐全埋点或可视化埋点，例如活动页面。这时候你可以尽情的挖掘、回溯和熟悉数据。当有一定量级时，我们就需要清理该埋哪些点了。

#### 2、事件设计和数据采集埋点设计

> **常见的埋点事件**  
> **1、点击事件**  
> 用户每点击页面上的一个按钮都会记录一次数据，例如点击一次排行榜，就会上报一次事件  
> **2、曝光事件**  
> 当用户成功进入一个页面时记录一次数据，刷新一次页面也会记录一次数据，如果通过Home键切换到手机桌面，则不会记录数据，因为已经脱离了原APP。例如进入排行榜页面，那么会上报一次排行榜的曝光事件。  
> **3、页面停留时长（Time on Page），简称Tp**  
> 页面停留时长用来记录用户在一个页面的停留时间，通过离开页面的时间（t2）-进入页面的时间（t1）计算。以京东排行榜为例，进入排行榜记录一个时间t1，离开后记录一个时间t2，t2-t1就是用户在排行榜停留时长。  

参考文献：
https://juejin.cn/post/6844903650603565063
https://segmentfault.com/a/1190000014922668
https://www.jianshu.com/p/a1c7a8c3f07a
https://cloud.tencent.com/developer/article/1550077
https://my.oschina.net/u/3150903/blog/2086076
https://www.sensorsdata.cn/manual/js_sdk_heatmap.html
https://manual.sensorsdata.cn/sa/latest/page-17571614.html
http://unclechen.github.io/2017/12/24/JS%E5%9F%8B%E7%82%B9%E6%8A%80%E6%9C%AF%E5%88%86%E6%9E%90/
http://www.woshipm.com/data-analysis/665420.html
https://github.com/534591395/collection
https://www.jianshu.com/p/250001a9e57b
https://segmentfault.com/a/1190000037512181
https://www.infoq.cn/article/m87HruEwihlzHWIeYCU0
https://www.imooc.com/article/27151
https://blog.csdn.net/baozhuona/article/details/103087682
https://zhuanlan.zhihu.com/p/81170799
</article>