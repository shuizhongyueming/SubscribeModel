/**
 * [Clicker 有点击事件，能改变自身内容]
 * @type {Object}
 */
'use strict';
var Changer = {
    /**
     * [init 初始化]
     * @param  {[DOMObject]} container [盒子放置的地方]
     * @param  {[string]}    id        [盒子的ID]
     * @param  {[Object]}    options   [可选项colors:改变的颜色,time:改变的间隔时间,isChange:初始化时是否改变]
     * @return {[object]}              [Changer]
     */
    init: function(container,id,options){
        var m = this;

        new Boxer(container,id,"I'm Changer","<p>我的背景色在不断的改变，可以停止的</p>");
        m.box = document.getElementById(id);
        var defaultColors = ['green','red','blue','yellow','white','black','gray']
        m.colors = options ? (options.colors || defaultColors) : defaultColors;
        var len = m.colors.length;
        m.time = options ? (options.time || 800) : 800;
        m.isChange = options ? (options.isChange || true) : true;

        // 定时随机颜色进行改变
        setInterval(function(){
            if(m.isChange){
                m.changeBg( m.colors[ Math.floor(Math.random()*len) ] );
            }
        },m.time);

        return m;
    },
    
    /**
     * [changeBg 改变背景色]
     * @param  {[string]} color [颜色值]
     * @return {[Object]}       [Changer]
     */
    changeBg: function(color){
        var m = this;

        m.box.style.backgroundColor = color;
        m.fire(color);

        return m;

    },

    /**
     * [stopChange 停止改变背景色]
     * @return {[Object]} [Changer]
     */
    stopChange: function(){
        var m = this;
        m.isChange = false;

        return m;
    },

    /**
     * [stopChange 开始改变背景色]
     * @return {[Object]} [Changer]
     */
    startChange: function(){
        var m = this;
        m.isChange = true;

        return m;
    },

    /**
     * [stopChange 如果在改变则停止，如果没有改变则开始]
     * @return {[Object]} [Changer]
     */
    toggle: function(){
        var m = this;

        if(m.isChange === true){
            m.isChange = false;
        }else{
            m.isChange = true;
        }

        return m;
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

        o = e[even];
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