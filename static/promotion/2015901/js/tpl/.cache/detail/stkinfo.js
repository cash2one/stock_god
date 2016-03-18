/*TMODJS:{"version":19,"md5":"5afff063b9fa0d1b90c1c53f0a3899ae"}*/
template('detail/stkinfo',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,obj=$data.obj,newPrice=$data.newPrice,dayclass=$data.dayclass,dayChange=$data.dayChange,price=$data.price,pctclass=$data.pctclass,pct=$data.pct,$out='';$out+='<div class="simple-wrap stk-info"> <div class="ui-row padding userBox"> <div class="ui-col-3"> <div class="gravatar"> <img src="';
$out+=$escape(obj.userIcon);
$out+='"> </div> </div> <div id="J_moreReason" class="ui-col-9"> <div class="name text-size-14 text-white">';
$out+=$escape(obj.userName);
$out+='</div> <div class="cause text-size-12">';
if(obj.reason){
$out+=$escape(obj.reason);
$out+=' <s class="arrow"></s> ';
}else{
$out+='TA什么都没有说';
}
$out+='</div> </div> </div> <ul class="clearfix"> <li> <dl> <dt class="text-size-16 text-white">';
$out+=$escape(obj.stkName);
$out+='</dt> <dd><span class="v-small-text">';
$out+=$escape(obj.stkCode);
$out+='</span></dd> </dl> </li> <li> <dl> <dt class="text-size-16">';
$out+=$escape(newPrice);
$out+='</dt> <dd><span class="';
$out+=$escape(dayclass);
$out+=' text-size-12">';
$out+=$escape(dayChange);
$out+='</span> </dd> </dl> </li> </ul> <ul class="clearfix"> <li> <dl> <dt class="text-size-12">成交价(元)</dt> <dd><span class="text-green text-size-14">';
$out+=$escape(price);
$out+='</span></dd> </dl> </li> <li> <dl> <dt class="text-size-12">盈亏</dt> <dd><span class="';
$out+=$escape(pctclass);
$out+=' text-size-14">';
$out+=$escape(pct);
$out+='</span> </dd> </dl> </li> </ul> <div class="ui-box text-center"> <i class="icon-niubi"></i>余额：<span class="text-yellow">';
$out+=$escape(obj.balAmount);
$out+='</span>牛币 &nbsp;已下注：<span class="text-yellow">';
$out+=$escape(obj.amount);
$out+='</span>牛币 </div> <div class="ui-box-p text-center"> <div class="quantity-form"> <a data-type="reduce" class="minus-btn handlebtn">-</a> <span class="handleinput">0</span> <a data-type="add" class="plus-btn handlebtn">+</a> </div> </div> <div class="padding text-center"> <a data-type="deposit" href="javascript:void(0);" class="btn blue handlebtn">充值牛币</a> <a data-type="bet" href="javascript:void(0);" class="btn handlebtn ';
if(obj.isCanBet == 0 || obj.gameStatus > 0){
$out+='disabled';
}
$out+='">下注押他赢</a> </div> </div> ';
return new String($out);
});