# 订阅者模式的DEMO

## 关于订阅者模式

分为模块文件和一个执行文件

模块文件定义在某些动作或事件发生时广播publish，同时开放订阅subscribe和取消订阅unsubscribe的接口

在执行文件中，根据需求使某个模块订阅另一个模块（也可以是自身）的消息，给出收到消息时的动作

## 继承类PublishSubscribePattern

把订阅者模式中模块的三个接口publish,subscribe,unsubscribe整合到一起


## 使用

引用PublishSubscribePattern.js

模块如果是对象可以：

    var model = new PublishSubscribePattern;
    model.coreFunc = function(){};

模块如果是构造函数可以：

    var function Model(){};
    Model.prototype = new PublishSubscribePattern;
    Model.construcor = Model;

## 相关

本人系js新手，急需指点，欢迎指出不足之处或者可以得到肯定之处
联系方式 [水中月明](mailto: test@gmail.com)