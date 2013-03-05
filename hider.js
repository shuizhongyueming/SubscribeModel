/**
 * [Hider 有点击事件，能改变自身内容]
 * @type {Object}
 */
'use strict';
var Hider = new PublishSubscribePattern;

Hider.init = function(container,id){
    var m = this;
    new Boxer(container,id,"I'm Hider","<p>我有隐身的能力</p>");
    m.box = document.getElementById(id);

    m.visibleStatus = true;
};

/**
 * [hideBox 隐藏]
 * @return {[Object]} [Hider]
 */
Hider.hideBox = function(){
    var m = this;

    m.box.style.opacity = '0';
    m.visibleStatus = false;
    m.publish('hide');
    return m;
};

/**
 * [hideBox 隐藏]
 * @return {[Object]} [Hider]
 */
Hider.showBox = function(){
    var m = this;

    m.box.style.opacity = '1';
    m.visibleStatus = true;
    m.publish('show');

    return m;
};

/**
 * [toggleBox 如果隐藏则显示，如果显示则隐藏]
 * @return {[type]} [description]
 */
Hider.toggleBox = function(){
    var m = this;

    if(m.box.style.opacity === '0'){
        m.showBox();
    }else{
        m.hideBox();
    }

    return m;
},
Hider.visibleStatus = function(){
    var m = this;
    return m.visibleStatus;
};
