require.config({
	baseUrl:"model1/index",
	
	paths:{
		"t1":"test1.1.0",
		"t2":"test2",
	}
})


require(["jquery","t1","t2"],function(_,t1,t2){
	t1.init()
	
	t2.show()
})
