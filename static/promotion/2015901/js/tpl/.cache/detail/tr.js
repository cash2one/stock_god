/*TMODJS:{"version":24,"md5":"cb33b88288c0d2143ec45d6b250e6fe8"}*/
template('detail/tr',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,obj=$data.obj,stkName=$data.stkName,changePct=$data.changePct,stkColor=$data.stkColor,formatPercent=$data.formatPercent,userName=$data.userName,rcmdYield=$data.rcmdYield,$out='';$out+='<tr id="';
$out+=$escape(obj.gameStkId);
$out+='" data-name="';
$out+=$escape(obj.userName);
$out+='"> <td class="name"> <span class="stk-name"><span class="ellipsis">';
$out+=$escape(stkName);
$out+='</span>';
if(obj.hasReason){
$out+='<em></em>';
}
$out+='</span><span class="text-blue">';
$out+=$escape(obj.stkCode);
$out+='</span> </td> <td class="text-center"> <span class="inc text-center ';
if(changePct){
$out+='right';
}else{
$out+='center';
}
$out+=' ';
$out+=$escape(stkColor);
$out+=' ">';
$out+=$escape(formatPercent);
$out+=' </span> </td> <td class="name text-center"> <span class="stk-person text-center"><span class="ellipsis">';
$out+=$escape(userName);
$out+=' ';
if(obj.isBet){
$out+=' <i class="icon-yazhu"></i>';
}
$out+='</span> ';
if(obj.isPrize){
$out+='<i>获奖</i>';
}
$out+='</span> <span class="text-blue text-center">';
$out+=$escape(rcmdYield);
$out+='</span> </td> <td class="';
if(obj.isLike){
}else{
$out+='like-box';
}
$out+='"><i class="icon-niubi"></i><em> ';
$out+=$escape(obj.amount);
$out+='</em> </td> </tr> ';
return new String($out);
});