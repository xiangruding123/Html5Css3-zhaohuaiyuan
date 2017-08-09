/**
 * Created by Administrator on 2016/9/26 0026.
 */
//模拟获取到的关于歌曲的数据数组
var musicData = [{
		name: "第一首歌",
		src: "./music/1.mp3",
		imgUrl: "./img/1.jpg"
	},
	{
		name: "第二首歌",
		src: "./music/2.mp3",
		imgUrl: "./img/2.jpg"
	},
	{
		name: "第三首歌",
		src: "./music/3.mp3",
		imgUrl: "./img/3.jpg"
	}
];
//总共有多少歌
var musicLen = musicData.length;

//循环播放 0 单曲循环 1  随机播放 2
var musicStyle = 0;
//audio标签
var audio = $("audio")[0];

//控制音量变化的变量，值是0-1的数值类型
var vol = 0.5;

//在页面加载的时候，把音量调整到默认值，而且显示出来
volumn(vol);

//控制播放第几个歌曲的变量
var musicNum = 0;

//控制改变音量并且页面中的样式也按照改变后的音量显示的函数
function volumn(vol) {
	//设置audio的音量
	audio.volume = vol;
	//或者音量点能移动的最大距离
	var farway = $(".volumnBox").width() - 20;
	//算出比率
	var bl = vol / 1;
	//按照设置后的音量去显示
	$(".volumnValue").css("width", farway * bl + 'px');
	$(".volumnPoint").css("left", farway * bl + 'px');
}

function init() { //页面初始化的函数
	//把歌曲信息加载到歌曲列表里
	var listStr = '';
	$(musicData).each(function(i) {
		//注意要给第一个li加on类名，加上之后这个li后面会有动画，在css里面有，自己去看
		var on = '';
		if(i == musicNum) {
			on = "on"
		}
		listStr += "<li class='musicItem " + on + "'><p>" + this.name + "</p><p class='musicAni pull-right'><span></span><span></span><span></span><span></span></p></li>";
	})
	$(".musicList").html(listStr);
	//执行切换歌曲，其实是为了让图片、audio标签都设置成第一首歌的情况
	changeMusic();
}

//换歌的函数
function changeMusic() {

	//换歌之后让图片去掉旋转的类名等，也就是恢复原有状态
	$("section img").removeClass("rota");
	$("section img").css({
		transform: "rotate(0deg)"
	})

	//记录换歌前是处于播放状态还是暂停状态
	var paused = audio.paused;

	//改变图片和audio的路径
	$("section img").prop("src", musicData[musicNum].imgUrl)
	audio.src = musicData[musicNum].src;

	//如果换歌前播放，换歌后依然播放
	if(!paused) {
		audio.play();
		$("section img").addClass("rota");
		$("section img").css({
			animationPlayState: "running"
		})
	}

	//歌曲总长显示，因为只是改变了audio的src，这个时候歌曲文件还没有加载进来，也就是获取不到歌曲总长，所以写一个计时器，什么时候能获取到总长，那就什么时候去显示总长
	var timer = setInterval(function() {
		if(audio.duration) {
			$(".timeValue .allTime").html(makeTime(audio.duration))
			clearInterval(timer);
		}
	}, 30)

	//换歌之后，进度归零
	$(".progressValue").css("width", "0%");
	$(".progressPoint").css("left", "0");

}

//为了把一个秒数转换成00:00的格式的字符串
function makeTime(time) {
	var time = time;
	var m = Math.floor(time / 60);
	var s = parseInt(time % 60);
	if(m < 10) {
		m = "0" + m;
	}
	if(s < 10) {
		s = "0" + s;
	}
	return m + ":" + s
}

//给歌曲列表里的li加点击事件
$(".musicList").delegate("li", "click", function() {
	//获取到当前li的序列号，为了调整当前播放那一首歌的变量
	var index = $(this).index();
	musicNum = index;
	//进行换歌
	changeMusic();

	//让播放的哪个li有动画
	$(".musicItem").removeClass("on");
	$(this).addClass("on");
})

