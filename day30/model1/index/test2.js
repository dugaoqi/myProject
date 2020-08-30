define(function(){
	function Test2(){
		this.name = "test2"
	}
	Test2.prototype.show = function(){
		console.log(this.name)
		console.log($)
	}
	
	return new Test2()
})