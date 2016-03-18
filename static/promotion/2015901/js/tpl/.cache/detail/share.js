/*TMODJS:{"version":2,"md5":"7be0ae357f60a032b12e2671856bc6b9"}*/
template('detail/share',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,deffer=$data.deffer,$escape=$utils.$escape,differ=$data.differ,user=$data.user,game=$data.game,time=$data.time,$out='';if(deffer !=null){
$out+='【还差';
$out+=$escape(differ);
$out+='人】';
}
$out+=$escape(user);
$out+=' 发起了比赛: ';
$out+=$escape(game);
$out+=',等你来赛. 时间:';
$out+=$escape(time);
return new String($out);
});