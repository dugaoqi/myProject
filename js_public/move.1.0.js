//不同元素单一不同属性的运动
function move(ele,attr,target){
	clearInterval(ele.timer);
	ele.timer = setInterval(()=>{
		if(attr == "opacity"){
			var iNow = getStyle(ele,attr) * 100;
		}else{
			var iNow = parseInt(getStyle(ele,attr));
		}
		var speed = (target - iNow)/10;
		speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);
		if(target == iNow){
			clearInterval(ele.timer);
		}else{
			if(attr == "opacity"){
				iNow += speed;
				ele.style[attr] = iNow/100;
				ele.style.filter = `alpha(opacity=${iNow})`;
			}else{
				ele.style[attr] = iNow + speed + "px";
			}
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