/*TMODJS:{"version":7,"md5":"beb736454514d2690ca650ce46ec38a6"}*/
template('ranking/banner',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,datas=$data.datas,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<header class="de-advert" id="deAdvertWrap"> <div class="swiper-pagination" id="adCtrls">  </div> <div class="swiper-wrapper" id="adImages"> ';
$each(datas,function(item,$index){
$out+=' <div class="swiper-slide"> <a href="';
$out+=$escape(item.adUrl);
$out+='" style="background-image:url(';
$out+=$escape(item.adImg);
$out+=')"></a> </div> ';
});
$out+=' </div> <a href="javascript:;" class="swiper-button-next" id="btn_prev"></a> <a href="javascript:;" class="swiper-button-prev" id="btn_next"></a>  </header> ';
return new String($out);
});