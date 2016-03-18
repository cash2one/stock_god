/*TMODJS:{"version":6,"md5":"cffb41e88caf4a5345c7d536cff63866"}*/
template('detail/info',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,date=$data.date,$string=$utils.$string,status=$data.status,$out='';$out+='<div class="d-info"> <ul class="clearfix"> <li> <dl> <dt>比赛日期：</dt> <dd>';
$out+=$escape(date);
$out+='</dd> </dl> </li> <li> <dl> ';
$out+=$string( status);
$out+=' </dl> </li> </ul> </div> ';
return new String($out);
});