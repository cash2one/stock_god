/*TMODJS:{"version":7,"md5":"f1d78e15b985fc96b8f76117638ec553"}*/
template('deposit/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,balAmount=$data.balAmount,$each=$utils.$each,datas=$data.datas,item=$data.item,$index=$data.$index,$out='';$out+='<div class="de-header">我的牛币<span class="text-orange">';
$out+=$escape(balAmount);
$out+='</span></div>  <div class="de-container"> ';
$each(datas,function(item,$index){
$out+=' <a href="javascript:void(0);" class="de-goods" data-id="';
$out+=$escape(item.priceId);
$out+='"> <div class="goods-name">';
$out+=$escape(item.amount);
$out+='<span>牛币</span></div> <div class="goods-price">';
$out+=$escape(item.price);
$out+='元</div> </a> ';
});
$out+=' </div> ';
return new String($out);
});