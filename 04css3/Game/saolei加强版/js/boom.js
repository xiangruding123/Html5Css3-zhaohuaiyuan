/**
 * Created by Administrator on 2016/9/21 0021.
 */
function Boom(){//���캯��
    this.size=550;//��Ϸ���ӵĳߴ�
    this.level=5;//nxn��n
    this.gameBox=$("section article");//�����Ϸ����dom������
    this.spanArr=[];//������е�С�������
    this.numArr=[];//û����
    this.leiArr=[];//���׻������ֵ�һΨ����
    this.timeSpan=$("#time");//��ʾʱ���dom
    this.timer=null;//��ʱ���������ļ�ʱ��
    this.timeObj={};//������Ϸʱ��Ķ���
    this.ze=$(".ze");//���ֲ�
    this.alertBox=$(".alertBox")//������
    this.leiNumSpan=$("#leiNum");//��ʾ������dom
}

Boom.prototype={
    init:function(){
        this.makeSpan();//��ҳ���д����С��
        this.downBoom();//�������Ϸ���׼����
    },
    makeSpan:function(){//����С��ķ���
        for(var i =0;i<this.level*this.level;i++){
            var span=$("<span>").css({
                width:this.size/this.level+'px',
                height:this.size/this.level+'px',
                background:this.randomColor(1),
                lineHeight:this.size/this.level+'px',
                animationDelay:(i*0.01)+"s"
            }).addClass("animated bounceIn").appendTo(this.gameBox);
            //����Щ��С��ŵ������һ�ߺ���������Ϸ��ʱ��ѵ�ǰҳ���е�С�鶼�Ƴ�
            this.spanArr.push(span);
        }
        var that=this;
        //С����ʾ��ɺ�Ѷ�������ȥ��
        $("article span").on("webkitAnimationEnd",function(){
            $(this).removeClass("bounceIn");
            $(this).removeClass("jello");
        })
        //��ҳ���е�С��ӵ���¼��������ж����˻���Ӯ��
        $("article span").click(function(){
            $(this).addClass("jello");
            //ȥ������������ֲ���±��Ӱ��
            var index=$(this).index()-2;
            //��������ʾ��ҳ����
            $(this).html(that.leiArr[index]);

            //�ж���û���䣬����㵽�׾����ˣ�ִ�����˵ķ���
            if(that.leiArr[index]=='lei'){
                that.gameOver();
            }
        })

    },
    randomColor:function(o){//���������ɫ�ķ���
        var op=o||0.8;
        var num1=Math.floor(Math.random()*256);
        var num2=Math.floor(Math.random()*256);
        var num3=Math.floor(Math.random()*256);
        var str="rgba("+num1+","+num2+","+num3+","+op+")";
        return str;
    },
    downBoom:function(){//�������׵Ĺ���

        //1.����һά���飬Ȼ������������������ף�-1��
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
        //2.��ҳ������ʾ����
       this.leiNumSpan.html(leiNum)
        //3.����һ����ά���飬ģ��ҳ����ʾ״̬��Ϊ�˺ü���ÿ������Ӧ����ʾ��
        var arr2=[];
        //��һά����������ݷŵ���ά������
        for(var i =0;i<this.level;i++){
            var sarr=[];
            for(var j =0;j<this.level;j++){
                sarr.push(arr1[i*this.level+j])
            }
            arr2.push(sarr)
        }

        //�ж�ÿһ��λ����Χ�м����ף�Ȼ��������˾������ŵ�һ�������б�������
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
    gameOver:function(){//��Ϸ�����ķ���
        var that=this;
        //�����е����ݣ��������׻���������ʾ����
        $("section article span").each(function(i){
            $(this).html(that.leiArr[i])
        });
        //�õ����Զ����ķ�ʽ����
        this.alertBox.show();
        this.alertBox.addClass("zoomIn");
        //ִ����һ����ͣ�ķ�������Ҫ��Ϊ�˲����û��㣬���аѼ�ʱ��ͣ����
        this.pause();

    },
    play:function(){//��ʼ��Ϸ�ķ���
        this.init();//��ʼ��
        //�򿪼�ʱ��
        this.time();
    },
    time:function(){//��ʱ���ķ���
        //�ж�һ����û�б���������ʱ�䣨��֮ͣ���ּ�����Ϸʱ��
        if(!this.timeObj.m){
            this.timeObj.m=0;
        }
        if(!this.timeObj.s){
            this.timeObj.s=0;
        }
        var that=this;
        //��ʱ��һ��仯һ��
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
    pause:function(){//��ͣ�ķ���
        var that=this;
        //��ʱ��ֹͣ
        clearInterval(that.timer);
        //�����ֲ���ʾ����
        this.ze.show();

    },
    //������Ϸ�ķ���
    continue:function(){
        //��ʼ��ʱ��
        this.time();
        //�������ֲ�
        this.ze.hide();
    },
    //���¿�ʼ��Ϸ�ķ���
    restart:function(){

        //������ʧ
        this.alertBox.hide();
        //���ֲ���ʧ
        this.ze.hide();
        //ʱ������
        this.timeSpan.html("00:00");
        //�������Ƴ���������
        this.alertBox.removeClass("zoomIn");
        //��ҳ���е�spanȫ���Ƴ�
        $(this.spanArr).each(function(){
            $(this).remove();
        })

        //�������������ݵĳ�ʼ��
        this.spanArr=[];
        this.numArr=[];
        this.leiArr=[];
        this.timer=null;
        this.timeObj={};

        //��ʼ����Ϸ
        this.play();

    }
}

