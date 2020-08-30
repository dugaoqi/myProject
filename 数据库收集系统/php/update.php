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
    
    $id = @$_REQUEST["id"];
    $content = @$_REQUEST["content"];
    // $content = "123";
    $why = @$_REQUEST["why"];
    // $why = "456";
    $idea = @$_REQUEST["idea"];
    // $idea = "789";

    $str = "UPDATE mis SET content='".$content."',why='".$why."',idea='".$idea."' WHERE id=".$id.";";

    $sert = @mysql_query($str);
    if($sert){
        echo 2;
    }else{
        echo mysql_error();
    };

    $clo = @mysql_close($link);
    if(!$clo){
        echo mysql_error();
    };

?>