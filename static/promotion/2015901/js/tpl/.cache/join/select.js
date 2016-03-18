/*TMODJS:{"version":1,"md5":"47f6c306dc1e241ce4b212c031756000"}*/
template('join/select',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,select_value=$data.select_value,$escape=$utils.$escape,$out='';$each(list,function($value,$index){
$out+=' <option ';
if(select_value == $index*2 ){
$out+=' selected ';
}
$out+=' value="';
$out+=$escape($index*2);
$out+='">';
$out+=$escape($index*2);
$out+='牛币</option> ';
});
return new String($out);
});