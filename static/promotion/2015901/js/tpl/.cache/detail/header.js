/*TMODJS:{"version":6,"md5":"b9ddda25e890ab93db79a05561ca871b"}*/
template('detail/header',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,gameName=$data.gameName,userName=$data.userName,$out='';$out+='<div class="d-header"> <h1><em></em>';
$out+=$escape(gameName);
$out+='</h1> <div class="d-creator"><i class="icon-user"></i>发起人:<span>';
$out+=$escape(userName);
$out+='</span></div> <a href="javascript:void(0);" id="course">比赛规则</a> </div>';
return new String($out);
});