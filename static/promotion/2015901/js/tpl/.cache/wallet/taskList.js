/*TMODJS:{"version":10,"md5":"99553c05592850238eb52fe2b6bcad4a"}*/
template('wallet/taskList',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,datas=$data.datas,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<section class="w-task-wrap"> <div class="task-thead"> 做任务 赚牛币 </div> <div class="task-tbody"> ';
$each(datas,function(item,$index){
$out+=' <a href="';
if(item.url !=null && item.url !='' ){
$out+=$escape(item.url);
}else{
$out+='javascritp:void(0);';
}
$out+='" class="task-tr clearfix icon-';
$out+=$escape(item.taskType);
$out+='"> <div class="left"> <h2>';
$out+=$escape(item.name);
$out+='</h2> <span>';
$out+=$escape(item.taskDesc);
$out+='</span> </div> <div class="right"> <span class="btn">+';
$out+=$escape(item.amount);
$out+='牛币</span> </div> </a> ';
});
$out+=' </div> </section> ';
return new String($out);
});