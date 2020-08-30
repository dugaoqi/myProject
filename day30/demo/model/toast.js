define(function(){
	
	class Toast{
		constructor(){}
		init(img){
			this.img = img;
			
			this.img.click(function(){
				var div = $("<div>");
				div.html("<img src='"+ this.src +"'>")
				div.css({
					width:"100px",
					height:"100px",
					position:"absolute",
					left:"100px",
					top:"100px"
				})
				div.children("img").css({
					width:"100px",
					height:"100px",
				})
				$(this).parent().parent().append(div)
			})
		}
	}
	
	return new Toast();
})