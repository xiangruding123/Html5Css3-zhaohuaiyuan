/**
 * Created by Administrator on 2016/9/22 0022.
 */

//��ȡ�����ڱ��ش洢�������ݣ����û�о�����������
var mesArr = localStorage.message ? JSON.parse(localStorage.message) : [];
//[
//    {bt:"11",ti:"aa",nr:"sadsa"},
//    {bt:"11",ti:"aa",nr:"sadsa"},
//    {bt:"11",ti:"aa",nr:"sadsa"}
//]
//��ȡ������ÿһ����ݶ��ŵ�ҳ������ʾ
$(mesArr).each(function() {
	addBoxFun(this);
})

//�����ݵİ�ť�����֮���������ݵĿ�ͳ����ˣ�ͬʱ���ֲ�Ҳ����
$("#addBtn").click(function() {
	$(".ze").removeClass("hidden");
	$(".addBox").removeClass("hidden");
	$(".addBox").addClass("bounceIn");
})
//�����Ĺرհ�ť
$(".addBox header i").click(function() {
	$(".addBox").addClass("hidden")
})
//������������ݵİ�ť
$("#reset").click(function() {
	$("#bt").val("");
	$("#ti").val("");
	$("#nr").val("");
})

//����������ݱ�������������ʾ��ҳ����
$("#save").click(function() {
	//��ȡ��������ݣ�������һ��obj����
	var bt = $("#bt").val();
	var ti = $("#ti").val();
	var nr = $("#nr").val();
	var obj = {};
	obj.bt = bt;
	obj.ti = ti;
	obj.nr = nr;
	//���¼������ݷŵ����ش洢��
	mesArr.push(obj);
	localStorage.message = JSON.stringify(mesArr);
	//�������������ʾ��ҳ����
	addBoxFun(obj)
	//��������ȥ�����ֲ�
	$("#bt").val("");
	$("#ti").val("");
	$("#nr").val("");
	$(".ze").addClass("hidden")
})

//��Ϊconbox���ܻ����û���������֣�������Ҫ���¼�ί�и�conbox�ӵ���¼�
$("section").delegate(".conBox", "click", function(e) {
	//��ȡ�����conbox���±�
	var index = $(this).index() - 1;

	//���������conbox�ϵĹرհ�ť
	if(e.target.tagName == "I") {
		//��������ݴ�ҳ����ɾ��
		$(this).remove();
		//����������ڴ洢��Ҳɾ��
		mesArr.splice(index, 1);
		localStorage.message = JSON.stringify(mesArr);
		return;
	}
	//����������ĸ�ѡ��򣬾Ͳ�Ҫ��������Ĳ�����
	if(e.target.tagName == "INPUT") {
		return;
	}

	//�������������ݿ���Ϊconbox��ʾ�����ݲ�ȫ����Ҫ�ڵ��֮�󵯳�һ�����ݿ���������������
	//���ֲ���ʾ
	$(".ze").removeClass("hidden");
	//���ݿ���ʾ
	$(".alertBox").removeClass("hidden");
	//�����ݿ������滻������conbox��Ӧ�����
	var bt = $(this).find("h5").html()
	var ti = $(this).find("p").eq(0).html()
	var nr = mesArr[index].nr;
	$(".alertBox h3").html(bt)
	$(".alertBox p:first-of-type").html(ti)
	$(".alertBox p:last-of-type").html(nr)

})
//���ֲ�����ʱ���õ����Ŀ�ȥ�������ֲ�Ҳ��ʧ
$(".ze").click(function() {
	$(".alertBox").addClass("hidden");
	$(".addBox").addClass("hidden");
	$(this).addClass("hidden");
})

//ȫ��ɾ��Ĳ���
$(".clearAll").click(function() {
	//�Ȱѱ��ش洢���������
	mesArr = [];
	localStorage.clear();

	//�����е�ҳ���е�conbox��ʧ����ע�ⲻ�ܰ�ģ���remove
	$(".conBox").each(function(i) {
		if(i != 0) {
			$(this).remove();
		}
	});
})

//ѡ�񲿷����ɾ��
$(".clearSome").click(function() {
	//����Ҫɾ�����ݶ�Ӧ���±�
	var checkArr = [];
	//��Ҫɾ�������±�ŵ��������������ǣ���һ��conbox�����checkbox��ѡ�񣬾Ͱ����conbox���±�ŵ�������
	$(".conBox").each(function() {
		if($(this).find("input")[0].checked) {
			var index = $(this).index() - 1;
			checkArr.push(index)
		}
	})

	//�ѱ�ѡ�е�conbox��ҳ��ɾ���
	$(".conBox").each(function() {
		if($(this).find("input")[0].checked) {
			$(this).remove()
		}
	})

	//��mesArr�����Ӧ��Ӧ��ɾ������ɾ���
	$(checkArr).each(function(i) {
		mesArr.splice(this - i, 1);
	})

	//���±��ش洢��������
	localStorage.message = JSON.stringify(mesArr);

})

//���֮��ÿ��conbox����ѡ�����ֻ�����ʧ
$("#checkAll").click(function() {
	$("input[type=checkbox]").toggleClass("hidden");
})

//��һ����ݷŵ�ҳ����
function addBoxFun(obj) {
	//��������obj������һ�����

	//���п�¡����ҳ���е�ģ���¡��һ�ݣ�����������ݸĳɴ�������obj��������ݣ���ʾ��ҳ����
	var con = $("article .conBox").eq(0).clone().removeClass("hidden").addClass("zoomIn").appendTo($("article"));

	con.find("h5").html(obj.bt);
	con.find("p").eq(0).html(obj.ti);
	var nr = obj.nr;
	//ҳ���е�����̫���Ļ��ͱ�...
	if(nr.length > 10) {
		con.find("p").eq(1).html(nr.slice(0, 10) + "...");
	} else {
		con.find("p").eq(1).html(nr);
	}
	//������¼������ݵĻ��أ���ʾ��ʱ����Ҫ��addboxȥ��
	$(".addBox").addClass("hidden");
}