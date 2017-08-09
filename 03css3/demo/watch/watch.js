/**
 * Created by Administrator on 2016/9/20 0020.
 */
//ÿһ�����������Ժͷ���
function Watch(size,selector){
    //��������
    //��ĳߴ磬Ҳ���Ǳ��ֱ��
    this.size=size||200;
    //���̵���ɫ
    this.bgColor="#f5f5f5";
    //��ű���dom������
    this.Pan=null;
    //�������dom������
    this.sP=null;
    //��ŷ���dom������
    this.mP=null;
    //�ű��dom�ĺ���
    this.box=$(selector);
}
//A.prototype.B=C;
Watch.prototype={
    //��ʼ��
    init:function(){
       this.makePan();//������
        this.makeKedu();//���̶�
        this.makePointer();//���󣬰����ö���
        this.movePointer();//���붯
    },
    makePan:function(){//�����̵ķ���
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
                //���ж���ķ���
                left:"0px",
                right:"0px",
                margin:"0 auto",
                transformOrigin:"center "+(this.size/2)+'px',
                transform:"rotate("+(i*6)+"deg)"
            }).appendTo(this.Pan)
        }
    },
    makePointer:function(){//������ķ���
        this.sP=$("<p>").css({//����
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

        this.mP=$("<p>").css({//����
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
    movePointer:function(){//���붯�ķ���
        var date=new Date();
        var s=date.getSeconds();
        var m=date.getMinutes();
        this.sP.css({
            transform:"rotate("+(s*6)+"deg)"
        })

        this.mP.css({
            transform:"rotate("+(m*6+s/10)+"deg)"
        })
        var that=this;//�ı�ָ��
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
