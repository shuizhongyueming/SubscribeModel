/**
 * [Hider 有点击事件，能改变自身内容]
 * @type {Object}
 */
'use strict';
var Hider = {
    init: function(container,id){
        var m = this;
        new Boxer(container,id,"I'm Hider","<p>我有隐身的能力</p>");
        m.box = document.getElementById(id);

        m.visibleStatus = true;
    },

    /**
     * [hideBox 隐藏]
     * @return {[Object]} [Hider]
     */
    hideBox: function(){
        var m = this;

        m.box.style.opacity = '0';
        m.visibleStatus = false;
        m.fire('hide');
        return m;
    },

    /**
     * [hideBox 隐藏]
     * @return {[Object]} [Hider]
     */
    showBox: function(){
        var m = this;

        m.box.style.opacity = '1';
        m.visibleStatus = true;
        m.fire('show');

        return m;
    },

    /**
     * [toggleBox 如果隐藏则显示，如果显示则隐藏]
     * @return {[type]} [description]
     */
    toggleBox: function(){
        var m = this;

        if(m.box.style.opacity === '0'){
            m.showBox();
        }else{
            m.hideBox();
        }

        return m;
    },
    visibleStatus: function(){
        var m = this;
        return m.visibleStatus;
    },
    /**
     * [subscribe 订阅]
     * @param  {[string]}   even [订阅者要订阅的事件]
     * @param  {[function]} func [订阅者收到订阅的消息之后的动作]
     * @return {[number]}        [0->成功 1->even格式错误 2->func格式错误]
     */
    subscribe: function(even,func){
        var m = this;

        // 参数检测
        if(typeof even !== 'string') return 1;
        if(typeof func !== 'function')  return 2;

        if(m[even] === undefined){
            m[even] = [func];
        }else{
            m[even].push(func);
        }

        return 0;
    },

    /**
     * [subscribe 取消订阅  订阅者可能针对同一个消息订阅了多个动作]
     * @param  {[string]}   even [订阅者取消订阅   对应的事件]
     * @param  {[function]} func [订阅者收到订阅的消息之后，取消的动作]
     * @return {[number]}        [0->成功 1->even格式错误 2->func格式错误 3->要取消的动作不存在]
     */
    unSubscribe: function(even,func){
        var m = this;

        // 参数检测
        if(typeof even !== 'string') return 1;
        if(typeof func !== 'function')  return 2;     

        o = m[even];
        if(o){
            for(i,len=o.length;i<len;i++){
                if(o[i] == func)   o.splice(i,1);
            }
        }else{
            return 3;
        }

        return 0;

    },
    /**
     * [fire 广播并通知]
     * @param  {[string]} even [广播的事件]
     * @return {[type]}      [description]
     */
    fire: function(even){
        var m = this,i=0,len,o;

        o = m[even];
        if(o){
            for(i,len=o.length;i<len;i++){
                o[i](even);
            }
        }
    }
}