/*
 *充值页面
 */

var depositHandler = {

  // 支付触发
  canPost: true,

  //请求广告
  advertRequest: function() {

    var params = {
      positionGroup : 1004,
      count : 5
    };

    promotion.ajax(API.adLinkList, params, function(data) {

      if (data.code === 0) {
        if (data.result) {
          var ads = data.result;

          $("#main").prepend(template('deposit/banner', data));

          if (ads.length > 1) {
            promotion.adAddSwiping("deAdvertWrap");
          }

          setTimeout(function() {
            $("#adCtrls").show();
          }, 500);
        }
      } else {
        console.log(data.message);
      }
    }, promotion.ajaxFail);
  },

  //商品列表
  goodListRequest: function() {

    var params = {};

    promotion.ajax(API.goodList, params, function(data) {

      promotion.ajaxLoading("end");

      if (data.code === 0) {
        var obj = data.result;

        $("#goodListWrap").html(depositHandler.goodListHtml(obj));

        $("#main").show();

        //请求广告
        depositHandler.advertRequest();
        depositHandler.depositStart();

        //微信分享

      } else {
        dialog.warnPop(data.message);
      }
    }, promotion.ajaxFail);
  },

  //列表html
  goodListHtml: function(obj) {
    return template('deposit/list', obj);
  },

  // 微信配置信息,
  options: {},

  // 微信配置初始化
  wechatInit: function() {
    if (!depositHandler.options.length) {
      var params = {
        url: window.location.href
      };
      promotion.ajax(API.fetchJssdk, params, function(data) {
        if (data.code == 0) {
          depositHandler.options = data.result;
          depositHandler.wechatConfig(depositHandler.options);
        } else {
          dialog.warnPop(data.message);
        }
      }, promotion.ajaxFail);
    }
  },

  wechatConfig: function(options) {
    wx.config({
      debug: false,
      appId: options.appId,
      timestamp: options.timestamp,
      nonceStr: options.noncestr,
      signature: options.signature,
      jsApiList: ['chooseWXPay']
    });
  },

  // 充值调用
  wechatPay: function(data) {
    wx.chooseWXPay({
      timestamp: data.result.timeStamp,
      nonceStr: data.result.noncestr,
      package: data.result.package,
      signType: data.result.signType,
      paySign: data.result.sign,
      success: function() {
        depositHandler.depositEnd();
        depositHandler.canPost = true;
      },
      cancel: function(res) {
        dialog.warnPop('用户取消了支付');
        depositHandler.canPost = true;
      },
      fail: function(res) {
        dialog.warnPop(res.errMsg);
        depositHandler.canPost = true;
      }
    });
  },

  //点击充值
  depositStart: function() {
    $(".de-goods").on("touchstart", function() {
      $(this).addClass("active");
    }).on("touchend", function() {
      $(this).removeClass("active");
    }).on("click", function() {
      if (depositHandler.canPost) {
        depositHandler.canPost = false;
      } else {
        return false;
      }
      var params = {
        priceId: $(this).data("id"),
        reqId : promotion.onlyNum()
      };
      depositHandler.wechatInit();
      promotion.ajax(API.payRequest, params, function(data) {
        //充值操作
        if (data.code === 0) {
          // 支付调用
          depositHandler.wechatPay(data);
        } else {
          dialog.warnPop(data.message);
        }
      }, promotion.ajaxFail);
    });
  },

  //充值完成回调
  depositEnd: function() {
    dialog.warnPop('支付成功!');
    depositHandler.goodListRequest();
  },

  //充值失败回调
  depositFail: function() {
    console.log('')
  }
};

$(document).ready(function() {
  depositHandler.goodListRequest();
  depositHandler.wechatInit();
});
