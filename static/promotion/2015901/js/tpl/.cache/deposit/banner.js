/*TMODJS:{"version":7,"md5":"f9480569d56190fff651dd521b6ea2d0"}*/
template('deposit/banner',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,result=$data.result,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<header class="de-advert" id="deAdvertWrap"> <div class="swiper-pagination" id="adCtrls">  </div> <div class="swiper-wrapper" id="adImages"> ';
$each(result,function(item,$index){
$out+=' <div class="swiper-slide"> <a href="';
$out+=$escape(item.adUrl);
$out+='" data-id="';
$out+=$escape(item.adId);
$out+='" style="background-image:url(';
$out+=$escape(item.adImg);
$out+=')"></a> </div> ';
});
$out+=' </div> <a href="javascript:;" class="swiper-button-next" id="btn_prev"></a> <a href="javascript:;" class="swiper-button-prev" id="btn_next"></a>  </header> ';
return new String($out);
});