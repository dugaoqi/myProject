//配置路径(类似于给路径起名字)
require.config({
//	baseUrl:"model",
	paths:{
		"jq":"../libs/jquery",
		"t":"tab",
		"tt":"toast"
	}
})

//通过配置好的模块名,引入三个模块,回调函数接收每个模块的返回值,等待操作
require(["jq","t","tt"],function(_,tab,toast){
	
//	选择标签,传入tab
	var options = {
		ali:$(".box li"),
		aimg:$(".cont img")
	}
//	执行tab的启动方法
	tab.init(options)
//	执行toast的启动方法，将tab身上的一个属性，作为参数传进toast的init中
	toast.init(tab.img)
	
})
