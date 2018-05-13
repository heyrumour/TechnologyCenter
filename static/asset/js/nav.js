var $navLi = $("#header .nav>li");
$navLi.hover(function(){
    $(this).children('ul').stop(true,true).slideDown(300);
},function(){
    $(this).children('ul').stop(true,true).slideUp(300);
});

var _pathname = window.location.pathname;
if(_pathname.indexOf('message')>0){
    $navLi.eq(7).addClass('active').siblings().removeClass('active');
}else if(_pathname.indexOf('birthday')>0){
    $navLi.eq(6).addClass('active').siblings().removeClass('active');
}else if(_pathname.indexOf('team')>0){
    $navLi.eq(5).addClass('active').siblings().removeClass('active');
}else if(_pathname.indexOf('star')>0){
    $navLi.eq(4).addClass('active').siblings().removeClass('active');
}else if(_pathname.indexOf('source')>0){
    $navLi.eq(3).addClass('active').siblings().removeClass('active');
}else if(_pathname.indexOf('share')>0){
    $navLi.eq(2).addClass('active').siblings().removeClass('active');
}else if(_pathname.indexOf('blog')>0){
    $navLi.eq(1).addClass('active').siblings().removeClass('active');
}else{
    $navLi.eq(0).addClass('active').siblings().removeClass('active');
}