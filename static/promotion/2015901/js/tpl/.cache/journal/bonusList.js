/*TMODJS:{"version":14,"md5":"c58b9ac943773ea807b675554b11ffd9"}*/
template('journal/bonusList',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,first=$data.first,$escape=$utils.$escape,totalBonus=$data.totalBonus,$each=$utils.$each,datas=$data.datas,item=$data.item,$index=$data.$index,$out='';if(first == 1 ){
$out+=' <div class="jo-thead"> 累计红包：<span>';
$out+=$escape(totalBonus);
$out+='元</span> </div> ';
}
$out+=' ';
$each(datas,function(item,$index){
$out+=' <div class="jo-tr clearfix"> <div class="left"> <h2>';
$out+=$escape(item.desc);
$out+=' ';
if(item.remark){
$out+=' <span>&nbsp;(比赛: ';
$out+=$escape(item.remark);
$out+=')</span> ';
}
$out+=' </h2> <span>';
$out+=$escape($helpers. dateFormat(item.time , 'yyyy-MM-dd hh:mm:ss' ));
$out+='</span> </div> <div class="right"> ';
if(item.amount > 0){
$out+=' <span>+';
$out+=$escape(item.amount);
$out+=' 元</span> ';
}else{
$out+=' <span>';
$out+=$escape(item.amount);
$out+=' 元</span> ';
}
$out+=' </div> </div> ';
});
$out+=' ';
return new String($out);
});