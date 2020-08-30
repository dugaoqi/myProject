// JavaScript Document

"use strict";

var oTbody = document.querySelector("tbody");
var addBtn = document.getElementById("add");

var subBtn = document.getElementById("sub");
var content = document.getElementById("recipient-name");
var why = document.getElementById("message-text");
var idea = document.getElementById("idea-text");

var a = 1;
var id = 0;
var pageNow = 0;
var maxNum = 5;

loadPage(maxNum);

addBtn.onclick = function(){
    content.value = "";
    why.value = "";
    idea.value = "";
    a = 1;
};

subBtn.onclick = function(){
    if(a){
        var url = "php/insert.php"
    }else{
        var url = "php/update.php"
    };
    conAjax(["POST",url],{
        id:id,
        content:content.value,
        why:why.value,
        idea:idea.value
    }).then(function(res){
        if(res === "1"){
            alert("插入成功");
        }else if(res === "2"){
            alert("更新成功");
        }else{
            alert("操作失败");
        };
        loadPage(maxNum);
    });
};

oTbody.onclick = function(eve){
    var e = eve || window.event;
    var tar = e.target || e.srcElement;
    if(/del/.test(tar.className)){
        // console.log(tar);
        conAjax(["post","php/del.php"],{
            id:tar.parentNode.parentNode.children[0].innerHTML
        }).then(function(res){
            if(res === "1"){
                alert("删除成功");
            }else{
                alert("操作失败");
            };
            loadPage(maxNum);
        });
    };

    if(/update/.test(tar.className)){
        a = 0;
        id =  tar.parentNode.parentNode.children[0].innerHTML;
        content.value = tar.parentNode.parentNode.children[1].innerHTML;
        why.value = tar.parentNode.parentNode.children[2].innerHTML;
        idea.value = tar.parentNode.parentNode.children[3].innerHTML;
    };
};

function loadPage(maxNum){
    conAjax(["post","php/show.php"]).then(function(res){
        var msg = JSON.parse(res);
        // console.log(msg);
        var page = Math.ceil(msg.length / maxNum);
        // console.log(page);
        var oUl = document.querySelector("ul.pagination");
        // console.log(oUl);
        var str = '<li class="page-item"><span class="page-link" id="previous">上一页</span></li>';
        if(pageNow > page - 1){
            pageNow = page - 1;
        };
        for(var i = 0; i < page; i++){
            if(i == pageNow){
                str += `<li class="page-item active"><span/span class="page-link">${i + 1}</span></li>`;
            }else{
                str += `<li class="page-item"><span/span class="page-link">${i + 1}</span></li>`;
            };
        };
        str += '<li class="page-item"><span class="page-link" id="next">下一页</span></li>';
        oUl.innerHTML = str;

        oUl.onclick = function(eve){
            var e = eve || window.event;
            var tar = e.target || e.srcElement;
            // console.log(pageNow);
            if(tar.id == "previous" && pageNow != 0){
                pageNow --;
                // console.log(pageNow);
            }else if(tar.id == "next" && pageNow != page - 1){
                pageNow ++;
                // console.log(pageNow);
            }else{
                if(parseInt(tar.innerHTML)){
                    pageNow = parseInt(tar.innerHTML) - 1;
                };
            };
            // console.log(pageNow);
            var str = '<li class="page-item"><span class="page-link" id="previous">上一页</span></li>';
            for(var i = 0; i < page; i++){
                if(i == pageNow){
                    str += `<li class="page-item active"><span/span class="page-link">${i + 1}</span></li>`;
                }else{
                    str += `<li class="page-item"><span/span class="page-link">${i + 1}</span></li>`;
                };
            };
            str += '<li class="page-item"><span class="page-link" id="next">下一页</span></li>';
            oUl.innerHTML = str;
            load(pageNow,maxNum,msg);
        };
        load(pageNow,maxNum,msg);
    });
};

function load(pageNow,maxNum,msg){
    var str = "";
    var start = pageNow * maxNum;
    var end = (pageNow + 1) * maxNum;
    for(var i = start; i < end; i++){
        if(msg[i]){
            str += `<tr>
                        <td>${msg[i].id}</td>
                        <td>${msg[i].content}</td>
                        <td>${msg[i].why}</td>
                        <td>${msg[i].idea}</td>
                        <td class="text-center"><span class="btn btn-secondary del">删除</span></td>
                        <td class="text-center"><button type="button" class="btn btn-primary update" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">修改</button></td>
                    </tr>`;
        }else{
            break;
        };
    };
    oTbody.innerHTML = str;
};