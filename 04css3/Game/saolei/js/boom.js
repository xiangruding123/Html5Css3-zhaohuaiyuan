/**
 * Created by Administrator on 2016/9/21 0021.
 */
function Boom(){
    this.size=550;
    this.level=5;
    this.gameBox=$("section article")
    this.spanArr=[];
    this.numArr=[];
    this.leiArr=[];
    this.timeSpan=$("#time");

    this.leiNumSpan=$("#leiNum");
}

Boom.prototype={
    init:function(){
        this.makeSpan();
        this.downBoom();
    },
    makeSpan:function(){
        for(var i =0;i<this.level*this.level;i++){
            $("<span>").css({
                width:this.size/this.level+'px',
                height:this.size/this.level+'px',
                background:this.randomColor(1),
                lineHeight:this.size/this.level+'px',
                animationDelay:(i*0.01)+"s"
            }).addClass("animated bounceIn").appendTo(this.gameBox)
        }
        var that=this;
        $("article span").on("webkitAnimationEnd",function(){
            $(this).removeClass("bounceIn");
            $(this).removeClass("jello");
        })
        $("article span").click(function(){
            $(this).addClass("jello")
            var index=$(this).index();
            $(this).html(that.leiArr[index]);
            if(that.leiArr[index]=='lei'){
                that.gameOver();
            }
        })

    },
    randomColor:function(o){
        var op=o||0.8;
        var num1=Math.floor(Math.random()*256);
        var num2=Math.floor(Math.random()*256);
        var num3=Math.floor(Math.random()*256);
        var str="rgba("+num1+","+num2+","+num3+","+op+")";
        return str;
    },
    downBoom:function(){

        var arr1=[];
        var leiNum=0;
        var num=this.level*this.level;
        for(var i = 0;i<num;i++){
            var ran=Math.random();
            if(ran>0.2){
                arr1.push(0);
            }else{
                arr1.push(-1);
                leiNum++;
            }
        }

       this.leiNumSpan.html(leiNum)
        var arr2=[];
        for(var i =0;i<this.level;i++){
            var sarr=[];
            for(var j =0;j<this.level;j++){
                sarr.push(arr1[i*this.level+j])
            }
            arr2.push(sarr)
        }

        for(var i =0;i<this.level;i++){
            for(var j=0;j<this.level;j++){
                if(arr2[i][j]==-1){
                    this.leiArr.push("lei")
                }else{
                    //var b1=arr2[i-1][j-1]?arr2[i-1][j-1]:0;
                    var b1=i>0&&j>0?arr2[i-1][j-1]:0;
                    var b2=i>0?arr2[i-1][j]:0;
                    var b3=i>0&&j<this.level-1?arr2[i-1][j+1]:0;
                    var b4=j>0?arr2[i][j-1]:0;
                    var b5=j<this.level-1?arr2[i][j+1]:0;
                    var b6=i<this.level-1&&j>0?arr2[i+1][j-1]:0;
                    var b7=i<this.level-1?arr2[i+1][j]:0;
                    var b8=i<this.level-1&&j<this.level-1?arr2[i+1][j+1]:0;
                    var num=b1+b2+b3+b4+b5+b6+b7+b8;

                    this.leiArr.push(Math.abs(num))
                }
            }
        }
    },
    gameOver:function(){
        var that=this;
        $("section article span").each(function(i){
            $(this).html(that.leiArr[i])
        })
    },
    play:function(){
        this.init();
        this.time();
    },
    time:function(){
        var m=0;
        var s=0;
        var that=this;
        setInterval(function(){
            s++;
            if(s>59){
                s=0;
                m++;
            }

            if(s<10){
                s="0"+s;
            }

            if(m<10){
                var str="0"+m+":"+s;
            }else{
                var str=m+":"+s;
            }
            that.timeSpan.html(str);
        },1000)
    }
}
