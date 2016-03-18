/*

 * 名称：运营活动公用css(非模块化方式)；
 * 依赖：依赖jQuery；
 * 说明：为了便于管理，如有功能更新，请在功能描述处注明；
 * 功能描述：
 * 1、rem页面适配（自执行）；
 * 2、百度统计代码（自执行）；
 *
 */

/*公用对象*/
var qnPageVersion = "20151022";
var GET = "GET";

var promotion = {
  //时间戳, 用于防止html页面缓存
  timeStamp: new Date().getTime(),

  //初始化页面fontsize
  fontSize: function () {
    var page = this;
    var html = document.getElementsByTagName("html")[0];
    page.width = 320;
    page.fontSize = 100;
    page.widthProportion = function () {
      var p = (html.offsetWidth) / page.width;
      return p > 2 ? 2 : p < 1 ? 1 : p;
    };
    page.changePage = function () {
      html.setAttribute("style", "font-size:" + page.widthProportion() * page.fontSize + "px !important");
    };
    page.changePage();
    window.addEventListener("resize", function () {
      page.changePage();
    }, false);
    window.addEventListener("orientationchange", function () {
      page.changePage();
    }, false);
  },

  //百度统计
  baidu: function () {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "//hm.baidu.com/hm.js?c645c07cf23951ce84f60a562a36db9e";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },

  //判断浏览器类型
  browserRedirect: function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return true;
    } else {
      return false;
    }
  },

  //AJAX对象请求
  ajax: function (url, data, callback, error) {

    $.ajax({
      type: "POST",
      cache: false,
      url: url,
      data: JSON.stringify(data),
      //data: JSON.stringify($.extend({sessionUserId : 5},data)),
      dataType: "json",
      contentType: "application/json",
      success: callback,
      error: function () {
        promotion.ajaxLoading("end");
        if (error) {
          error();
        } else {
          console.log("请求失败");
        }
      }
    });
  },

  // 时间戳格式化日期
  // type:转换类型
  // timestamps：时间戳
  formatDate: function (type, timestamps) {
    var date = new Date(timestamps);

    function dataToStr(n) {
      return n < 10 ? '0' + n : n;
    }

    if (type === "S") {
      date = date.getFullYear() + '/' + dataToStr(date.getMonth() + 1) + '/' + dataToStr(date.getDate());
    } else if (type === "M") {
      date = (date.getMonth() + 1) + '月' + date.getDate() + '日';
    } else {
      date = date.getFullYear() + '.' + dataToStr(date.getMonth() + 1) + '.' + dataToStr(date.getDate());
    }

    return date;
  },

  //判断时间,参数格式2015-09-09 23:59:59
  checkDate: function (str) {

    var month = parseInt(str.substr(5, 2));
    var day = parseInt(str.substr(8, 2));

    return month + "月" + day + "日";
  },

  //判断开始时间与结束时间
  competitionDate: function (start, end) {

    if (start === end) {
      return start;
    } else {
      return start + "-" + end;
    }
  },

  //距离比赛时间
  transToHour: function (s, type) {

    var dMol = 24 * 60 * 60 * 1000;
    var hMol = 60 * 60 * 1000;
    var mMol = 60 * 1000;

    if (parseInt(s / hMol) > 0) {

      return parseInt(s / hMol) + "小时";

    } else if (parseInt(s / mMol) > 0) {

      return parseInt(s / mMol) + "分钟";

    } else {

      return (type === "start") ? "即将开始" : "即将结束";

    }
  },

  //除法计算，参数传分子，分母
  formatDivision: function (m, d) {
    if (!d) {
      return 0;
    } else {
      return (m / d).toFixed(4);
    }
  },

  //计算百分比，参数传小树值，位数
  formatPercent: function (dec, bit, mark) {
    if (typeof bit === "number" && typeof dec === "number") {
      if (dec > 0) {
        return (mark ? "+" : '') + (dec * 100).toFixed(bit) + "%";
      } else {
        return (mark ? "" : '') + (dec * 100).toFixed(bit) + "%";
      }
    } else {
      return "--";
    }
  },

  //股票颜色区分,参数传小数值
  stkColor: function (n) {
    if (typeof n === "number") {
      if (n > 0) {
        return "text-red";
      } else if (n < 0) {
        return "text-green";
      } else {
        return "";
      }
    } else {
      return "";
    }
  },

  //判断是否有值
  isHave: function (t) {

    return t ? t : "-";
  },

  //回到顶部
  gotoTop: function () {
    //回到顶部
    if ($(".goto-top").length > 0) {
      var myEvent = {
        click: ('ontouchstart' in window) ? 'touchstart' : 'click'
      };
      var doms = function () {
        var _dd = document.documentElement;
        var _db = document.body;
        var _dom = _dd || _db;
        return {
          width: Math.max(_dom.clientWidth, _dom.scrollWidth), // 页面宽度
          height: Math.max(_dom.clientHeight, _dom.scrollHeight), // 页面长度
          left: Math.max(_dd.scrollLeft, _db.scrollLeft), // 被滚动条卷去的文档宽度
          top: Math.max(_dd.scrollTop, _db.scrollTop), // 被滚动条卷去的文档高度
          viewHeight: _dom.clientHeight,
          viewWidth: _dom.clientWidth
        };
      };
      $(document).on(myEvent.click, ".goto-top", function () {
        $("html,body").animate({
          scrollTop: 0
        }, 100);
      });

      $(window).scroll(function () {
        var $gotoTop = $(".goto-top");
        if (doms().top > 200) {
          $gotoTop.fadeIn();
        } else {
          $gotoTop.fadeOut();
        }
      });
    }
  },

  //页面ajax加载动画
  ajaxLoading: function (status) {
    if (status && status === "start") {
      var loadingHtml = '<div class="ajax-loading">' + '<div class="circle-a"></div>' + '<div class="circle-b"></div>' + '</div>';
      $("html").append(loadingHtml);
    } else {

      $(".ajax-loading").remove();
    }
  },

  //页面加载失败
  ajaxFail: function () {

    var html = '<div class="ajax-fail">' + '<span>数据加载失败，点击重试</span>' + '</div>';

    $("html").append(html);

    $(document).on("click", ".ajax-fail", function (e) {

      e.preventDefault();
      e.stopPropagation();

      window.location.reload();

    });
  },

  //获取url中的参数
  getUrlParam: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
      r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]);
    return null;
  },

  //生成唯一数
  onlyNum: function () {
    var num = '',
      timestamp = '',
      randomNum = '';

    timestamp = (new Date()).valueOf();

    for (var r = 0; r < 6; r++) {
      randomNum += Math.floor(Math.random() * 10);
    }

    num = timestamp + randomNum;

    return num;
  },

  //用户头像
  userIcon: function (url) {
    return url ? url : "../../../static/common/images/pic_user.png";
  },

  //分享提示
  wxShareNotice: function () {

    $(".dialog").remove();

    var html = '<div class="dialog">' + '<div class="top-wrap wx-share">' + '<div class="text">点右上角，分享召集股神！</div>' + '<div class="arrows"><img src="/static/promotion/2015901/images/icon_share_arrows.png"/></div>' + '</div>' + '</div>';

    $('html').addClass("pop-up-lock");
    $('body').append(html);
    $(".dialog").fadeIn();

    $(".dialog").on("click", function () {
      $(this).remove();
      $('html').removeClass("pop-up-lock");
    });
  },

  //关注
  wxAttention: function () {

    $(".dialog").remove();

    var html = '<div class="dialog">' + '<div class="simple-wrap wx-attention">' + '<div class="close"></div>' + '<div class="title1">恭喜你荐股成功！</div>' + '<div class="title2 text-yellow">获奖红包通过[一起牛]公众号发放</div>' + '<div class="erweima"><img src="../src/images/pic_erweima.jpg"/></div>' + '<div class="title2">长按二维码<span class="text-yellow">立即关注</span></div>' + '</div>' + '</div>';

    $('html').addClass("pop-up-lock");
    $('body').append(html);
    $(".dialog").fadeIn();

    var wrap = $(".dialog .simple-wrap");
    var dHeight = wrap.height();
    var wHeight = $(window).height();

    if (dHeight < wHeight) {
      wrap.css("marginTop", -dHeight / 2);
    } else {
      wrap.css("top", "0.2rem");
      wrap.css("marginBottom", "0.2rem");
    }

    $(".dialog").on("click", function () {
      $(this).remove();
      $('html').removeClass("pop-up-lock");
    });
  },

  //按钮加按下色
  btnActiveBg: function () {

    $(document).on("touchstart", ".btn,.close-dialog-btn", function () {

      $(this).addClass("active");

    }).on("touchend", ".btn,.close-dialog-btn", function () {

      $(this).removeClass("active");

    });
  },

  //价格处理
  formatPrice: function (t) {

    if (/^\d+.\d{1}$/.test(t)) {
      return t.toFixed(2);
    } else {
      return t;
    }
  },

  //微信分享
  wechatShow: function (b, t, d, l, i) {

    var pageUrl = window.location.href;
    var title = t;
    var desc = d;
    var link = l;
    var imgUrl = i;
    var options = {};

    var params = {
      url: pageUrl
    };
    /*获取签名*/
    promotion.ajax(API.fetchJssdk, params, function (data) {
      options = {
        debug: false,
        appId: data.result.appId,
        timestamp: data.result.timestamp,
        nonceStr: data.result.noncestr,
        signature: data.result.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'],
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
      };
      /*调用微信分享方法*/
      niuWebShare(options);
    }, promotion.ajaxFail, { });

    /*微信分享样式自定义方法*/
    function niuWebShare(options) {

      var options = options;

      if (!options) {
        console.log("error:没有正确配置参数！");
        return true;
      }

      wx.config({
        debug: options.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: options.appId, // 必填，公众号的唯一标识
        timestamp: options.timestamp, // 必填，生成签名的时间戳
        nonceStr: options.nonceStr, // 必填，生成签名的随机串
        signature: options.signature, // 必填，签名，见附录1
        jsApiList: options.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function () {

        //关闭分享按钮
        if (b) {
          wx.hideOptionMenu();
        } else {
          wx.showOptionMenu();
        }

        /*---分享给朋友---*/
        wx.onMenuShareAppMessage({
          title: options.title, // 分享标题
          desc: options.desc, // 分享描述
          link: options.link, // 分享链接
          imgUrl: options.imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            console.log("----朋友分享成功的------");
          },
          cancel: function () {
            console.log("----朋友点击了取消------");
          }
        });

        /*---分享到朋友圈---*/
        wx.onMenuShareTimeline({
          title: options.title,
          link: options.link,
          imgUrl: options.imgUrl,
          success: function () {
            console.log("----朋友圈分享成功的------");
          },
          cancel: function () {
            console.log("----朋友圈点击了取消------");
          }
        });

        /*---分享到QQ---*/
        wx.onMenuShareQQ({
          title: options.title,
          desc: options.desc,
          link: options.link,
          imgUrl: options.imgUrl,
          success: function () {
            console.log("----qq分享成功的------");
          },
          cancel: function () {
            console.log("----qq点击了取消------");
          }
        });

      });
    };
  },

  //广告位新增轮播效果
  adAddSwiping: function (id) {

    var options = {
      loop: true,
      pagination: '#adCtrls',
      nextButton: '#btn_next',
      prevButton: '#btn_prev',
      paginationClickable: false,
      spaceBetween: 0,
      centeredSlides: true,
      autoplay: 5000,
      autoplayDisableOnInteraction: false
    };

    var swiper = new Swiper('#' + id, options);
  }
};

