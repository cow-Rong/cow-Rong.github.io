# <center>**你看到的到底是什么颜色**</center>

<article align="left" padding="0 12px">

##### 场景一 #####
![这是图片](../Blogs/images/color-exp0.png 'pic')

蓝黑or白金？

##### 场景二 #####

设计：为什么模型的颜色跟我在建模工具看到的不一样？

开发：引擎的光照和建模工具不太一样，我调一下～

设计：还是不一样～

开发：我再调整一下～

...

还在苦恼的调光照吗，有木有想过，其实不一定是光照的原因，来看看这两张用了同一光照的threejs渲染对比图：

![这是图片](../Blogs/images/color-exp.png 'pic')

第二个效果和建模工具更加相似，主要区别是第一张图直接导入了模型和贴图，第二张图在导入贴图时做了色彩空间转换。

这是怎么转换的呢？
### 色彩空间介绍 ###
![这是图片](../Blogs/images/color-exp2.png 'pic')

人类视觉对亮度感知能力并不是呈现线性关系的，人类的眼睛在在感受纯白（亮度100%）与纯黑（亮度0%）后，对于中等亮度（亮度50%）的实际感知并不是中灰（PS中128度灰）所带来的亮度，而当人眼接受到18％左右的亮度的光源后，就能感觉到这是中等亮度了。

看上图这两个灰度条，第一个是线性的从黑到白，第二个是以人类感知为准的灰度条，当18％左右的亮度的光源时，人类感觉到这是50%的亮度。这就是为什么要有不同的色彩空间。

传统的CRT显示器是通过电压的强度来进行屏幕亮度的显示的，而CRT显示器显示的亮度跟施加的电压并不是呈线性的关系的，是呈现一种幂律响应的方式：在显示器的表面处产生的亮度与提高到2.5倍的施加电压大致成比例，该功率函数的指数的数值通常被称为γ（Gamma）。

![这是图片](../Blogs/images/color-exp1.png 'pic')

这是一个实际CRT传输功能的图形

为了实现亮度的正确再现，同时，如上面所说（什么是亮度），人类对于亮度的感知是非线性的，所以必须补偿该非线性。（这里的非线性指两个，人类对亮度的感知的非线性和CRT显示器的对电压的非线性的响应关系）

那么对于Gamma矫正的原因，网上也是众说纷纭，有的人认为仅仅是因为老式计算机（CRT）的的历史遗留问题，这个说法主要来自Gong大，还要一个党派认为这仅仅是因为人眼的视觉感官所决定的，跟CRT没半点关系，这个说法主要来自韩世麟，那么最终也有人结合这两派提出自己的观点，她认为主要跟人眼就关，CRT只是个巧合，CandyCat。

这几个术语：

1. linear颜色空间：物理上的线性颜色空间，也就是gamma=1（均匀）的方式对色域切割，当计算机需要对sRGB像素运行图像处理算法时，一般会采用线性颜色空间计算。

2. sRGB颜色空间： sRGB是当今一般电子设备及互联网图像上的标准颜色空间。较适应人眼的感光。sRGB和标准gamma2.2非常相似，所以在从linear转换为sRGB时可通过转换为gamma2.2替代。

3. gamma转换：线性与非线性颜色空间的转换可通过gamma空间进行转换。

![这是图片](../Blogs/images/color-exp3.png 'pic')

在着色器中色值的提取与色彩的计算操作一般都是在线性空间。在webgl中，贴图或者颜色以srgb传入时，必须转换为线性空间。计算完输出后再将线性空间转为srgb空间。

![这是图片](../Blogs/images/color-exp4.png 'pic')


### ThreeJS 色彩空间转换 ###
在ThreeJS中，当我们为材质单独设置贴图和颜色时，需要进行色彩空间转换。具体的转换threejs会在着色器中进行，我们只需要关注为贴图指定好色彩空间，或者直接调用转换函数。

具体步骤如下：

1. sRGB转Linear

A. 对于贴图：

 threejs 需要在线性颜色空间（linear colorspace）里渲染模型的材质，而从一般软件中导出的模型中包含颜色信息的贴图一般都是sRGB颜色空间（sRGB colorspace），故需要先将sRGB转换为Linear。

 然而 threejs 在导入材质时，会默认将贴图编码格式定义为Three.LinearEncoding，故需将带颜色信息的贴图(baseColorTexture, emissiveTexture, 和 specularGlossinessTexture)手动指定为Three.sRGBEncoding，threejs在渲染时判断贴图为sRGB后，会自动将贴图转换为Linear再进行渲染计算。
```
// 设置加载texture的encoding
    const loadTex = (callback) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load( "./assets/texture/tv-processed0.png", function(texture){
            texture.encoding = THREE.sRGBEncoding;
        });
        ...
    }
```
B. 对于color：

 在直接定义 threejs material 的 color 值时，需要进行如下的转换：
```
const material = new THREE.MeshPhongMaterial( {
    color: 0xBBBBBB
} );
material.color.convertSRGBToLinear();
```
2. linear转gamma2.2

 渲染计算后的模型仍在linear空间，展示到屏幕时需要通过gamma校正，将linear转换回sRGB空间，也就是进行gamma校正，threejs中可通过设置gammaOutput和gammaFactor，进行gamma校正，校正后的gamma2.2颜色空间与sRGB相似。
```
// 定义gammaOutput和gammaFactor
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;   //电脑显示屏的gammaFactor为2.2
```
需要注意的是：

1. 若采用 GLTFLoader 导入带贴图的模型，GLTFLoader 将在渲染前自动把贴图设置为 THREE.sRGBEncoding，故不需要手动设置贴图 encoding。在 GLTFLoader 之前，threejs 也没有很好地处理色彩空间这回事，所以大家需要排查一下其他 loader 有没有这个 bug。

2. 使用不受光照影响的材质，例如 MeshBasicMaterial，着色器不需要做复杂的计算，故不需要进行色彩空间转换。

</article>