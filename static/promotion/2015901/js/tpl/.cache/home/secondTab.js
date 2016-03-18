/*TMODJS:{"version":6,"md5":"d71d6acd35efd8d8b931ff50443c33c1"}*/
template('home/secondTab',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,rPro=$data.rPro,rFriendPro=$data.rFriendPro,$out='';$out+='<div id="canvasBox" data-width="4" data-percent="100" data-fgcolor="#00fcff" data-bgcolor="#23262d" data-fill="#2b2f38"></div> <div class="more2"> <div class="txt1">推荐胜率</div> <div class="txt2">';
$out+=$escape($helpers. dataRound (rPro ));
$out+='%</div> <div class="txt3">战胜';
$out+=$escape($helpers. dataRound (rFriendPro ));
$out+='%股友</div> </div> ';
return new String($out);
});