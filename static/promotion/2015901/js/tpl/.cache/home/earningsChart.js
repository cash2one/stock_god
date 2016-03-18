/*TMODJS:{"version":18,"md5":"c60a20387fa69b2f2ccf3c27b117bcff"}*/
template('home/earningsChart',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,cYield=$data.cYield,title=$data.title,cFriendPro=$data.cFriendPro,$out='';$out+='<div class="chart-board"> <div class="content"></div> <div class="rote"></div> <span class="t1">-100%</span> <span class="t2">牢底坐穿</span> <span class="t3">-50%</span> <span class="t4">套牢</span> <span class="t5">0%</span> <span class="t6">基金经理</span> <span class="t7">200%</span> <span class="t8">带头大哥</span> <span class="t9">1000%</span> <div class="simple"> <div class="chart-hold chart-hold1"> <div class="chart-pie chart-pie1" id="chartPie1"></div> </div> <div class="chart-hold chart-hold2"> <div class="chart-pie chart-pie2" id="chartPie2">111111</div> </div> <div class="chart-bg"></div> <div class="chart-mark"></div> <div class="cursor-wrap"> <i class="cursor"></i> </div> </div> <div class="rote" id="rote"></div> </div> <div class="more1"> <div class="txt1">';
$out+=$escape($helpers. dataRound (cYield ));
$out+='%</div> <div class="txt2"><span class="text-yellow">';
$out+=$escape(title.split(' ')[0]);
$out+='</span><span class="text-white">&nbsp;';
$out+=$escape(title.split(' ')[1]);
$out+='</span><i class="icon-question-mark"></i></div> <div class="txt3">战胜了<span class="text-orange">';
$out+=$escape($helpers. dataRound (cFriendPro ));
$out+='%</span>的群友</div> </div> ';
return new String($out);
});