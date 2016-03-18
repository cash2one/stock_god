/*TMODJS:{"version":6,"md5":"82d4374433762928e5210219897a16f9"}*/
template('home/header',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,userIcon=$data.userIcon,userName=$data.userName,gameNum=$data.gameNum,preferIndu=$data.preferIndu,preferExchange=$data.preferExchange,preferStk=$data.preferStk,$each=$utils.$each,item=$data.item,$index=$data.$index,$out='';$out+='<header class="h-header"> <div class="gravatar"> <img src="';
$out+=$escape(userIcon);
$out+='"> </div> <div class="info no-gamenum"> <h3>';
$out+=$escape(userName);
$out+='</h3> <p>参加了<em class="text-orange"> ';
$out+=$escape(gameNum);
$out+=' </em>场比赛</p> ';
if(preferIndu || preferExchange ){
$out+=' <div class="like-cate">投资偏好 <span class="text-yellow">';
$out+=$escape(preferIndu);
$out+='</span> <span class="text-blue">';
$out+=$escape(preferExchange);
$out+='</span> </div> ';
}
$out+=' ';
if(preferStk ){
$out+=' <div class="like-stk"> ';
$each(preferStk,function(item,$index){
$out+=' <span>';
$out+=$escape(item);
$out+='</span> ';
});
$out+=' </div> ';
}
$out+=' </div> </header> ';
return new String($out);
});