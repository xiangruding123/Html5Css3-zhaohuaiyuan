/**
 * Created by Administrator on 2016/9/20 0020.
 */
//每一个对象都有属性和方法
function Watch(size,selector){
    //自有属性
    //表的尺寸，也就是表的直径
    this.size=size||200;
    //表盘的颜色
    this.bgColor="#f5f5f5";
    //存放表盘dom的属性
    this.Pan=null;
    //存放秒针dom的属性
    this.sP=null;
    //存放分针dom的属性
    this.mP=null;
    //放表的dom的盒子
    this.box=$(selector);
}
//A.prototype.B=C;
Watch.prototype={
    //初始化
    init:function(){
       this.makePan();//做表盘
        this.makeKedu();//做刻度
        this.makePointer();//做阵，包括好多针
        this.movePointer();//让针动
    },
    makePan:function(){//创建盘的方法
        this.Pan=$("<div>").css({
            width:this.size+'px',
            height:this.size+'px',
            borderRadius:"50%",
            background:this.bgColor,
            border:"2px solid #333",
            position:"relative"
        }).appendTo(this.box);
    },
    makeKedu:function(){
        var h;
        for(var i =0;i<60;i++){
            h=10;
            if(i%5==0){
                h=15;
            }
            $("<p>").css({
                width:"3px",
                height:h+"px",
                background:"#333",
                position:"absolute",
                //居中对齐的方法
                left:"0px",
                right:"0px",
                margin:"0 auto",
                transformOrigin:"center "+(this.size/2)+'px',
                transform:"rotate("+(i*6)+"deg)"
            }).appendTo(this.Pan)
        }
    },
    makePointer:function(){//创建针的方法
        this.sP=$("<p>").css({//秒针
            width:"2px",
            height:(this.size/2-30)+'px',
            background:"red",
            position:"absolute",
            left:"0px",
            right:"0px",
            top:"30px",
            margin:"0 auto",
            transformOrigin:"center bottom"
        }).appendTo(this.Pan);

        this.mP=$("<p>").css({//分针
            width:"2px",
            height:(this.size/2)+'px',
            background:"#333",
            position:"absolute",
            left:"0px",
            right:"0px",
            top:"0px",
            margin:"0 auto",
            transformOrigin:"center bottom"
        }).appendTo(this.Pan);

    },
    movePointer:function(){//让针动的方法
        var date=new Date();
        var s=date.getSeconds();
        var m=date.getMinutes();
        this.sP.css({
            transform:"rotate("+(s*6)+"deg)"
        })

        this.mP.css({
            transform:"rotate("+(m*6+s/10)+"deg)"
        })
        var that=this;//改变指针
        setInterval(function(){
            var date=new Date();
            var s=date.getSeconds();
            var m=date.getMinutes();
            that.sP.css({
                transform:"rotate("+(s*6)+"deg)"
            })
            that.mP.css({
                transform:"rotate("+(m*6+s/10)+"deg)"
            })
        },1000)
    }
}
