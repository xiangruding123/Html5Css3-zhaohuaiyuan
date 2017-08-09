/**
 * Created by Administrator on 2016/9/21 0021.
 */
function Boom(){//构造函数
    this.size=550;//游戏盒子的尺寸
    this.level=5;//nxn的n
    this.gameBox=$("section article");//存放游戏盒子dom的属性
    this.spanArr=[];//存放所有的小块的数组
    this.numArr=[];//没有用
    this.leiArr=[];//放雷还有数字的一唯数组
    this.timeSpan=$("#time");//显示时间的dom
    this.timer=null;//让时间跑起来的计时器
    this.timeObj={};//保留游戏时间的对象
    this.ze=$(".ze");//遮罩层
    this.alertBox=$(".alertBox")//弹出框
    this.leiNumSpan=$("#leiNum");//显示雷数的dom
}

Boom.prototype={
    init:function(){
        this.makeSpan();//在页面中创造出小块
        this.downBoom();//把这局游戏的雷计算好
    },
    makeSpan:function(){//制造小块的方法
        for(var i =0;i<this.level*this.level;i++){
            var span=$("<span>").css({
                width:this.size/this.level+'px',
                height:this.size/this.level+'px',
                background:this.randomColor(1),
                lineHeight:this.size/this.level+'px',
                animationDelay:(i*0.01)+"s"
            }).addClass("animated bounceIn").appendTo(this.gameBox);
            //把这些个小块放到数组里，一边后面重新游戏的时候把当前页面中的小块都移除
            this.spanArr.push(span);
        }
        var that=this;
        //小块显示完成后把动画类名去掉
        $("article span").on("webkitAnimationEnd",function(){
            $(this).removeClass("bounceIn");
            $(this).removeClass("jello");
        })
        //给页面中的小块加点击事件，并且判断输了还是赢了
        $("article span").click(function(){
            $(this).addClass("jello");
            //去除弹出框和遮罩层对下标的影响
            var index=$(this).index()-2;
            //把内容显示在页面中
            $(this).html(that.leiArr[index]);

            //判断有没有输，如果点到雷就输了，执行输了的方法
            if(that.leiArr[index]=='lei'){
                that.gameOver();
            }
        })

    },
    randomColor:function(o){//制造随机颜色的方法
        var op=o||0.8;
        var num1=Math.floor(Math.random()*256);
        var num2=Math.floor(Math.random()*256);
        var num3=Math.floor(Math.random()*256);
        var str="rgba("+num1+","+num2+","+num3+","+op+")";
        return str;
    },
    downBoom:function(){//整个下雷的过程

        //1.创建一维数组，然后在里面随机的填上雷（-1）
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
        //2.在页面中显示雷数
       this.leiNumSpan.html(leiNum)
        //3.创建一个二维数组，模拟页面显示状态，为了好计算每个空里应该显示几
        var arr2=[];
        //把一维数组里的数据放到二维数组里
        for(var i =0;i<this.level;i++){
            var sarr=[];
            for(var j =0;j<this.level;j++){
                sarr.push(arr1[i*this.level+j])
            }
            arr2.push(sarr)
        }

        //判断每一个位置周围有几个雷，然后把正儿八经的数放到一个属性中保存起来
        for(var i =0;i<this.level;i++){
            for(var j=0;j<this.level;j++){
                if(arr2[i][j]==-1){
                    this.leiArr.push("lei")
                }else{
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
    gameOver:function(){//游戏结束的方法
        var that=this;
        //把所有的数据，不管是雷还是数都显示出来
        $("section article span").each(function(i){
            $(this).html(that.leiArr[i])
        });
        //让弹框以动画的方式出来
        this.alertBox.show();
        this.alertBox.addClass("zoomIn");
        //执行了一下暂停的方法，主要是为了不让用户点，还有把计时器停下来
        this.pause();

    },
    play:function(){//开始游戏的方法
        this.init();//初始化
        //打开计时器
        this.time();
    },
    time:function(){//计时器的方法
        //判断一下有没有保存下来的时间（暂停之后又继续游戏时）
        if(!this.timeObj.m){
            this.timeObj.m=0;
        }
        if(!this.timeObj.s){
            this.timeObj.s=0;
        }
        var that=this;
        //让时间一秒变化一下
        this.timer=setInterval(function(){
            that.timeObj.s++;
            if(that.timeObj.s>59){
                that.timeObj.s=0;
                that.timeObj.m++;
            }
            if(that.timeObj.s<10){
                that.timeObj.s="0"+that.timeObj.s;
            }
            if(that.timeObj.m<10){
                var str="0"+that.timeObj.m+":"+that.timeObj.s;
            }else{
                var str=that.timeObj.m+":"+that.timeObj.s;
            }
            that.timeSpan.html(str);
        },1000)
    },
    pause:function(){//暂停的方法
        var that=this;
        //计时器停止
        clearInterval(that.timer);
        //把遮罩层显示出来
        this.ze.show();

    },
    //继续游戏的方法
    continue:function(){
        //开始计时器
        this.time();
        //隐藏遮罩层
        this.ze.hide();
    },
    //重新开始游戏的方法
    restart:function(){

        //弹框消失
        this.alertBox.hide();
        //遮罩层消失
        this.ze.hide();
        //时间清零
        this.timeSpan.html("00:00");
        //弹出框移除动画类名
        this.alertBox.removeClass("zoomIn");
        //把页面中的span全部移除
        $(this.spanArr).each(function(){
            $(this).remove();
        })

        //进行了所有数据的初始化
        this.spanArr=[];
        this.numArr=[];
        this.leiArr=[];
        this.timer=null;
        this.timeObj={};

        //开始了游戏
        this.play();

    }
}

