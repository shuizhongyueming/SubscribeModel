function main(){
    var container = document.getElementById('demo');
    Clicker.init(container,'J-clicker');
    Hider.init(container,'J-hider');
    Changer.init(container,'J-changer');
        
    // Clicker广播click Hider 切换隐藏与显示
    function toggleHider(){Hider.toggleBox();}
    Clicker.subscribe('click',toggleHider);

    // Hider广播hide Clicker显示文本
    Hider.subscribe('hide',function(){Clicker.changeCont('Hider隐藏了');});

    // Hider广播show Clicker显示文本
    Hider.subscribe('show',function(){Clicker.changeCont('Hider显示了');});

    // Changer广播green Clicker显示文本 Hider比如隐藏
    Changer.subscribe('green',function(){
        Hider.hideBox();
        Clicker.changeCont('Hider 讨厌绿色 隐身了');
    });

    // Changer广播red Clicker显示文本 Hider必然显示
    Changer.subscribe('red',function(){
        Clicker.changeCont('Changer脸红的时候真好看');
        if(!Hider.visibleStatus) Hider.showBox();
    });

    // Clicker广播click Changer 切换背景固定与改变两种状态
    Clicker.subscribe('click',function(){Changer.toggle();});
};

document.getElementsByTagName('body')[0].onload = main;
