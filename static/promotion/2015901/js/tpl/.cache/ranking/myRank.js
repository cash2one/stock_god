/*TMODJS:{"version":6,"md5":"cb0c58b8f18a6bcb21b623ea0a5532b7"}*/
template('ranking/myRank',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,myrank=$data.myrank,icon=$data.icon,username=$data.username,$string=$utils.$string,title=$data.title,rcmdYield=$data.rcmdYield,totalYield=$data.totalYield,$out='';$out+=' <div class="r-own">  <div class="own-header"> <h2>我的排名：第<span class="text-orange">';
$out+=$escape(myrank);
$out+='</span>名</h2> </div>  <dl class="own-content clearfix"> <dt class="gravatar"> <img src="';
$out+=$escape(icon);
$out+='"> </dt> <dd class="r-name"> <h2>';
$out+=$escape(username);
$out+='</h2> <span>';
$out+=$string(title);
$out+='</span> </dd> <dd class="r-yield"> <h2>推荐胜率</h2> <span>';
$out+=$escape(rcmdYield);
$out+='</span> </dd> <dd class="r-yield r-gain"> <h2>累计收益</h2> <span>';
$out+=$escape(totalYield);
$out+='</span> </dd> </dl> </div> ';
return new String($out);
});