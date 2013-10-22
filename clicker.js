/**
 * [Clicker 有点击事件，能改变自身内容]
 * @type {Object}
 */
'use strict';
var Clicker = {};

Clicker.init = function(container,id){
    var m = this;

    new Boxer(container,id,"I'm Clicker","<p>你可以点击我</p><h1></h1>");
    m.box = document.getElementById(id);
    m.box.addEventListener('click',function(){
        SubscribeModel.fire('click');
    },false);

};


Clicker.changeCont = function(msg){
    var m = this;

    m.box.getElementsByTagName('h1')[0].innerHTML = msg;

    return m;

};

