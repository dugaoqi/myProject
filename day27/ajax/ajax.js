function ajaxGet(url,callback,data){
	if(data){
		var str = "";
		for(var i in data){
			str = str + i+"="+data[i]+"&";
		}
		str = str.slice(0,str.length-1)
		url = url + "?" + str;
	}
	
	if(XMLHttpRequest){
		var ajax = new XMLHttpRequest()
	}else{
		var ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	ajax.open("GET",url,true)
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			callback(ajax.responseText)
		}
	}
	ajax.send(null);
}

