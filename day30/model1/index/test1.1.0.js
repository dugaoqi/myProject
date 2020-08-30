define(function(){
	function Test1(){
		this.name = "test1"
	}
	Test1.prototype.init = function(){
		console.log(this.name)
		console.log($)
	}
	
	return new Test1()
})