// 弹窗对象
var dialog = {

  //初始化
  init: function () {
    dialog.close();
  },

  // 移除弹窗
  remove: function () {
    $(".dialog").fadeOut(250, function () {
      $(this).remove();
    });
    $("html").removeClass("pop-up-lock");
  },

  // 自动消失提示弹窗
  warnPop: function (str, t) {

    var time = t ? t : 2000;

    dialog.remove();

    var _dialogHtml = [];
    _dialogHtml.push('<div class="dialog center">');
    _dialogHtml.push('<div class="simple-wrap">' + str + '</div>');
    _dialogHtml.push('</div>');

    $("html").addClass("pop-up-lock");
    $("body").append(_dialogHtml.join(''));
    $(".dialog").fadeIn();

    var wrap = $(".dialog .simple-wrap");
    var dHeight = wrap.height();
    var wHeight = $(window).height();

    if (dHeight < wHeight) {
      wrap.css("marginTop", -dHeight / 2);
    } else {
      wrap.css("top", "0.2rem");
      wrap.css("marginBottom", "0.2rem");
    }

    setTimeout(function () {
      dialog.remove();
    }, time);
  },

  // 公用弹窗
  commPop: function (id, callback) {

    var html = '<div class="dialog" id="' + id + '"></div>';

    $("html").addClass("pop-up-lock");
    $("body").append(html);
    callback();

    //var wrap = $(".dialog .simple-wrap");
    var wrap = $("#" + id).find('.simple-wrap');
    var dHeight = wrap.height();
    var wHeight = $(window).height();

    if (dHeight < wHeight) {
      //wrap.css("marginTop", -dHeight / 2);
    } else {
      wrap.css("top", "0.2rem");
      wrap.css("marginBottom", "0.2rem");
    }

    this.close();
  },

  // 公用弹窗关闭操作
  close: function (callback) {

    $(document).on("click", ".close-dialog-btn", function (e) {

      e.stopPropagation();

      dialog.remove();

    });
  }
};

