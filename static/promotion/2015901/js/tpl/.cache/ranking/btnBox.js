/*TMODJS:{"version":6,"md5":"317fc3b564f9c82af541af78b47ab01e"}*/
template('ranking/btnBox',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,id=$data.id,$out='';if(id){
$out+=' <div class="r-footer-btn-box"> <a href="../../../gs_api/oauth2API?redirectType=entry_type" class="btn percent-100">我要发起比赛</a> </div> ';
}else{
$out+=' <div class="r-footer-btn-box"> <a href="javascript:void(0);" class="btn percent-100" id="shareBtn">嘚瑟一下</a> </div> ';
}
$out+=' ';
return new String($out);
});