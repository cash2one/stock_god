/*
 *排名页面
 */

var rankingHandler = {
  goChange: function (obj) {
    for (item in obj) {
      if (obj[item] === null) {
        obj[item] = "";
      }
    }
    return obj;
  },
  advertRequest: function () {

    var params = {
      positionGroup: 1004,
      count: 5
    };

    promotion.ajax(API.adLinkList, params, function (data) {

      if (data.code === 0) {
        if (data.result) {
          var ads = data.result;

          $("#main").prepend(template('deposit/banner', data));

          if (ads.length > 1) {
            promotion.adAddSwiping("deAdvertWrap");
          }

          setTimeout(function () {
            $("#adCtrls").show();
          }, 500);
        }
      } else {
        console.log(data.message);
      }
    }, promotion.ajaxFail);
  },

  //分离称号
  titleFormat: function (grade, title) {
    if (!title) return '';
    var pattern = /(LV\d+)([\s\S]*)/;
    return "<em>" + grade + "</em>" + title;
  },

  //计算占比条
  scaleWidth: function (n) {

    if (n < -0.5) {
      n = -0.500;
    }
    ;

    return (((n - (-0.5)) / 3.5).toFixed(4) * 100) + "%";
  },

  //广告条
  bannerHtml: function () {
    this.advertRequest();
  },

  //我的排名
  myRankHtml: function (obj) {
    obj = this.goChange(obj);
    var data = {
      obj: obj,
      myrank: rankingHandler.formatRank(obj.myRank),
      icon: promotion.userIcon(obj.myUserIcon),
      username: obj.myUserName.substr(0, 4),
      totalYield: promotion.formatPercent(obj.myTotalYield, 2),
      rcmdYield: promotion.formatPercent(obj.myRcmdYield, 0),
      scaleWidth: rankingHandler.scaleWidth(obj.myTotalYield),
      title: rankingHandler.titleFormat(obj.myGrade, obj.myTitle)
    }
    return template('ranking/myRank', data);
  },

  //排名处理
  formatRank: function (t) {

    if (t && t != 0) {
      return t;
    } else {
      return '100+';
    }

  },

  //成员
  trHtml: function (obj) {
    var data = {
      obj: obj,
      title: rankingHandler.titleFormat(obj.grade,obj.title),
      rcmd: promotion.formatPercent(obj.rcmdYield, 0),
      total: promotion.formatPercent(obj.totalYield, 2)
    };
    return template('ranking/tr', data);
  },

  //生成表格
  listHtml: function (arr) {

    if (arr.length) {
      var html = template('ranking/list', {});

      for (var i = 0; i < arr.length; i++) {

        html += this.trHtml(arr[i]);

      }

      html += '</tbody></table></div>';

      return html;
    }
  },

  //底部分享按钮
  btnBoxHtml: function (obj) {

    var userId = promotion.getUrlParam("userId");
    var data = {
      id: userId
    };
    return template('ranking/btnBox', data);
  },

  //分享，秀一下
  weixinShare: function (obj) {

    var uId = obj.gameUserId;

    if (uId) {
      var data = {
        rank: rankingHandler.formatRank(obj.myRank),
        username: obj.myUserName.substr(0, 4),
        total: promotion.formatPercent(obj.myTotalYield, 0),
        rcmd: promotion.formatPercent(obj.myRcmdYield, 0),
        title: obj.myTitle,
        first: true
      }

      var title = template('ranking/share', data);
      data.first = false;
      var desc = template('ranking/share', data);
      var link = document.location.protocol + "//" + window.location.host + window.location.pathname + "?userId=" + uId;
      var imgUrl = document.location.protocol + "//" + window.location.host + "/static/promotion/2015901/images/pic_share.jpg";

      promotion.wechatShow(false, title, desc, link, imgUrl);

    }

    if ($("#shareBtn")) {
      $("#shareBtn").on("click", promotion.wxShareNotice);
    }
  }
};

$(document).ready(function () {


  var userId = promotion.getUrlParam("userId");
  var params;

  if (userId) {
    params = {
      gameUserId: userId
    };
  } else {
    params = {};
  }

  promotion.ajax(API.userRank, params, function (data) {

    promotion.ajaxLoading("end");

    if (data.code === 0) {
      var obj = data.result;
      var arr = data.result.datas;
      var htmls = rankingHandler.myRankHtml(obj) + rankingHandler.listHtml(arr) + rankingHandler.btnBoxHtml();

      $("#main").empty().append(htmls).fadeIn(250);
      //请求广告
      rankingHandler.bannerHtml();
      //微信分享
      rankingHandler.weixinShare(obj);

      if ($("#shareBtn")) {
        $("#shareBtn").on("click", promotion.wxShareNotice);
      }

    } else {
      dialog.warnPop(data.message);
    }
  }, promotion.ajaxFail);

});
