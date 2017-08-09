/**
 * Created by Administrator on 2016/9/26 0026.
 */
$(".sNavBtn").click(function(){
    $("#sNav").slideToggle()
})


var sFromFlag=true;
$("#sFormBtn").click(function(){
    if(sFromFlag){
        $(".sForm input").css("width","30vw");
        sFromFlag=false;
    }else{
        $(".sForm input").css("width","0");
        sFromFlag=true;
    }

})