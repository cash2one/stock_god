/*TMODJS:{"version":11,"md5":"d1f3419d0c08b29d1b19fe44aef24663"}*/
template('journal/redList',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,datas=$data.datas,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' ';
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
if(item.amount < 0){
$out+=' <span>';
$out+=$escape(item.amount);
$out+=' 牛币</span> ';
}else{
$out+=' <span>+';
$out+=$escape(item.amount);
$out+=' 牛币</span> ';
}
$out+=' </div> </div> ';
});
$out+=' ';
return new String($out);
});