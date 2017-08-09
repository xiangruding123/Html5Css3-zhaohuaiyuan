/**
 * Created by Administrator on 2016/8/29 0029.
 */

//实现点击右上角按钮让小屏下的nav出现
$("#navBtn").click(function(){
    $(".smallnav").slideToggle()
})

//实现点击小屏nav中的li，让nav消失
$(".smallnav li").click(function(){
    $(".smallnav").slideToggle();
})

//实现小屏下搜索功能
var searchFlag=true;
$(".searchBtn").click(function(){
    if(searchFlag){
        $(".mysform input").css({
            visibility:"visible",
            width:"25vw"
        });
        searchFlag=false;
    }else{
        $(".mysform input").css({
            visibility:"hidden",
            width:"0vw"
        });
        searchFlag=true;
    }

})