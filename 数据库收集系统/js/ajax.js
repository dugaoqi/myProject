// JavaScript Document

"use strict";

function conAjax([way,url],obj){
	var p = new Promise(function(sucess){
		var ajax = new XMLHttpRequest();

		var data = "";
		if(obj){
			for(var key in obj){
				data += key + "=" + obj[key] + "&";
			};
			data = data.slice(0,data.length - 1);
			if(/^get$/i.test(way)){
				url += "?" + data;
				data = "";
			};
		};
		
		ajax.open(way,url,true);

		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				sucess(ajax.responseText);
			};
		};

		if(!/^get$/i.test(way)){
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		};
		ajax.send(data);
	});
	
	return p;	
};