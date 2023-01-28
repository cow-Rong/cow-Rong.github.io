# <center>**React——modal**</center>
<article align="left" padding="0 12px">

## 如何更优雅的使用 Antd 的 Modal 组件
首先，让我们来看一看 Ant Design 官网的第一个关于 Modal 的 demo
```
import { Modal, Button } from 'antd';

class App extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
```
当然，一般来说，我们写的 Modal 不会像官网里的例子这么的简单，毕竟这么简单的话会更倾向于使用类似于 Modal.confirm 等 API 直接调用弹出就好了。我们可能会对 Modal 进行二次封装，里面写一些代码逻辑及可能是固定的譬如 title 直接写在组件内，然后把一些像是 visible、onOk 及 onCancel这种 API 用 props 暴露出去。

这种把 visible 提升到父组件的方式固然能解决问题，可是这种方式也导致了一个问题。每次我们打开弹窗的时候，因为 visible 是在父组件中的状态，所以父组件也会重新 render 一次，甚至，如果父组件中的其他子组件没有做优化的话（没有使用 memo 或者没有设置 shouldComponentUpdate），也会跟着重新 render 一次。

那么有没有什么方法可以解决这个问题呢？当然可以，我们只要把 visible 的状态留在和 Modal 有关的子组件里面就可以了。而在父组件中，其实我们所需要的只是 打开弹窗 以及 接收子组件的回调 两个需求。那么有哪些方式可以实现把 visible 留在子组件中呢？下面我们逐一介绍，因为我想不到什么命名，所以下面就一二三四了，emmm，就这样。

#### 具体实现
##### 在线代码
codesandbox 地址:
https://codesandbox.io/s/ancient-hill-j740p?file=/src/App.tsx

##### 方案一
```
import React, { memo, useState } from "react";
import { Modal } from "antd";

type Modal1Props = {
  children: React.ReactElement;
  onOk?(): void;
  onCancel?(): void;
  [others: string]: any;
};

const Modal1 = memo<Modal1Props>(({ children, onOk, onCancel, ..._restProps }) => {
  const [visible, setVisible] = useState(false);

  const wrapWithClose = (method?: () => void) => () => {
    setVisible(false);
    method && method();
  };
  // ------

  return (
    <>
      <Modal
        title="方案一"
        visible={visible}
        onOk={wrapWithClose(onOk)}
        onCancel={wrapWithClose(onCancel)}
      >
        <div>...</div>
      </Modal>
      {React.cloneElement(children, {
        onClick: (...args: any[]) => {
          const { onClick } = children.props;
          setVisible(true);
          onClick && onClick(...args);
        }
      })}
    </>
  );
});

export default Modal1;
```
第一种方案就是比较投机取巧，但是它也有它的缺点，就是打开弹窗这个操作只能由某一个元素完成且不能更多了。

##### 方案二
对于在父组件中操作子组件状态这种事情，我们自然而然的就会想到使用 ref，下面就让我们来看看要怎么用 ref 实现。
```
import React, { useState, useImperativeHandle, useRef } from "react";
import { Modal } from "antd";

type Payload = {
  onOk?(): void;
  onCancel?(): void;
  [others: string]: any;
};

export type Modal2RefType = {
  show(payload: Payload): void;
};

const Modal2 = React.forwardRef<Modal2RefType>((_props, ref) => {
  const [visible, setVisible] = useState(false);
  const payloadRef = useRef<Payload>({});

  useImperativeHandle(
    ref,
    () => ({
      show: payload => {
        payloadRef.current = payload;
        setVisible(true);
      }
    }),
    []
  );

  const wrapWithClose = (method?: () => void) => () => {
    setVisible(false);
    method && method();
  };

  return (
    <Modal
      title="方案二"
      visible={visible}
      onOk={wrapWithClose(payloadRef.current.onOk)}
      onCancel={wrapWithClose(payloadRef.current.onCancel)}
    >
      <div>...</div>
    </Modal>
  );
});

export default Modal2;
```
使用 ref 的方式也很简单，这里我们将一些额外的参数使用 show 这个方法来传递，而不是像方案一中那样用 props，但是我们使用时需要一个额外的变量来存储，只能说，这还不够完美。

