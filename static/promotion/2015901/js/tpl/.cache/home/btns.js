/*TMODJS:{"version":7,"md5":"8bab34a195f41a67cf9797fb96c2c410"}*/
template('home/btns',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,gameNum=$data.gameNum,$out='';$out+=' ';
if(gameNum){
$out+=' <a href="./ranking.html" class="btn blue fixed-140">查看排行</a> <a href="javascript:void(0);" class="btn fixed-140" id="shareBtn">嘚瑟一下</a> ';
}else{
$out+=' <a href="./create.html" class="btn fixed-230">我要发起比赛</a> ';
}
$out+=' ';
return new String($out);
});