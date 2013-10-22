# 订阅者模式的DEMO

## 关于订阅者模式

分为模块文件和一个执行文件

模块文件定义在某些动作或事件发生时广播fire，同时开放订阅subscribe和取消订阅unsubscribe的接口

在执行文件中，根据需求使某个模块订阅另一个模块（也可以是自身）的消息，给出收到消息时的动作

## 对象SubscribeModel

把订阅者模式中模块的三个接口fire,subscribe,unsubscribe整合到一起


## 使用

引用SubscribeModel.js

### 监听事件

// 在trible-click事件发生后
SubscribeModel.subscribe('trible-click',function(data){
    // do something
});

// 在some-plugin-inited事件发生后，做某件事，并且针对回调做了个命名空间
SubscribeModel.subscribe('some-plugin-inited.another-plugin',function(data){
    // do something
});

function callback(data){
    // do something
}

// 在ajax-back事件发生后，调用函数callback
SubscribeModel.subscribe('ajax-back',callback);

### 取消某个事件监听

// 取消所有针对'trible-click'事件的监听
SubscribeModel.unSubscribe('trible-click');

// 取消所有事件名为some-plugin-inited且命名空间为another-plugin的事件的监听
SubscribeModel.unSubscribe('some-plugin-inited.another-plugin');

// 取消事件名为ajax-back，且回调函数为ajax-back的事件监听
SubscribeModel.unSubscribe('ajax-back',callback);


## 相关

本人系js新手，急需指点，欢迎指出不足之处或者可以得到肯定之处
联系方式 [水中月明](mailto: shuizhongyueming@gmail.com@gmail.com)