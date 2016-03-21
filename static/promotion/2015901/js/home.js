/*
 *我的水平
 */

var homeHandler = {

  //个人信息,header
  headerHtml: function(obj) {
    return template('home/header', obj);
  },

  //画图页面
  chartBoxHtml: function(obj) {
    return template('home/chartBox', obj);
  },

  showTipMask: function() {
    $('.icon-question-mark').on('click', function() {
      $('.h-marking').css('display', 'block')
    });

    $('.h-marking').on('click', function() {
      $('.h-marking').css('display', 'none')
    });
  },

  //切换收益率,胜率
  changeTabs: function(obj) {

    var _secondTabHtml = template('home/secondTab', obj);

    $("#hTabs1").on("click", function() {
      $(this).addClass("active");
      $("#chartBox1").addClass("active");
      $("#hTabs2").removeClass("active");
      $("#chartBox2").removeClass("active");

      homeHandler.earningsChart(obj);
    });

    $("#hTabs2").on("click", function() {
      $(this).addClass("active");
      $("#chartBox2").addClass("active").html(_secondTabHtml);
      $("#hTabs1").removeClass("active");
      $("#chartBox1").removeClass("active");

      homeHandler.winRateChart(obj);
    });
  },

  //累计收益图
  earningsChart: function(obj) {

    var deg1 = 0;
    var deg2 = -292;
    var mydeg;
    var t1;
    var t2;
    var stage;

    obj.cYield = obj.cYield / 10

    if (obj.cYield) {
      mydeg = formatDeg(obj.cYield);

    } else {
      mydeg = formatDeg(0);
    }

    //转换成相应角度
    function formatDeg(t) {

      t = Math.floor(t * 100);

      if (Math.abs(t) % 2 === 1) {
        t = t + 1;
      }

      if (t < -50) {
        return -292;
      } else if (t <= 0) {
        var m = Math.floor(t);
        return (-180 + Math.floor(112 * m / 50));
      } else if (t < 200) {
        return (Math.floor(112 * t / 200));
      } else {
        return 112;
      }
    }

    //初始化角度
    function init() {
      $("#chartPie1").css("-o-transform", "rotate(0deg)");
      $("#chartPie1").css("-moz-transform", "rotate(0deg)");
      $("#chartPie1").css("-webkit-transform", "rotate(0deg)");
      $("#chartPie2").css("-o-transform", "rotate(-292deg)");
      $("#chartPie2").css("-moz-transform", "rotate(-292deg)");
      $("#chartPie2").css("-webkit-transform", "rotate(-292deg)");
    }

    var maxYuan = 115;

    //右边的圆
    function drawChart1() {

      deg1 = deg1 + 2;

      if (obj.cYield <= 0.2) {
        if (deg1 >= ((obj.cYield / 0.2) * (maxYuan / 2))) {
          clearInterval(t1);
        };
      } else {
        if (deg1 >= (obj.cYield * maxYuan)) {
          clearInterval(t1);
        };
      }

      $("#chartPie1").css("-o-transform", "rotate(" + deg1 + "deg)");
      $("#chartPie1").css("-moz-transform", "rotate(" + deg1 + "deg)");
      $("#chartPie1").css("-webkit-transform", "rotate(" + deg1 + "deg)");
    };

    //左边的圆
    function drawChart2() {

      deg2 = deg2 + 2;

      if (obj.cYield > 0) {

        if (deg2 === -180) {
          clearInterval(t2);
          t1 = setInterval(drawChart1, 1);
        }
      } else {
        if (deg2 >= -(292 - (120 + (obj.cYield * 10 * 120)))) {
          clearInterval(t2);
        }
      }

      $("#chartPie2").css("-o-transform", "rotate(" + deg2 + "deg)");
      $("#chartPie2").css("-moz-transform", "rotate(" + deg2 + "deg)");
      $("#chartPie2").css("-webkit-transform", "rotate(" + deg2 + "deg)");

      if (obj.cYield > 0) {
        if (obj.cYield <= 0.2) {
          $('.cursor-wrap').css({
            'transform': 'rotate(' + (0.5 + obj.cYield / 0.2 * 0.5 / 2) * 210 + 'deg)',
            '-webkit-transform': 'rotate(' + (0.5 + obj.cYield / 0.2 * 0.5 / 2) * 210 + 'deg)'
          })
        } else {
          $('.cursor-wrap').css({
            'transform': 'rotate(' + (0.5 + obj.cYield / 2) * 210 + 'deg)',
            '-webkit-transform': 'rotate(' + (0.5 + obj.cYield / 2) * 210 + 'deg)'
          })
        }
      } else {
        // -9 - 100
        var fuYuan = Math.abs(obj.cYield * 10)

        $('.cursor-wrap').css({
          'transform': 'rotate(' + (99 - (fuYuan * 100)) + 'deg)',
          '-webkit-transform': 'rotate(' + (99 - (fuYuan * 100)) + 'deg)'
        })
      }
    };

    init();

    t2 = setInterval(drawChart2, 1);
  },

  //胜率图
  winRateChart: function(obj) {
    $(function() {

      var width = $("#chartBox2").width();
      var box = $("#canvasBox");
      var p;

      if (promotion.browserRedirect()) {

        box.data("dimension", width * 2);
      } else {
        box.data("dimension", width * 1);
      }

      if (obj.rPro <= 0.01) {
        p = 0.01;
      } else {
        p = obj.rPro;
      }

      box.data("percent", p * 100);

      box.circliful();

      if (promotion.browserRedirect()) {
        var o = $("#canvasBox");
        var c = $("#canvasBox canvas");
        o.css("width", o.width() / 2);
        c.css("width", c.width() / 2);
      }
    });
  },

  //分享，秀一下
  weixinShare: function(obj) {

    var uId = obj.gameUserId;

    if (uId) {
      var title = '制霸朋友圈的股神竟然是TA！红包拿到手软！';
      var desc = '“股神来了”帮你寻找朋友圈的真股神，速来参赛争夺百万红包！';
      var link = document.location.protocol + "//" + window.location.host + window.location.pathname + "?userId=" + uId;
      var imgUrl = document.location.protocol + "//" + window.location.host + "/static/promotion/2015901/images/pic_share.jpg";

      promotion.wechatShow(false, title, desc, link, imgUrl);

    }

    if ($("#shareBtn")) {
      $("#shareBtn").on("click", promotion.wxShareNotice);
    }
  }
};

$(document).ready(function() {

  var userId = promotion.getUrlParam("userId");
  var params;

  if (userId) {
    params = {
      gameUserId: userId
    };

    //隐藏掉导航
    $("footer").remove();
  } else {
    params = {};
  }

  promotion.ajax(API.myInfo, params, function(data) {

    promotion.ajaxLoading("end");

    if (data.code === 0) {

      var obj = data.result;
      var htmls = homeHandler.headerHtml(obj) + homeHandler.chartBoxHtml(obj);

      $("#main").empty().append(htmls).fadeIn(250);

      homeHandler.changeTabs(obj);
      homeHandler.weixinShare(obj);
      homeHandler.earningsChart(obj);
      homeHandler.showTipMask()

    } else {
      dialog.warnPop(data.message);
    }
  }, promotion.ajaxFail);
});
