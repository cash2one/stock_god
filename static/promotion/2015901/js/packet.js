/**
 * 领取红包
 * Created by ayou on 2016-03-18.
 */


$(function() {
  var _html = '';
  promotion.ajaxLoading("end");
  // 得到红包金额
  promotion.ajax(API.myWallet, {}, function(data) {
    if (data.code === 0) {
      var yuan = data.result.totalBonus;
      var status;
      // 判断是否绑定了微信
      promotion.ajax(API.isBind, {}, function(data) {
        if(data.code === 0) {
          status = data.result.cashStatus;
          if(status === 0) {
            _html = template('packet/page',{'isBind':false,'yuan':yuan});
          } else {
            _html = template('packet/page', {'isBind':true,'yuan':yuan});
          }
          $('.p-container').html(_html);
        } else {
          _html = template('packet/page',{'isBind':true,'yuan':yuan});
          $('.p-container').html(_html);
          console.log(data.message);
        }
        // 绑定下载一起牛跳转
        $('.p-btn').attr('href','http://a.app.qq.com/o/simple.jsp?pkgname=com.yiqiniu.android.yiqiniu');
      },promotion.ajaxFail);
    } else {
      dialog.warnPop(data.message);
    }
  }, promotion.ajaxFail);
});