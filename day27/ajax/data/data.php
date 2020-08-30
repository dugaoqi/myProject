<?php
	
$data1 = '[{
	"goodsId":"12a234d",
	"src":"https://img12.360buyimg.com/n7/jfs/t5050/1/1165634167/293759/f54c5ed2/58ed8800N261978fb.jpg",
	"price":999.00,
	"name":"手机小米 红米Note4X 全网通版 3GB+32GB 樱花粉 移动联通电信4G手机"
},{
	"goodsId":"124ad",
	"src":"https://img11.360buyimg.com/n7/jfs/t2278/69/129833021/96430/df8863b1/55f0e861Nf585867f.jpg",
	"price":3599.00,
	"name":"手机Apple iPhone 6s Plus (A1699) 128G 银色 移动联通电信4G手机"
},{
	"goodsId":"12ad3",
	"src":"https://img10.360buyimg.com/n7/jfs/t3985/131/486256904/433682/1d9fc4d0/584fcc81N1a31a2c5.jpg",
	"price":3059.00,
	"name":"手机华为 Mate 9 Pro 6GB+128GB版 银钻灰 移动联通电信4G手机 双卡双待"
}]';

$data2 = '[{
	"goodsId":"12ad6",
	"src":"https://img10.360buyimg.com/n7/jfs/t10729/149/1744838942/273871/5b00d30c/59e5bd89Ndc046ccd.jpg",
	"price":1099.00,
	"name":"电脑荣耀 畅玩7X 4GB+32GB 全网通4G全面屏手机 标配版 幻夜黑"
},{
	"goodsId":"12ad87",
	"src":"https://img10.360buyimg.com/n7/jfs/t3985/131/486256904/433682/1d9fc4d0/584fcc81N1a31a2c5.jpg",
	"price":3059.00,
	"name":"电脑华为 Mate 9 Pro 6GB+128GB版 银钻灰 移动联通电信4G手机 双卡双待"
},{
	"goodsId":"12ad234",
	"src":"https://img10.360buyimg.com/n7/jfs/t10729/149/1744838942/273871/5b00d30c/59e5bd89Ndc046ccd.jpg",
	"price":1099.00,
	"name":"电脑荣耀 畅玩7X 4GB+32GB 全网通4G全面屏手机 标配版 幻夜黑"
}]';
	
	$type = $_REQUEST["type"];
	
	if($type == 1){
		echo $data1;
	}else{
		echo $data2;
	}
	
?>