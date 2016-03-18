/*TMODJS:{"version":6,"md5":"becf8ec815cd7810126376a6377950b9"}*/
template('detail/btns',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,obj=$data.obj,$escape=$utils.$escape,gameId=$data.gameId,qnPageVersion=$data.qnPageVersion,$out='';if(obj.gameStatus === 0){
$out+=' ';
if(obj.isJoin === 0){
$out+=' ';
if(obj.num < obj.limitNum){
$out+=' <div class="d-btn-wrap"> <div class="d-btn-box"><a href="./join.html?type=add&gameId=';
$out+=$escape(gameId);
$out+='" class="btn breathe percent-100">我要推荐股票</a> </div> </div> ';
}else{
$out+=' <div class="d-btn-wrap"><div class="d-btn-box"><a href="./create.html?ver=';
$out+=$escape(qnPageVersion);
$out+='" class="btn breathe percent-100">我要发起比赛</a></div></div> ';
}
$out+=' ';
}else{
$out+=' ';
if(obj.subscribe === 0){
$out+=' <div class="d-btn-wrap"><div class="d-btn-box"><a href="javascript:void(0);" class="btn breathe percent-100" id="attentionBtn">了解实时赛况</a></div></div> ';
}else{
$out+=' <div class="d-btn-wrap "><div class="d-btn-box "><a href="javascript:void(0);" class="btn breathe percent-100" id="shareBtn">召集朋友来赛</a></div></div> ';
}
$out+=' ';
}
$out+=' ';
}else if(obj.gameStatus ===1 ){
$out+=' ';
if(obj.isJoin === 0){
$out+=' <div class="d-btn-wrap"><div class="d-btn-box"><a href="./create.html?ver=';
$out+=$escape(qnPageVersion);
$out+='" class="btn breathe percent-100">我要发起比赛</a></div></div> ';
}
$out+=' ';
}else if(obj.gameStatus === 2){
$out+=' ';
if(obj.isJoin === 1){
$out+=' <div class="d-btn-wrap"> <div class="d-btn-box"> <a href="./create.html?ver=';
$out+=$escape(qnPageVersion);
$out+='" class="btn blue fixed-140">再来一局</a>  </div> </div> ';
}
$out+=' ';
}
$out+=' ';
return new String($out);
});