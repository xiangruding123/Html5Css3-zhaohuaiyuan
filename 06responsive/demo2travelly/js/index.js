/**
 * Created by Administrator on 2016/8/29 0029.
 */

//ʵ�ֵ�����Ͻǰ�ť��С���µ�nav����
$("#navBtn").click(function(){
    $(".smallnav").slideToggle()
})

//ʵ�ֵ��С��nav�е�li����nav��ʧ
$(".smallnav li").click(function(){
    $(".smallnav").slideToggle();
})

//ʵ��С������������
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