##### 方案三
对于在父组件中控制子组件这件事，我们当然可以使用“无所不能”的发布订阅，因为发布订阅并不是我们这里所要讲的内容，所以就简单的导个包吧，我们这里使用了 eventemitter3。
```
import React, { memo, useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import EventEmitter from "eventemitter3";

const eventEmitter = new EventEmitter();

type Payload = {
  onOk?(): void;
  onCancel?(): void;
  [others: string]: any;
};

type ModalType = React.NamedExoticComponent & { show(payload: Payload): void };

const Modal3: ModalType = memo(
  (_props, ref) => {
    const [visible, setVisible] = useState(false);
    const payloadRef = useRef<Payload>({});

    useEffect(() => {
      const handler = (payload: Payload) => {
        setVisible(true);
        payloadRef.current = payload;
      };

      eventEmitter.on("show", handler);

      return () => eventEmitter.off("show", handler);
    }, []);

    const wrapWithClose = (method?: () => void) => () => {
      setVisible(false);
      method && method();
    };

    return (
      <Modal
        title="方案三"
        visible={visible}
        onOk={wrapWithClose(payloadRef.current.onOk)}
        onCancel={wrapWithClose(payloadRef.current.onCancel)}
      >
        <div>...</div>
      </Modal>
    );
  },
  () => true
) as any;

Modal3.show = (payload: Payload) => eventEmitter.emit("show", payload);

export default Modal3;
```
在上面的代码中，因为直接把 eventEmitter 一起 export 出去会显得不那么优雅(不知道怎么描述的时候就用优雅就对了，大概)。而且还需要用的人知道，要调用 emit 方法触发 show 事件，实在是不优雅，所以我们直接在 Modal3 上绑定一个 show 方法来调用。

当看完上面的代码，我想应该有人会发现，其实我们根本就没有必要为此而引入一个 eventEmitter，这实在是有一种杀鸡用了牛刀的感觉。我们为什么不直接在 useEffect 内把 handler 直接赋值给 Modal3.show 呢？于是，我们就有了方案四

##### 方案四
```
import React, { memo, useState, useRef, useEffect } from "react";
import { Modal } from "antd";

type Payload = {
  onOk?(): void;
  onCancel?(): void;
  [others: string]: any;
};

type ModalType = React.NamedExoticComponent & { show(payload: Payload): void };

const Modal4: ModalType = memo(
  (_props, ref) => {
    const [visible, setVisible] = useState(false);
    const payloadRef = useRef<Payload>({});

    useEffect(() => {
      const lastShow = Modal4.show;

      Modal4.show = (payload: Payload) => {
        setVisible(true);
        payloadRef.current = payload;
      };

      return () => (Modal4.show = lastShow);
    }, []);

    const wrapWithClose = (method?: () => void) => () => {
      setVisible(false);
      method && method();
    };

    return (
      <Modal
        title="方案四"
        visible={visible}
        onOk={wrapWithClose(payloadRef.current.onOk)}
        onCancel={wrapWithClose(payloadRef.current.onCancel)}
      >
        <div>...</div>
      </Modal>
    );
  },
  () => true
) as any;

Modal4.show = (payload: Payload) => console.log("Modal4 is not mounted.");

export default Modal4;
```
#### 更多思考
上面提到了好几种解决方法，其实我们还可以把状态进一步提升，使用 Context 来传递，在父组件中接收 show 这个不会变化的 API，在 Modal 所在的组件中接收会变化的 visible 以及 payload，当然我觉得这样做过于复杂，所以没有列举。看到这里，我想大家也都知道，我肯定是最推荐方案四啦，之所以全都写出来，是为了告诉大家，我们应该有更多的思考，而不是用某一种方法解决了，就等于真正的掌握了。当然上面的都是我能想到的方法，当然也会有我想不到的，如果你想到了什么其他的方法，烦请赐教。

除此之外，我想留更多的问题给大家： - 上面的代码中有很多可以复用的逻辑，那么如何复用？ - 我们可以发现，上面的实现都是无论 show 多少次都是同一个弹窗，那么有哪些方法可以实现类似于 Modal.confirm 的效果呢？ - Ant Design 中的 message 组件又该如何实现，更进一步的，如果要限制同事出现的 message 的数量，又该怎么做？

原文：https://zhuanlan.zhihu.com/p/160286026

</article>