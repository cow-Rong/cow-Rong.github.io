# <center>**ts中的工具类——Record**</center>
<article align="left" padding="0 12px">

>将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型

、、、
 // Construct a type with a set of properties K of type T

type Record<K extends keyof any, T> = {
    [P in K]: T;
};
、、、
即将K中的每个属性([P in K]),都转为T类型。常用的格式如下
```
type proxyKType = Record<K,T>
```
将K中的所有属性值都转换为T类型，并将返回的新类型返回给proxyKType，K可以是联合类型、对象、枚举…,例如：

```
type petsGroup = 'dog' | 'cat' | 'fish';
interface IPetInfo {
    name:string,
    age:number,
}

type IPets = Record<petsGroup, IPetInfo>;

const animalsInfo:IPets = {
    dog:{
        name:'dogName',
        age:2
    },
    cat:{
        name:'catName',
        age:3
    },
    fish:{
        name:'fishName',
        age:5
    }
}

```
可以看到 IPets 类型是由 Record<petsGroup, IPetInfo>返回的。将petsGroup中的每个值(‘dog’ | ‘cat’ | ‘fish’)都转为 IPetInfo 类型。

也可以自己在第一个参数后追加额外的值，例如：
```
type petsGroup = 'dog' | 'cat' | 'fish';
interface IPetInfo {
    name:string,
    age:number,
}

type IPets = Record<petsGroup | 'otherAnamial', IPetInfo>;

const animalsInfo:IPets = {
    dog:{
        name:'dogName',
        age:2
    },
    cat:{
        name:'catName',
        age:3
    },
    fish:{
        name:'fishName',
        age:5
    },
    otherAnamial:{
        name:'otherAnamialName',
        age:10
    }
}

```
</article>