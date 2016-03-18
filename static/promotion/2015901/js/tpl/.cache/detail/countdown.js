/*TMODJS:{"version":1,"md5":"16de2a45ce4873147c3195b424407de1"}*/
template('detail/countdown',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,hours=$data.hours,minutes=$data.minutes,seconds=$data.seconds,$out='';$out+='<span class="hour"> ';
$out+=$escape(hours);
$out+=' </span>时<span class="minutes"> ';
$out+=$escape(minutes);
$out+=' </span>分<span class="seconds"> ';
$out+=$escape(seconds);
$out+=' </span>秒';
return new String($out);
});