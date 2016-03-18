/*TMODJS:{"version":7,"md5":"bec77f3e19195776da366a0df6c98fbb"}*/
template('home/chartBox',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<section class="h-section"> <ul class="h-tabs clearfix"> <li class="active" id="hTabs1">累计收益率</li> <li id="hTabs2">推荐胜率</li> </ul> <div class="h-chart"> <div class="chart-box active chart-1" id="chartBox1"> ';
include('./earningsChart');
$out+=' </div> <div class="chart-box chart-2" id="chartBox2"></div> </div> <div class="h-btn-box center"> ';
include('./btns');
$out+='</div> <div class="h-marking"> <div class="pic"> <img src="/static/promotion/2015901/images/pic_marking_home.png" alt=""> </div> <div class="marking"></div> </div> </section> ';
return new String($out);
});