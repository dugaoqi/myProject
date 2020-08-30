//格式化日期
function createDate(){
	var d = new Date()
	var year = d.getFullYear()
	var mon = d.getMonth()
	var mydate = d.getDate()
	var day = d.getDay()
	var hour = d.getHours()
	var minu = d.getMinutes()
	var sec = d.getSeconds()
	switch(day){
		case 0:day = "周日";break;
		case 1:day = "周一";break;
		case 2:day = "周二";break;
		case 3:day = "周三";break;
		case 4:day = "周四";break;
		case 5:day = "周五";break;
		case 6:day = "周六";break;
	}
return ( year +"年" + addZero(mon+1) + "月" + addZero(mydate) + "日 " + day + " " + addZero(hour) + ":" + addZero(minu) + ":" + addZero(sec) )
}
//十位补零
function addZero(n){
	if(n.length<2 || n<10){
		return "0" + n;
	}else{
		return "" + n;
	}
}

//计算两个日期之间的差值
//这两个日期，只支持如下格式：
//	字符
//	年月日之间用.,/-
//	年月日和时分秒之间用" "
function dateDiffValue(oldTime,newTime){
	var oldDay = new Date();
	var d1 = oldTime.split(" ")[0]
	if(d1.indexOf(".") != -1){
		d1 = d1.split(".")
	}else if(d1.indexOf("-") != -1){
		d1 = d1.split("-")
	}else if(d1.indexOf("/") != -1){
		d1 = d1.split("/")
	}else if(d1.indexOf(",") != -1){
		d1 = d1.split(",")
	}
	var t1 = oldTime.split(" ")[1].split(":")
	oldDay.setFullYear(d1[0])
	oldDay.setMonth(d1[1]-1)
	oldDay.setDate(d1[2])
	oldDay.setHours(t1[0])
	oldDay.setMinutes(t1[1])
	oldDay.setSeconds(t1[2])
	
	
	if(!newTime){
		var newDay = new Date();
	}else{
		var newDay = new Date();
		
		var d2 = newTime.split(" ")[0]
		if(d2.indexOf(".") != -1){
			d2 = d2.split(".")
		}else if(d2.indexOf("-") != -1){
			d2 = d2.split("-")
		}else if(d2.indexOf("/") != -1){
			d2 = d2.split("/")
		}else if(d2.indexOf(",") != -1){
			d2 = d2.split(",")
		}
		var t2 = newTime.split(" ")[1].split(":")
		newDay.setFullYear(d2[0])
		newDay.setMonth(d2[1]-1)
		newDay.setDate(d2[2])
		newDay.setHours(t2[0])
		newDay.setMinutes(t2[1])
		newDay.setSeconds(t2[2])
		
	}
	
	var num = Math.abs(newDay-oldDay);
	
	var day = parseInt(num/1000/60/60/24)
	var hours = parseInt(num/1000/60/60)%24
	var minu = parseInt(num/1000/60)%60
	
	return {
		day:day,
		hours:hours,
		minutes:minu
	}
}

//获取样式
function getStyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr]
	}else{
		return getComputedStyle(ele,false)[attr];
	}
}


//取消事件冒泡
function stopBubble(e){
	if(e.stopPropagation){
		e.stopPropagation()
	}else{
		e.cancelBubble = true
	}
}

//阻止默认事件
function stopDefault(e){
	if(e.preventDefault){
		e.preventDefault()
	}else{
		e.returnValue = false
	}
}

//事件委托
function eveEnt(child,callback){
	return function(eve){
		var e = eve || window.event;
		var target = e.target || e.srcElement;
		
		for(var i=0;i<child.length;i++){
			if(child[i] === target){
				callback.bind(target)()
			}
		}
	}
}

//事件监听：
 function addEvent(ele,myevent,fn){
 	if(ele.addEventListener){
 		ele.addEventListener(myevent,fn)
 	}else if(ele.attachevent){
 		ele.attachEvent("on"+myevent,fn)
 	}else{
 		ele.myevent=fn
 	}
 }


function removeEvent(ele,myevent,fn){
 	if(ele.removeEventListener){
 		ele.removeEventListener(myevent,fn)
 	}else if(ele.attachevent){
 		ele.detachEvent("on"+myevent,fn)
 	}else{
 		ele.myevent=null;
 	}
 }