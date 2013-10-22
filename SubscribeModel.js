/**
 * @name subscribeModel.js 订阅者模式
 * @author 汪兴
 * @last-modify: at 20130408 by 汪兴
 */

/************************************************************
* 订阅者模式 
* 占用名称 SubscribeModel
*************************************************************/


/**
 * 事件存储的数据结构

SubscribeModel{
    "event": {
        "on-sleep": [
            "func1",
            "func2",
            "func3",
            [
                "namespace1",
                "func4"
            ]
        ],
        "on-weakup": [
            "func1",
            "func2",
            "func3"
        ]
    }
}
 */

var SubscribeModel = {};
/**
 * [subscribe 订阅]
 * @param  {[string]}   even [订阅者要订阅的事件]
 * @param  {[function]} func [订阅者收到订阅的消息之后的动作]
 * @return {[number]}        [0->成功 1->even格式错误 2->func格式错误]
 *
 * @demo 
 *     subscribe('click',callback);
 *     subscribe('click.btn',callback);
 */
SubscribeModel.subscribe = function(even,func){
    var m = this,events,eventType,namespace;

    // 参数检测
    if(typeof even !== 'string') return 1;
    if(typeof func !== 'function')  return 2;

    events = even.split('.');
    eventType = events[0];
    namespace = events[1];

    m.event = m.event || {};

    if(m.event[eventType] === undefined){
        m.event[eventType] = [];
    }

    if(namespace === undefined){
        m.event[eventType].push(func);
    }else{
        m.event[eventType].push([namespace,func]);
    }

    return 0;
};

/**
 * [subscribe 取消订阅  订阅者可能针对同一个消息订阅了多个动作]
 * @param  {[string]}   even [订阅者取消订阅   对应的事件]
 * @param  {[function]} func [订阅者收到订阅的消息之后，取消的动作，可以不设定]
 * @return {[number]}        [0->成功 1->even格式错误 3->要取消的动作不存在]
 */
SubscribeModel.unSubscribe = function(even,func){
    var m = this,o,i,len,events,eventType,namespace;

    // 参数检测
    if(typeof even !== 'string') return 1;
    // if(typeof func !== 'function')  return 2;

    events = even.split('.');
    eventType = events[0];
    namespace = events[1];

    m.event = m.event || {};

    // 要取消的动作不存在
    if(m.event[eventType] === undefined){
        return 3;
    }

    o = m.event[eventType];

    if(namespace === undefined){
        
        // 在没有指定命名空间，且回调函数为空的时候，是清空所有的事件监听
        if(typeof func === 'undefined'){
            m.event[eventType] = undefined;
            return 3;
        }

        // 没有指定命名空间
        for(i=0,len=o.length;i<len;i++){
            // 遇到以命名空间存储的数据结构
            if(o[i] instanceof Array && o[i][1] === func){
                o.splice(i,1);
                continue;
            }

            // 没有命名空间的事件监听
            if(o[i] == func)   o.splice(i,1);
        }

    }else{

        if(typeof func === 'undefined'){
            for(i=0,len=o.length;i<len;i++){
                // 指定了命名空间，则寻找的是event里面的数组
                // 且数组第一项的值应该和namespace相同
                // 没有设定func的情况下，是指的所有的命名空间下的回调
                if(o[i] instanceof Array && o[i][0] === namespace){
                    o.splice(i,1);
                }
            }
        }else{
            for(i=0,len=o.length;i<len;i++){
                // 指定了命名空间，则寻找的是event里面的数组
                // 且数组第一项的值应该和namespace相同
                if(o[i] instanceof Array && o[i][0] === namespace){
                    if(o[i] === func)   o.splice(i,1);
                }
            }
        }

    }

    return 0;

};

/**
 * [fire 广播并通知]
 * @param  {[string]} even [广播的事件]
 * @return {[type]}        [description]
 */
SubscribeModel.fire = function(even,data){
    var m = this,i=0,len,o;

    o = m.event[even];
    if(o){

        // 没有指定命名空间
        for(i=0,len=o.length;i<len;i++){
            // 遇到以命名空间存储的数据结构
            if(o[i] instanceof Array && o[i][1] === func){
                // 把even放在data后面，这样even对于回调函数来说就是可选的
                o[i][1](data,even);
                continue;
            }
            o[i](data);
        }

    }
};

