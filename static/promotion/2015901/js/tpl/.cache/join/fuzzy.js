/*TMODJS:{"version":6,"md5":"037c6c1a58aab37ee075e8ab0bd7f225"}*/
template('join/fuzzy',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,status=$data.status,name=$data.name,state=$data.state,$out='';$out+='<li data-code="';
$out+=$escape(id);
$out+='" data-status=" ';
$out+=$escape(status);
$out+=' "> ';
$out+=$escape(name);
$out+='&nbsp;&nbsp;';
$out+=$escape(id);
$out+=' ';
if(state){
$out+=' <em>';
$out+=$escape(state);
$out+='</em> ';
}
$out+=' </li>';
return new String($out);
});