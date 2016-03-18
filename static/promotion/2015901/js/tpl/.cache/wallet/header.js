/*TMODJS:{"version":7,"md5":"4a2873a7781c8311efd6bae14c0d045a"}*/
template('wallet/header',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,balAmount=$data.balAmount,totalBonus=$data.totalBonus,$out='';$out+='<header class="w-header"> <div class="w-title"> <h1>我的牛币</h1> </div> <div class="w-niubi">';
$out+=$escape(balAmount);
$out+='</div> <div class="w-cash">累计获得红包<span class="text-orange">';
$out+=$escape(totalBonus);
$out+='</span>元</div> <div class="w-btn-box"> <a class="btn" href="./deposit.html">充值牛币</a> </div> <a class="w-journal-link" href="./journal.html">交易明细</a> </header> ';
return new String($out);
});