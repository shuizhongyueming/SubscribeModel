function Boxer(container,id,headCont,bodyCont){
    var m = this;
    m.container = container;
    m.id = id;
    m.headCont = headCont;
    m.bodyCont = bodyCont;

    m.init();

};
Boxer.prototype.init = function(){
    var m = this;

    var jbox = m.create('J-box',m.id),
        jheader = m.create('J-box-header'),
        jcont = m.create('J-box-cont');

    jbox.appendChild(jheader);
    jbox.appendChild(jcont);
    m.container.appendChild(jbox);

    jheader.innerHTML = m.headCont;
    jcont.innerHTML = m.bodyCont;

}
Boxer.prototype.create = function(className,id){
    var m = this,d = document;

    var domobj = d.createElement('div');
    if(className) domobj.className = className;
    if(id) domobj.id = id;

    return domobj;
}