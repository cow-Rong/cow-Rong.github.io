# <center>**前端监控——性能**</center>
<article align="left" padding="0 12px">

前端监控可以分为三类：
* 数据监控：用户行为数据
* 性能监控：首屏加载时间、白屏时间、http请求和响应时间
* 异常监控：前端脚本执行报错

本文主要介绍性能监控

web性能监控可以分为两类：
* 合成监控（Synthetic Monitoring，SYN）
* 真实用户监控（Real User Monitoring，RUM）

**1. 合成监控**
采用 web 浏览器模拟器来加载网页，通过模拟终端用户可能的操作来采集对应的性能指标，最后输出一个网站性能报告。
可选工具：Lighthouse、PageSpeed、WebPageTest、Pingdom、PhantomJS 等。
优点：
* 无侵入性。
* 简单快捷。  

缺点：
* 不是真实的用户访问情况，只是模拟的。
* 没法考虑到登录的情况，对于需要登录的页面就无法监控到。

**2. 真实用户监控**
真实用户监控是一种被动监控技术，是一种应用服务，被监控的 web 应用通过 sdk 等方式接入该服务，将真实的用户访问、交互等性能指标数据收集上报、通过数据清洗加工后形成性能分析报表。
可选工具：FrontJs、oneapm、Datadog 等。
优点：
* 是真实用户访问情况。
* 可以观察历史性能趋势。
* 有一些额外的功能：报表推送、监控告警等等。  

缺点：
* 有侵入性，会一定程度上响应 web 性能。  

**浏览器performance分析**  
window.performance
1. performance.navigation: 页面是加载还是刷新、发生了多少次重定向
2. performance.timing: 页面加载的各阶段时长
3. performance.memory：基本内存使用情况，Chrome 添加的一个非标准扩展
4. performance.timeorigin: 性能测量开始时的时间的高精度时间戳  

方法
performance.getEntries()
通过这个方法可以获取到所有的 performance 实体对象，通过getEntriesByName和getEntriesByType 方法可对所有的 performance 实体对象 进行过滤，返回特定类型的实体。
mark 方法 和 measure 方法的结合可打点计时，获取某个函数执行耗时等。
performance.getEntriesByName()
performance.getEntriesByType()
performance.mark()
performance.clearMarks()
performance.measure()
performance.clearMeasures()
performance.now() ...

**总结**：
基于 performance 我们可以测量如下几个方面：
mark、measure、navigation、resource、paint、frame。
```
let p = window.performance.getEntries();
重定向次数：performance.navigation.redirectCount
JS 资源数量: p.filter(ele => ele.initiatorType === "script").length
CSS 资源数量：p.filter(ele => ele.initiatorType === "css").length
AJAX 请求数量：p.filter(ele => ele.initiatorType === "xmlhttprequest").length
IMG 资源数量：p.filter(ele => ele.initiatorType === "img").length
总资源数量: window.performance.getEntriesByType("resource").length
```
不重复的耗时时段区分：
```
重定向耗时: redirectEnd - redirectStart
DNS 解析耗时: domainLookupEnd - domainLookupStart
TCP 连接耗时: connectEnd - connectStart
SSL 安全连接耗时: connectEnd - secureConnectionStart
网络请求耗时 (TTFB): responseStart - requestStart
HTML 下载耗时：responseEnd - responseStart
DOM 解析耗时: domInteractive - responseEnd
资源加载耗时: loadEventStart - domContentLoadedEventEnd

```
JS 总加载耗时:
```
const p = window.performance.getEntries();
let cssR = p.filter(ele => ele.initiatorType === "script");
Math.max(...cssR.map((ele) => ele.responseEnd)) - Math.min(...cssR.map((ele) => ele.startTime));
```
CSS 总加载耗时:
```
const p = window.performance.getEntries();
let cssR = p.filter(ele => ele.initiatorType === "css");
Math.max(...cssR.map((ele) => ele.responseEnd)) - Math.min(...cssR.map((ele) => ele.startTime));
```
FP（first paint）首次渲染
FCP（first contentful paint）首次有内容的渲染