//域名
var HOST = {

  /*获取域名*/
  getContext: (function () {
    var a = document.location.pathname.substr(1);
    return a.substr(0, a.indexOf("/"));
  })(),

  /*获取http协议*/
  getProtocol: (function () {
    return document.location.protocol + "//";
  })(),

  /*获取IP地址*/
  getAddress: (function () {
    return document.location.hostname;
  })(),

  /*获取端口*/
  getPort: (function () {
    return document.location.port;
  })(),

  /*获取域名和端口*/
  getHost: function () {
    return 'http://192.168.1.19'
    //return window.location.protocol + "//" + window.location.host;
  }
};

//生产apis
var APIS = {

  //创建初始化
  initCreate: HOST.getHost() + "/gs_api/fetch_init_create_game",

  //保存赛事
  saveGame: HOST.getHost() + "/gs_api/save_game_info",

  //选股
  searchStk: HOST.getHost() + "/gs_api/search_stk_cct",

  //荐股
  saveStk: HOST.getHost() + "/gs_api/save_game_stk",

  //赛事详情
  gameDetail: HOST.getHost() + "/gs_api/fetch_game_detail",

  //个股详情
  stkDetail: HOST.getHost() + "/gs_api/fetch_game_stk_detail",

  //点赞
  stkLike: HOST.getHost() + "/gs_api/save_game_stk_like",

  //比赛列表
  gameList: HOST.getHost() + "/gs_api/fetch_game_event_list",

  //我的
  myInfo: HOST.getHost() + "/gs_api/fetch_my_info",

  //排名
  userRank: HOST.getHost() + "/gs_api/fetch_user_rank",

  //获取用户信息
  initSave: HOST.getHost() + "/gs_api/fetch_init_save_stk",

  //获取微信JS-SDK签名
  fetchJssdk: HOST.getHost() + "/gs_api/fetch_js_sdk_signature",

  //获取赛事结束提醒数据
  fetchGameResult: HOST.getHost() + "/gs_api/fetch_game_result",

  //获取钱包信息
  myWallet: HOST.getHost() + "/gs_api/fetch_my_wallet",

  //获取充值数据
  goodList: HOST.getHost() + "/gs_api/fetch_good_list",

  //消费明细
  walletList: HOST.getHost() + "/gs_api/fetch_wallet_detail",

  //广告轮播
  adLinkList: HOST.getHost() + "/ad_api/fetch_ad_link_list",

  //充值请求接口
  payRequest: HOST.getHost() + "/gs_api/pay_request",

  //下注接口
  saveGameBet: HOST.getHost() + "/gs_api/save_game_bet",

  //荐股初始化页面接口
  initRcmdStk: HOST.getHost() + "/gs_api/fetch_init_rcmd_stk",

  //微信号是否绑定一起牛
  isBind: HOST.getHost + "/gs_api/transfer_user_acc_cash"
};

