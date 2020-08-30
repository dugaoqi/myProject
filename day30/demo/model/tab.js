define(function(){
	
//	定义类
	class Tab{
		constructor(){}
//		在init接收main穿件来的参数
		init(options){
			this.li = options.ali;
			this.img = options.aimg;
			
			var that = this;
			this.li.click(function(){
				that.li.removeClass("active").eq($(this).index()).addClass("active");
				
				that.img.removeClass("active").eq($(this).index()).addClass("active")
			})
		}
	}
	
//	将当前面向对象的对象返回，供main调用
	return new Tab();
})