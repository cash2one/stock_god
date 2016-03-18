/*TMODJS:{"version":10,"md5":"cb65cd65298008cec5e31912d16c88b7"}*/
template('detail/endpop',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,isWinner=$data.isWinner,$escape=$utils.$escape,userName=$data.userName,rcmdYield=$data.rcmdYield,rmb=$data.rmb,betYield=$data.betYield,$out='';$out+='<div class="simple-wrap endpop" style="background: none"> <div class="';
if(isWinner){
$out+='win';
}else{
$out+='fail';
}
$out+=' endpop-head"></div> <div class="padding"> ';
if(isWinner){
$out+=' <h4 class="text-yellow text-size-24 text-center title">恭喜你成为股神</h4> ';
}else{
$out+=' <h4 class="text-white text-size-24 text-center title">惜败</h4> ';
}
$out+=' <div id="J_text" class="ui-box ui-col-9" style="float: none"> ';
if(isWinner === 0){
$out+=' <p class="text-size-12 ui-row hidden">本场股神: ';
$out+=$escape(userName);
$out+='</p> ';
}
$out+=' <p class="text-size-12 ui-row hidden"> <span class="float-left">荐股收益</span> <span class="float-right align-niubi"><i class="icon-niubi"></i> ';
if(rcmdYield > 0){
$out+=' +';
$out+=$escape(rcmdYield);
$out+='牛币 ';
}else{
$out+=' ';
$out+=$escape(rcmdYield);
$out+='牛币 ';
}
$out+=' </span> </p> ';
if(isWinner){
$out+=' <p class="text-size-12 text-red msg hidden">(兑换微信红包';
$out+=$escape(rmb);
$out+='元)</p> ';
}
$out+=' <p class="text-size-12 ui-row hidden"><span class="float-left">买码收益</span><span class="float-right"><i class="icon-niubi"></i> ';
if(betYield> 0){
$out+=' +';
$out+=$escape(betYield);
$out+='牛币 ';
}else{
$out+=' ';
$out+=$escape(betYield);
$out+='牛币 ';
}
$out+='</span></p> </div> <a href="javascript:void(0);" class="btn width-xl-12 handlebtn"> ';
if(isWinner){
$out+=' 签收并嘚瑟一下 ';
}else{
$out+=' 不服，再来一局 ';
}
$out+=' </a> </div> </div> ';
return new String($out);
});