//开发联调apis
var devAPIS = {

  //创建初始化
  initCreate: HOST.getHost() + "/gs_api/fetch_init_create_game",

  //保存赛事
  saveGame: HOST.getHost() + "/gs_api/save_game_info",

  //选股
  searchStk: HOST.getHost() + "/gs_api/search_stk_cct",

  //荐股
  saveStk: HOST.getHost() + "/gs_api/save_game_stk",

  //赛事详情
  gameDetail: HOST.getHost() + "/gs_api/fetch_game_detail",

  //个股详情
  stkDetail: HOST.getHost() + "/gs_api/fetch_game_stk_detail",

  //点赞
  stkLike: HOST.getHost() + "/gs_api/save_game_stk_like",

  //比赛列表
  gameList: HOST.getHost() + "/gs_api/fetch_game_event_list",

  //我的
  myInfo: HOST.getHost() + "/gs_api/fetch_my_info",

  //排名
  userRank: HOST.getHost() + "/gs_api/fetch_user_rank",

  //获取用户信息
  initSave: HOST.getHost() + "/gs_api/fetch_init_save_stk",

  //获取微信JS-SDK签名
  fetchJssdk: HOST.getHost() + "/gs_api/fetch_js_sdk_signature",

  //获取赛事结束提醒数据
  fetchGameResult: HOST.getHost() + "/gs_api/fetch_game_result",

  //获取钱包信息
  myWallet: HOST.getHost() + "/gs_api/fetch_my_wallet",

  //获取充值数据
  goodList: HOST.getHost() + "/gs_api/fetch_recharge_price",

  //消费明细
  walletList: HOST.getHost() + "/gs_api/fetch_wallet_detail",

  //广告轮播
  adLinkList: HOST.getHost() + "/ad_api/fetch_ad_link_list_noapp",

  //充值请求接口
  payRequest: HOST.getHost() + "/gs_api/pay_request",

  //下注接口
  saveGameBet: HOST.getHost() + "/gs_api/save_game_bet",

  //荐股初始化页面接口
  initRcmdStk: HOST.getHost() + "/gs_api/fetch_init_rcmd_stk",

  //微信号是否绑定一起牛
  isBind: HOST.getHost() + "/gs_api/transfer_user_acc_cash"
};