//点击按钮，让歌曲列表出来
$("#listBtn").click(function() {
	$(".musicList").slideToggle();
})

//执行初始化
init();

//点击播放暂停按钮的方法
function play() {

	if(audio.paused) {
		audio.play();
		$("#playBtn").removeClass("glyphicon-play");
		$("#playBtn").addClass("glyphicon-pause");
		$("section img").addClass("rota");
		$("section img").css({
			animationPlayState: "running"
		})
	} else {
		audio.pause();
		$("#playBtn").addClass("glyphicon-play");
		$("#playBtn").removeClass("glyphicon-pause");
		$("section img").css({
			animationPlayState: "paused"
		})
	}
}

//点击播放按钮，执行播放的函数
$("#playBtn").click(function() {
	play();
})

//下一曲的函数
function next() {
	//根据musicStyle不同，所以不同的去改变musicNum的值
	if(musicStyle == 0) {
		musicNum++;
		if(musicNum == musicData.length) {
			musicNum = 0;
		}
	}
	//播放歌曲
	changeMusic();
}
//上一曲函数
function prev() {
	if(musicStyle == 0) {
		musicNum--;
		if(musicNum < 0) {
			musicNum = musicLen - 1;
		}
	}
	changeMusic();
}

//点击上一曲和下一曲按钮的事件
$("#nextBtn").click(function() {
	next();
})
$("#prevBtn").click(function() {
	prev();
})

//给audio标签添加事件，这个事件会在播放的过程中连续触发，当不播放的时候就不触发

//根据这个事件的特性，去做进度条随着歌曲播放时间的改变而改变
audio.addEventListener("timeupdate", function() {
	//获取歌曲总长
	var duration = this.duration;
	//获取当前播放事件
	var time = this.currentTime;
	//获取播放进度（比例）
	var bl = time / duration;
	//进度条能走的最大距离
	var farway = $(window).width() - 20;
	//进度条需要改变的距离
	var way = bl * farway;
	//进度条改变距离
	$(".progressPoint").css("left", way + 'px');
	$(".progressValue").css("width", way + 5 + 'px');
	//显示当前播放时间
	$(".timeValue .nowTime").html(makeTime(time));
	//播放完成后换歌
	if(audio.ended) {
		next();
		audio.play();
		$("section img").addClass("rota")
	}
})

//进度条的小点拖动
//开关
var proFlag = false;
//获取当前点击之后小点的位置
var ox;
//获取点之后鼠标的位置
var dx;
$(".progressPoint").mousedown(function(e) {
	ox = $(this).offset().left;
	dx = e.pageX;
	proFlag = true;
})
$(document).mousemove(function(e) {
	if(!proFlag) {
		return;
	}
	var nx = e.pageX;
	var nnx = nx - dx + ox;
	$(".progressPoint").css("left", nnx + 'px');
	$(".progressValue").css("width", nnx + 'px');
	var duration = audio.duration;
	var farway = $(window).width() - 20;
	var bl = nnx / farway;
	//设置当前播放时间
	audio.currentTime = duration * bl;

})
$(document).mouseup(function(e) {
	proFlag = false;
})

var volFlag = false;
var vx;
var vdx;
$(".volumnPoint").mousedown(function(e) {
	vx = parseInt($(this).css("left")); //当前小点的位置
	vdx = e.pageX; //鼠标事件的初始位置
	volFlag = true;
})
$(document).mousemove(function(e) {

	if(!volFlag) {
		return;
	}
	var nx = e.pageX; //鼠标事件的结束位置

	var nnx = nx - vdx + vx; //增量
	if(nnx < 0) {
		nnx = 0;
	}
	if(nnx > farway) {
		nnx = farway;
	}
	$(".volumnPoint").css("left", nnx + 'px');
	$(".volumnValue").css("width", nnx + 'px');
	var farway = $(".volumnBox").width() - 20;
	var bl = nnx / farway;
	vol = 1 * bl;
	if(vol > 1) {
		vol = 1;
	}
	volumn(vol)

})
$(document).mouseup(function(e) {
	volFlag = false;
})