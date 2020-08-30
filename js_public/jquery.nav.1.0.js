;(function($){
	"use strict";

	$.fn.nav=function(){
		this.children("ul").children("li").hover(function(){
			$(this).siblings().children("ul").stop().slideUp(100).end().end().children("ul").stop().slideDown(100);
		},function(){
			$(this).children("ul").stop().slideUp(100);
		})
	}

})(jQuery);