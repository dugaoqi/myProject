<?php

    header("Content-Type:text/html;charset=utf-8");

    $link = @mysql_connect("localhost:3306","root","12345");
    if(!$link){
        echo mysql_error();
    };
    
    $db = @mysql_select_db("test",$link);
    if(!$db){
        echo mysql_error();
    };
    
    $set = @mysql_query("set names utf8");
    if(!$set){
        echo mysql_error();
    };

    $str = "SELECT * FROM mis";

    $show = @mysql_query($str);
    if(!$show){
        echo mysql_error();
    };

    $json = "[";
    while($arr = @mysql_fetch_assoc($show)){
        $json = $json.json_encode($arr).",";
    };
    $json = substr($json,0,-1);
    $json = $json."]";
    
    echo $json;

    $clo = @mysql_close($link);
    if(!$clo){
        echo mysql_error();
    };

?>