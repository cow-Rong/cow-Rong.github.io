# <center>**css之svg变幻**</center>
<article align="left" padding="0 12px">

过滤器：
```
<feBlend> - 用于组合图像的过滤器
<feColorMatrix> - 颜色变换过滤器
<feComponentTransfer>
<feComposite>
<feConvolveMatrix>
<feDiffuseLighting>
<feDisplacementMap>
<feFlood>
<feGaussianBlur>
<feImage>
<feMerge>
<feMorphology>
<feOffset> - 阴影过滤器
<feSpecularLighting>
<feTile>
<feTurbulence>
<feDistantLight> - 照明过滤器
<fePointLight> - 照明过滤器
<feSpotLight> - 照明过滤器
```
#### feGaussianBlur —— 模糊效果
<svg height="110" width="110">
  <defs>
    <filter id="f" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f)" />
</svg>

```
<svg height="110" width="110">
  <defs>
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```
* `<defs>` 元素中定义
* `<filter>` 元素用于定义 SVG 过滤器
* 必需的 id 属性，用于标识过滤器。然后图形指向要使用的过滤器。
* in="SourceGraphic" 部分定义为整个元素创建效果
* stdDeviation 属性定义模糊量

<svg height="120" width="120">
  <defs>
    <filter id="f1" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
      <feBlend in="SourceGraphic" in2="offOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>

偏移一个矩形（ <feOffset>）
原始图像混合到偏移图像的顶部（使用 <feBlend>）

<svg height="140" width="140">
  <defs>
    <filter id="f2" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f2)" />
</svg>

注意in2从offOut变成blurOut

<svg height="140" width="140">
  <defs>
    <filter id="f3" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f3)" />
</svg>

注意in从SourceGraphic变成SourceAlpha，使用 Alpha 通道而不是整个 RGBA 像素进行模糊处理

<svg height="140" width="140">
  <defs>
    <filter id="f4" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
      <feColorMatrix result="matrixOut" in="offOut" type="matrix"
      values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
      <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f4)" />
</svg>

in和resout表示进和出
feColorMatrix 将颜色转换为0.2*黑色（0，0，0）

#### transform——旋转
<svg height="60" width="200">
  <text x="0" y="15" fill="red" transform="rotate(30 20,40)">I love SVG</text>
</svg>

#### linearGradient——线性渐变
<svg height="150" width="400">
  <defs>
    <linearGradient id="grad1" x1="50%" y1="50%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
      <animate attributeName="x2" begin="0s" dur="10s" type="auto" values="0%;100%;100%;0%;0%" repeatCount="indefinite"/>
      <animate attributeName="y2" begin="0s" dur="10s" type="auto" values="0%;0%;100%;100%;0%" repeatCount="indefinite"/>
    </linearGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>

#### radialGradient——径向渐变
<svg height="150" width="500">
  <defs>
    <radialGradient id="grad2" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
      <stop offset="0%" style="stop-color:rgb(41,195,241);
      stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(0,47,111);stop-opacity:1" />
    </radialGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad2)" />
</svg>

```
<svg height="150" width="500">
  <defs>
    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);
      stop-opacity:0" />
      <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
    </radialGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>
```
* 必须给渐变内容指定一个id属性，文档内的其他元素能引用它。
* 为了让渐变能被重复适用，渐变内容定义在<defs>标签内部
* CX，CY和r属性定义的最外层圆和Fx和Fy定义的最内层圆



</article>