//假数据apis
var staAPIS = {

  //创建初始化
  initCreate: "htmls/promotion/2015901/data/gs_api/fetch_init_create_game.json",

  //保存赛事
  saveGame: "htmls/promotion/2015901/data/gs_api/save_game_info.json",

  //选股
  searchStk: "htmls/promotion/2015901/data/gs_api/search_stk_cct.json",

  //荐股
  saveStk: "htmls/promotion/2015901/data/gs_api/save_game_stk.json",

  //赛事详情
  gameDetail: "htmls/promotion/2015901/data/gs_api/fetch_game_detail.json",

  //个股详情
  stkDetail: "htmls/promotion/2015901/data/gs_api/fetch_game_stk_detail.json",

  //点赞
  stkLike: "htmls/promotion/2015901/data/gs_api/save_game_stk_like.json",

  //比赛列表
  gameList: "htmls/promotion/2015901/data/gs_api/fetch_game_event_list.json",

  //我的
  myInfo: "htmls/promotion/2015901/data/gs_api/fetch_my_info.json",

  //排名
  userRank: "htmls/promotion/2015901/data/gs_api/fetch_user_rank.json",

  //获取用户信息
  initSave: "htmls/promotion/2015901/data/gs_api/fetch_init_save_stk.json",

  //获取微信JS-SDK签名
  //fetchJssdk: "htmls/promotion/2015901/data/gs_api/fetch_js_sdk_signature.json",
  fetchJssdk: "http://192.168.1.169:8080/callback?timestamp=12341234&nonce=asdfsfd",

  //获取赛事结束提醒数据
  fetchGameResult: "htmls/promotion/2015901/data/gs_api/fetch_game_result.json",

  //获取钱包信息
  myWallet: "htmls/promotion/2015901/data/gs_api/fetch_my_wallet.json",

  //获取充值数据
  goodList: "htmls/promotion/2015901/data/gs_api/fetch_good_list.json",

  //消费明细
  walletList: "htmls/promotion/2015901/data/gs_api/fetch_wallet_detail.json",

  //广告轮播
  adLinkList: "htmls/promotion/2015901/data/ad_api/fetch_ad_link_list.json",

  //充值请求接口
  payRequest: "htmls/promotion/2015901/data/gs_api/pay_request.json",

  //下注接口
  saveGameBet: "htmls/promotion/2015901/data/gs_api/save_game_bet.json",

  //荐股初始化页面接口
  initRcmdStk: "htmls/promotion/2015901/data/gs_api/fetch_init_rcmd_stk.json"
};

//接口配置
var API = devAPIS

$(function () {

  promotion.fontSize();
  promotion.gotoTop();
  promotion.btnActiveBg();
  //promotion.baidu();
  FastClick.attach(document.body);
});
