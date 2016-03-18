/*TMODJS:{"version":6,"md5":"d478030fcb96787e6396a6e9266e9427"}*/
template('detail/progress',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,width=$data.width,num=$data.num,limitNum=$data.limitNum,$out='';$out+='<div class="d-progress"> <ul class="clearfix"> <li>召集进度</li> <li> <div class="bar"><span style="width:';
$out+=$escape(width);
$out+='"></span> </div> </li> <li><span class="text-blue">';
$out+=$escape(num);
$out+='</span>/';
$out+=$escape(limitNum);
$out+='</li> </ul> </div>';
return new String($out);
});