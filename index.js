
/*1.简单引入jquery
 * $(function(){
 * 	
 * })
 * 2.跟其他库有冲突时： jQuery.noConflict()
 * 3.追加类 class：addclass 当点击按钮时 追加一个class，换一个样式
 * 4.切换样式：toggleclass:
 * 5.获取焦点是：focus  失去焦点：blur 
 * 6.hover(over,leave)光标移入移出的两个函数
 * 7.toggle(fun1,fun2,..,fun):鼠标第一次，2.3.4次单击触发响应函数，循环
 * 8.event.type(事件类型)  event.preventDefault() event.stopPropagation() event.target(事件元素)
 * 
 * 
 */

$(document).ready(function() {

	$("#In1").click(function() {
		if($("#text1").val()) {
			alert("我收到了你的" + $("#text1").val());
		}
	});

	function changeImg(index) {
		$(".changeImg li").eq(index).fadeIn().siblings().fadeOut();
		$(".foucs li").eq(index).css({
				background: "pink"
			})
			.siblings().css({
				background: "#66FFFF"
			});
	}
	var len = $(".changeImg li").length;
	var index = 0;
	var timer;
	changeImg(index);
	//自动播放
	function auto() {
		timer = setInterval(function() {
			index++;
			if(index === len) {
				index = 0;
			}
			changeImg(index);
		}, 2000);
	}
	auto();

	//左边轮播
	$("#btn1").click(function() {
		clearInterval(timer);
		index--;
		if(index === -1) {
			index = len - 1;
		}
		changeImg(index);
		auto();
	})
	//右边轮播
	$("#btn2").click(function() {
		clearInterval(timer);
		index++;
		if(index === len) {
			index = 0;
		}
		changeImg(index);
		auto();
	})

	//序号轮播
	$(".foucs li").click(function() {
		clearInterval(timer);
		var index = $(this).index();
		changeImg(index);
		auto();
	});

	//鼠标悬浮 停止
	$(".changeImg li").mouseover(function() {
		clearInterval(timer);
	});
	$(".changeImg li").mouseout(function() {
		auto();
	});

	//设置日历
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();

	function showDate(year, month, day) {

		$(".headerRight #t1").text(" " + year + "年" + month + "月" + day + "日");
		//当月第一天是星期几
		var firstDay = new Date(year, month - 1, 1);
		var week = firstDay.getDay();
		var days; //一个月的天数
		switch(month) {
			case 1:
				days = 31;
				break;
			case 2:
				if(year % 4 && year % 100 || year % 400) {
					days = 29;
				} else {
					days = 28;
				}
				break;
			case 3:
				days = 31;
				break;
			case 4:
				days = 30;
				break;
			case 5:
				days = 31;
				break;
			case 6:
				days = 30;
				break;
			case 7:
				days = 31;
				break;
			case 8:
				days = 31;
				break;
			case 9:
				days = 30;
				break;
			case 10:
				days = 30;
				break;
			case 11:
				days = 30;
				break;
			case 12:
				days = 31;
				break;
			default:

				break;
		}
		//给表格填入具体的某一天
		for(var i = 0; i < days; i++) {
			var index = week + i + 7;
			$(".headerRight table td:eq(" + index + ")").text(i + 1);
		}
		showTime(day);
	}
	showDate(year, month, day);
	//设置当前日显示
	function showTime(day) {
		for(var i = 0; i < 49; i++) {
			var text = $(".headerRight table td:eq(" + i + ")").text();

			if(text == day) {
				$(".headerRight table td:eq(" + i + ")").css({
						background: 'pink'
					}).siblings()
					.css({
						background: 'none'
					});
			}
		}
	}

	$(".headerRight table td").append("<a><a/>");
	$(".headerRight table td").mouseover(function() {
		if($(this).text()) {
			$(this).css({
				background: "pink"
			})
		}
	}).mouseout(function() {
		$(this).css({
			background: "none"
		})
		showTime(day);
	})

	function nextMonth() {
		month++;
		if(month == 13) {
			month = 1;
		}
		for(var i = 0; i < 42; i++) {
			var index = 7 + i;
			$(".headerRight table td:eq(" + index + ")").html("");
		}
		showDate(year, month, day);
	}

	function lastMonth() {
		month--;
		if(month == 0) {
			month = 12;
		}
		for(var i = 0; i < 42; i++) {
			var index = 7 + i;
			$(".headerRight table td:eq(" + index + ")").html("");
		}
		showDate(year, month, day);
	}
	$("#bbtn2").click(function() {
		nextMonth();
	});
	$("#bbtn1").click(function() {
		lastMonth();
	});
	
	
	//时钟
	var $clock = $("#huabu").get(0).getContext("2d"); //$中使用画布
	
	function play () {
		$clock.clearRect(0,0,120,120);
		$clock.save();
		$clock.translate(60, 60); //把画布中心转移到canvas中间
		biaopan();
		run();
		$clock.restore();
	}
	setInterval(function(){
		play();
	},1000);

	function biaopan() {
		//绘制表盘
		$clock.strokeStyle = " #99CCFF";
		$clock.lineWidth = 2;
		$clock.beginPath();
		$clock.arc(0, 0, 59, 0, 2 * Math.PI);
		$clock.stroke();
		//刻度
		$clock.strokeStyle = "#98B5FF";
		$clock.lineWidth = 3;
		for(var i = 0; i < 12; i++) {
			$clock.beginPath();
			$clock.moveTo(0, -59);
			$clock.lineTo(0, -50);
			$clock.stroke();
			$clock.rotate(2 * Math.PI / 12);
		}
		$clock.strokeStyle = "#98B5FF";
		$clock.lineWidth = 1;
		for(var i = 0; i < 60; i++) {
			$clock.beginPath();
			$clock.moveTo(0, -59);
			$clock.lineTo(0, -55);
			$clock.stroke();
			$clock.rotate(2 * Math.PI / 60);
		}
		//绘制文字
		$clock.textAlign = "center";
		$clock.textBaseline = "middle";
		$clock.fillStyle = "#6495ED";
		$clock.font = "8px 微软雅黑"
		for(var i = 1; i < 13; i++) {
			$clock.fillText(i,Math.sin(2*Math.PI /12*i)*40,Math.cos(2*Math.PI/12*i)*-40);
		}
	}

	
	function run () {
		var date = new Date();
		var h = date.getHours();
		var m = date.getMinutes();
		var s = date.getSeconds();
		if (h > 12) {
			h = h - 12;
		}
		//时针
		//分针60格 分针5格 
		$clock.save();
		$clock.rotate(2*Math.PI/12*h+(2*Math.PI/60*m+2*Math.PI/60*s/60)/12);
		$clock.strokeStyle = "#00FF00";
		$clock.lineWidth = 4;
		$clock.beginPath();
		$clock.moveTo(0, 0);
		$clock.lineTo(0, -25);
		$clock.stroke();
		$clock.restore();
		//分针
		//秒针60格 分针一格
		$clock.beginPath();
		$clock.strokeStyle = "#32CD32";
		$clock.lineWidth = 2;
		$clock.save();
		$clock.rotate(2*Math.PI/60*m+2*Math.PI/60*s/60);
		$clock.moveTo(0, 0);
		$clock.lineTo(0, -35);
		$clock.stroke();
		$clock.restore();
		//秒针
		$clock.strokeStyle = "#191970";
		$clock.rotate(2*Math.PI/60*s);
		$clock.lineWidth = 1;
		$clock.beginPath();
		$clock.moveTo(0, 0);
		$clock.lineTo(0, -45);
		$clock.stroke();
		//中心
		$clock.fillStyle = "#8A2BE2";
		$clock.beginPath();
		$clock.arc(0, 0, 5, 0, 2 * Math.PI);
		$clock.fill();
		$clock.strokeStyle = "cadetblue";
		$clock.stroke();
	}
		
		
	
	
	
});