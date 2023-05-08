# <center>**a标签空链接**</center>
<article align="left" padding="0 12px">

```
// 不动：
<a href="javascript:;">不动</a>
<a href="javascript:void(0);">不动</a>// 让超链接去执行一个js函数，而不是跳转地址，void(0)标识一个空的方法，也就是不执行js函数
<a href="#" οnclick="javascript:return false;">不动</a> // 阻止了默认行为
<a href="#" onclick="javascript:console.log('!'); return false;">不动!</a> 
<a href="javascript:console.log('!');">不动!</a>
<a href="javascript:sign();">javascript</a>
// 点击a标签就可以执行sign()函数了

// 动
<a href="#"动></a>
<a href="#" οnclick="javascript:void(0);">动</a>
<a href="#" οnclick="javascript:;">动</a>
<a href="#" οnclick="javascript:return true;">动</a>
<a href="#" onclick="javascript:console.log('!!!');">动!!!</a>
// 点击后会回到网页顶部
// "＃"其实是包含了位置信息，例如默认的锚点是＃top 也就是网页的顶部(当前页面中id="top"的这个锚点)
```

</article>