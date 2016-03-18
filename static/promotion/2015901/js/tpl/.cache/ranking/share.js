/*TMODJS:{"version":6,"md5":"e79a6bbbace6c3a75d66778a965afbe4"}*/
template('ranking/share',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,first=$data.first,$escape=$utils.$escape,rank=$data.rank,total=$data.total,username=$data.username,rcmd=$data.rcmd,title=$data.title,$out='';if(first){
$out+=' 我在玩【股神来了】群友推荐比赛。排名第';
$out+=$escape(rank);
$out+=',累计收益';
$out+=$escape(total);
$out+='。不服来战 ';
}else{
$out+=' ';
$out+=$escape(username);
$out+=' 推荐胜率';
$out+=$escape(rcmd);
$out+=',属于 ';
$out+=$escape(title);
$out+=' ';
}
$out+=' ';
return new String($out);
});