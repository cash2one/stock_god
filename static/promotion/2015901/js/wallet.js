/*
 *我的钱包
 */

var walletHandler = {
  headerHtml: function(data) {
    return template('wallet/header', data)
  },

  taskListHtml: function(data) {
    return template('wallet/taskList', data)
  }
};

$(function() {
  var params = {};

  promotion.ajax(API.myWallet, params, function(data) {

    promotion.ajaxLoading("end");

    if (data.code === 0) {


      var obj = data.result;

      var htmls = walletHandler.headerHtml(obj) + walletHandler.taskListHtml(obj)

      $("#main").html(htmls).fadeIn(250)
      // 如果红包为零，领取红包不显示
      if(data.result.totalBonus === 0) {
        $('.w-packet').hide();
      }
    } else {
      dialog.warnPop(data.message);
    }
  }, promotion.ajaxFail);

});
