/*TMODJS:{"version":11,"md5":"42af39c212eb67d2b15c5043e588c4c8"}*/
template('detail/status',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,s=$data.s,$string=$utils.$string,t=$data.t,$out='';if(s == 0 ){
$out+=' <dt >等待开赛：</dt> <dd class="countdown">';
$out+=$string(t);
$out+='</dd> ';
}else if(s == 1 ){
$out+=' <dt class="start">激战正酣：</dt> <dd class="countdown">';
$out+=$string(t);
$out+='</dd> ';
}else if(s == 2){
$out+=' <dt class="one-line">比赛结束</dt> ';
}else if(s == 3){
$out+=' <dt class="start one-line">发起失败</dt> ';
}
$out+=' ';
return new String($out);
});