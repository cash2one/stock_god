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

    } else {
      dialog.warnPop(data.message);
    }
  }, promotion.ajaxFail);

});