;(function($){
	"use strict";
	
//	extend全局
//	$.extend({
//		myname:"nav插件",
//		nav:function(ele){
//			console.log(ele)
//			console.log(this.myname + "被执行了")
//		}
//	})

//	自定义属性全局
//	$.nav = function(ele){
//		console.log(ele)
//		console.log("nav" + "被执行了")
//	}
	
//	extend局部
//	$.fn.extend({
//		nav:function(){
//			var name = "admin"
//			console.log(this)
//			console.log(name + "被执行了")
//		}
//	})

//	自定义属性局部
//	$.fn.nav = function(){
//		console.log(this)
//		console.log("nav" + "被执行了")
//	}
	
	$.fn.nav = function(){
		this.children("ul").children("li").hover(function(){
			
			$(this)				//鼠标经过谁就是谁
			.siblings()			//除了鼠标经过的这个，其他的所有兄弟
			.children("ul")		//兄弟的子元素ul
			.stop().slideUp(200)
			.end()				//除了鼠标经过的这个，其他的所有兄弟
			.end()				//鼠标经过谁就是谁
			.children("ul")		//鼠标经过谁就是谁    的    ul
			.stop().slideDown(200);
			
		},function(){
			
			$(this).children("ul").stop().slideUp(200)
			
		})
	}
})(jQuery);
