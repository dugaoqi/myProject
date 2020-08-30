//不同元素多属性的链式运动
//					利用回调函数
function move(ele,json,callback){
	clearInterval(ele.timer);
	ele.timer = setInterval(()=>{
//		开启计时器,声明开关,状态为开启
		var onOff = true;
		for(var attr in json){
			if(attr == "opacity"){
				var iNow = getStyle(ele,attr) * 100;
			}else{
				var iNow = parseInt(getStyle(ele,attr));
			}
			var speed = (json[attr] - iNow)/6;
			speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);
//			只要有一个属性没到终点,开关关闭
			if(json[attr] != iNow) onOff=false;
			
			if(attr == "opacity"){
				iNow += speed;
				ele.style[attr] = iNow/100;
				ele.style.filter = `alpha(opacity=${iNow})`;
			}else{
				ele.style[attr] = iNow + speed + "px";
			}
		}
//		开关没有被关闭,都到终点了
		if(onOff){
			clearInterval(ele.timer)
//			在到终点后,执行用户传递的回调函数
			if(callback) callback();
		}
	},30)
}

function getStyle(ele,attr){
	if(getComputedStyle){
		return getComputedStyle(ele,false)[attr];
	}else{
		return ele.currentStyle[attr];
	}
}