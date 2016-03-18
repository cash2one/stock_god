/*TMODJS:{"version":11,"md5":"0ae6d00c5933ecbd2896e4933dca3e9b"}*/
template('ranking/tr',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,obj=$data.obj,$string=$utils.$string,title=$data.title,rcmd=$data.rcmd,total=$data.total,$out='';$out+='<tr> <td>';
$out+=$escape(obj.rank);
$out+='</td> <td> <dl class="list-content clearfix"> <dt class="gravatar"> <img src="';
$out+=$escape(obj.userIcon);
$out+='"> </dt> <dd class="r-name"> <h2>';
$out+=$escape(obj.userName);
$out+='</h2> <span>';
$out+=$string(title);
$out+='</span> </dd> </dl> </td> <td class="text-left "><span class="right text-blue bold">';
$out+=$escape(rcmd);
$out+='</span></td> <td><span class="right text-gray text-right bold pdr-4">';
$out+=$escape(total);
$out+='</span></td> </tr>';
return new String($out);
});