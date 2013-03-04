/**
 * [Clicker 有点击事件，能改变自身内容]
 * @type {Object}
 */
'use strict';
var Changer = new SubscribeModel;

/**
 * [init 初始化]
 * @param  {[DOMObject]} container [盒子放置的地方]
 * @param  {[string]}    id        [盒子的ID]
 * @param  {[Object]}    options   [可选项colors:改变的颜色,time:改变的间隔时间,isChange:初始化时是否改变]
 * @return {[object]}              [Changer]
 */
Changer.init = function(container,id,options){
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
};

/**
 * [changeBg 改变背景色]
 * @param  {[string]} color [颜色值]
 * @return {[Object]}       [Changer]
 */
Changer.changeBg = function(color){
    var m = this;

    m.box.style.backgroundColor = color;
    m.fire(color);

    return m;

};

/**
 * [stopChange 停止改变背景色]
 * @return {[Object]} [Changer]
 */
Changer.stopChange = function(){
    var m = this;
    m.isChange = false;

    return m;
};

/**
 * [stopChange 开始改变背景色]
 * @return {[Object]} [Changer]
 */
Changer.startChange = function(){
    var m = this;
    m.isChange = true;

    return m;
};

/**
 * [stopChange 如果在改变则停止，如果没有改变则开始]
 * @return {[Object]} [Changer]
 */
Changer.toggle = function(){
    var m = this;

    if(m.isChange === true){
        m.isChange = false;
    }else{
        m.isChange = true;
    }

    return m;
};