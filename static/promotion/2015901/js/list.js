/*
 *活动列表
 */

var listHandler = {

  //拉取列表ID
  readId : 0,

  //渲染列表,根据状态显示不同html
  itemHtml : function(obj){
    if(obj){
      var status = obj.gameStatus;
      switch(status) {
        //等待开赛
        case 0:
          return  '<a href="detail.html?gameId=' + obj.gameEventId + '">'
                  + '<div class="l-item">'
                    + '<div class="item-header">'
                      + '<h2>' + obj.gameName + '</h2>'
                      + '<span class="text-gray">等待开赛</span>'
                    + '</div>'
                    + '<div class="item-content">'
                      + '<div class="gravatar">'
                        + '<img src="' + obj.userIcon + '">'
                      + '</div>'
                      + '<ul>'
                        + '<li><span class="item-num-3">发<i></i>起<i></i>人：</span>' + obj.initUserName + '</li>'
                        + '<li class="item-date"><span>比赛时间：</span>' + promotion.competitionDate(promotion.checkDate(obj.startDate),promotion.checkDate(obj.endDate)) + '</li>'
                        + '<li class="item-time"><span>距离开赛：</span>' + promotion.transToHour(obj.time,"start") + '</li>'
                      + '</ul>'
                    + '</div>'
                    + '<div class="item-footer">'
                      + '<div class="content-wrap one-line">'
                        + '<div>我的牛股：<span class="stk-name">' + obj.myStkName + '</span><span class="text-blue">' + obj.myStkCode + '</span></div>'
                      + '</div>'
                    + '</div>'
                  + '</div>'
                  + '</a>';
          break;

        //比赛进行中
        case 1:
          return  '<a href="detail.html?gameId=' + obj.gameEventId + '">'
                  + '<div class="l-item">'
                    + '<div class="item-header">'
                      + '<h2>' + obj.gameName + '</h2>'
                      + '<span class="text-blue">比赛进行中</span>'
                    + '</div>'
                    + '<div class="item-content">'
                      + '<div class="gravatar">'
                        + '<img src="' + obj.userIcon + '">'
                      + '</div>'
                      + '<ul>'
                        + '<li><span class="item-num-3">发<i></i>起<i></i>人：</span>' + obj.initUserName + '</li>'
                        + '<li class="item-date"><span>比赛时间：</span>' + promotion.competitionDate(promotion.checkDate(obj.startDate),promotion.checkDate(obj.endDate)) + '</li>'
                        + '<li class="item-time"><span>距离结束：</span>' + promotion.transToHour(obj.time,"end") + '</li>'
                      + '</ul>'
                    + '</div>'
                    + '<div class="item-footer">'
                      + '<div class="content-wrap">'
                         + '<div>我的排名：<span class="text-red">' + promotion.isHave(obj.myRank) + '</span>/<span>' + promotion.isHave(obj.num) + '</span></div>'
                         + '<div>我的牛股：<span class="stk-name">' + obj.myStkName.substr(0,4) + '</span><span class="text-blue">' + obj.myStkCode + '</span></div>'
                         + '<span class="PE ' + promotion.stkColor(obj.myChangePct) + '">' + promotion.formatPercent(obj.myChangePct,2) + '</span>'
                        + '</div>'
                    + '</div>'
                  + '</div>'
                  + '</a>';
          break;

        //比赛已结束
        case 2:
          return  '<a href="detail.html?gameId=' + obj.gameEventId + '">'
                  + '<div class="l-item">'
                    + '<div class="item-header">'
                      + '<h2>' + obj.gameName + '</h2>'
                      + '<span class="text-gray">已结束</span>'
                    + '</div>'
                    + '<div class="item-content">'
                      + '<div class="gravatar">'
                        + '<img src="' + obj.userIcon + '">'
                      + '</div>'
                      + '<ul>'
                        + '<li><span class="item-num-2">冠<i></i>军：</span>' + obj.wUserName.substr(0,6) + listHandler.winnerPrizeHtml(obj.isPrize,obj.prizeAmount) + '</li>'
                        + '<li class="item-date"><span>比赛时间：</span>' + promotion.competitionDate(promotion.checkDate(obj.startDate),promotion.checkDate(obj.endDate)) + '</li>'
                        + '<li class="item-kemp">'
                          + '<span>冠军牛股：</span><i class="stk">' + obj.wStkName.substr(0,4) + '</i><i class="text-blue">' + obj.wStkCode + '</i><div class="PED ' + promotion.stkColor(obj.wChangePct) + '">' + promotion.formatPercent(obj.wChangePct,2) + '</div>'
                          + '</li>'
                      + '</ul>'
                    + '</div>'
                    + '<div class="item-footer">'
                    + listHandler.endFooterHtml(obj.isWinner,obj)
                    + '</div>'
                  + '</div>'
                  + '</a>';
          break;

        //发起失败
        case 3:
          return  '<a href="javascript:void(0);">'
                  + '<div class="l-item">'
                    + '<div class="item-header">'
                      + '<h2>' + obj.gameName + '</h2>'
                      + '<span class="text-gray">发起失败</span>'
                    + '</div>'
                    + '<div class="item-content">'
                      + '<div class="gravatar">'
                        + '<img src="' + obj.userIcon + '">'
                      + '</div>'
                      + '<ul>'
                        + '<li><span class="item-num-3">发<i></i>起<i></i>人：</span>' + obj.initUserName + '</li>'
                        + '<li class="item-date"><span>比赛时间：</span>' + promotion.competitionDate(promotion.checkDate(obj.startDate),promotion.checkDate(obj.endDate)) + '</li>'
                      + '</ul>'
                    + '</div>'
                    + '<div class="item-footer">'
                      + '<div class="content-wrap one-line">'
                          + '<div>我的牛股：<span class="stk-name">' + obj.myStkName + '</span><span class="stk-code">' + obj.myStkCode + '</span></div>'
                        + '</div>'
                    + '</div>'
                  + '</div>'
                  + '</a>';
          break;
        default :
          return '';
      }
    }else {
      return '<div class="l-null-data">'
            + '<div class="smile-face"><img src="/static/promotion/2015901/images/icon_smile.png"/></div>'
            + '<p>还没有参赛记录？</p>'
            + '<div class="btn-box"><a href="./create.html?ver=' + qnPageVersion + '" class="btn fixed-230">我要发起比赛</a></div>'
          + '</div>';
    }
  },

  //比赛结束两种显示
  endFooterHtml : function(n,obj){
    if(typeof n !== "undefind"){
      if(n === 0){
        return '<div class="content-wrap">'
                + '<div>我的排名：<span class="text-red">' + promotion.isHave(obj.myRank) + '</span>/<span>' + obj.num + '</span></div>'
                + '<div>我的牛股：<span class="stk-name">' + obj.myStkName.substr(0,4) + '</span><span class="stk-code">' + obj.myStkCode + '</span></div>'
              + '<span class="PE ' + promotion.stkColor(obj.myChangePct) + '">' + promotion.formatPercent(obj.myChangePct,2) + '</span>'
            + '</div>';
      }else {
        return '<div class="content-wrap one-line">'
                + '<div>恭喜获封<span class="text-yellow">股神</span>称号</div>'
              + '</div>';
      }
    }
  },

  //冠军红包
  winnerPrizeHtml : function(b,t){
    if(b){
      if(t){
        return '<span class="prize-amount text-yellow">获红包' + t + '元</span>';
      }else{
        return '<span class="prize-amount text-yellow">获得红包</span>';
      }
    }else{
      return '';
    }
  },

  //加载更多html
  moreBtnHtml : function(n) {

    if(n){
      return '<div class="l-item load-more">'
              + '<span>点击加载更多...</span>'
            + '</div>';
    }else{
      return '';
    }
  },

  //增量加载更多html
  moreItemRequest : function() {

    var main = $("#main");
    var params = {
      action : 1,
      readId : listHandler.readId,
      count : 10
    };

    promotion.ajax(API.gameList,params,function(data){

      if(data.code === 0){

        if(data.result){

          var obj = data.result.gameList;

          $(".load-more").unbind("click").remove();
          listHandler.readId = data.result.readId;

          for(var i=0;i<obj.length;i++){

            main.append(listHandler.itemHtml(obj[i]));
          }

          //加载更多按钮
          main.append(listHandler.moreBtnHtml(data.result.hasNext));
          listHandler.clickMoreBtn();
        }
      }else{
        $(".load-more").html("加载失败，点击重试");
      }
    });
  },

  //点击加载更多
  clickMoreBtn : function() {

    $(".load-more").on("click",function() {

      var animateHtml =  '<div class="ajax-loading simple">'
                      + '<div class="circle-a"></div>'
                      + '<div class="circle-b"></div>'
                    + '</div>';

      $(this).html(animateHtml);

      listHandler.moreItemRequest();
    });
  }
};

$(document).ready(function(){

  var main = $("#main");
  var params = {
      action : 0,
      readId : 0,
      count : 25
    };

  promotion.ajax(API.gameList,params,function(data){

    promotion.ajaxLoading("end");

    if(data.code === 0){

      main.empty();

      if(data.result){

        var obj = data.result.gameList;

        listHandler.readId = data.result.readId;

        for(var i=0;i<obj.length;i++){

          main.append(listHandler.itemHtml(obj[i]));
        }

        //加载更多按钮
        main.append(listHandler.moreBtnHtml(data.result.hasNext));
        listHandler.clickMoreBtn();

      }else{

        main.append(listHandler.itemHtml(null));
      }

      main.fadeIn(250);

    }else{
      dialog.warnPop(data.message);
    }
  },promotion.ajaxFail);

  //关闭微信分享
  promotion.wechatShow(true);

});


