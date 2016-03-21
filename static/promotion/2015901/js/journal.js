/*
 *我的水平
 */


var journalHandler = {
  readId: 0,
  readId2: 0,
  requestType: 'redList',
  activeLoad: null,
  changeTabs : function(){
    $('.jo-tabs').on('click','li',function(){
      $(this).addClass('active').siblings('li').removeClass('active')
      $('.jo-box').eq($(this).index()).addClass('active').siblings('.jo-box').removeClass('active')
      if ($('.jo-tabs li').eq(0).hasClass('active')) {
        journalHandler.requestType = 'redList'
        $("#bonusList").removeClass('active')
        $("#redList").addClass('active')
      } else {
        journalHandler.requestType = 'bonusList'
        $("#redList").removeClass('active')
        $("#bonusList").addClass('active')
      }
    })
  },

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

          $('.jo-advert').html(template('deposit/banner', data))

          if (ads.length > 1) {
            promotion.adAddSwiping("deAdvertWrap");
          }
        }
      } else {
        console.log(data.message);
      }
    }, promotion.ajaxFail);
  },

  //请求明细
  journalRequest: function() {
    var params = {
      count  : 10,
      type   : 'V',
      readId : journalHandler.readId
    };

    promotion.ajax(API.walletList, params, function(data) {
      var main = $("#main");
      promotion.ajaxLoading("end");

      if (data.code === 0) {
        var obj = data.result;
         journalHandler.readId = obj.readId
        //请求红包
        var bonusParams = {
          count  : 10,
          type   : 'C',
          readId : journalHandler.readId2
        };

        var _redListHtml = template('journal/redList', obj)
        $(".load-more").unbind("click").remove();
        var _readMore = journalHandler.moreBtnHtml(data.result.hasNext);
        promotion.ajax(API.walletList, bonusParams, function(data) {

          if (data.code === 0) {

            var bonusObj = data.result;

            journalHandler.readId2 = bonusObj.readId
            bonusObj.first = 1

            var _bonusListHtml = template('journal/bonusList', bonusObj)

            var bonusMore = journalHandler.moreBtnHtml(data.result.hasNext);
            // 首次加载
            _redListHtml = '<div class="jo-box niubi active" id="redList">' +_redListHtml + '</div>'
            _bonusListHtml = '<div class="jo-box cash" id="bonusList">' + _bonusListHtml + '</div>'
            var htmls = _redListHtml + _bonusListHtml
            $(".jo-container").html(htmls).fadeIn(250,function () {
              $("#redList").append($(_readMore))
              $("#bonusList").append(bonusMore)
              journalHandler.clickMoreBtn()
            });
            journalHandler.changeTabs();

          }
        }, promotion.ajaxFail);

      } else {
        dialog.warnPop(data.message);
      }
    }, promotion.ajaxFail);
  },
  clickMoreBtn : function() {

    $(".load-more").on("click",function() {
      var animateHtml =  '<div class="ajax-loading simple">'
        + '<div class="circle-a"></div>'
        + '<div class="circle-b"></div>'
        + '</div>';
      journalHandler.activeLoad = $(this)
      $(this).html(animateHtml);

      journalHandler.moreItemRequest(journalHandler.requestType);
    });
  },
  //加载更多html
  moreBtnHtml : function(n) {
     n === null ? n = 0 : true
    if(n != 0){
      return '<div class="l-item load-more">'
        + '<span>点击加载更多...</span>'
        + '</div>';
    }else{
      return '';
    }
  },
  readMore: function (data) {
    if (data.code === 0) {
      var Obj = data.result;
      journalHandler.readId = Obj.readId
      var redList = template('journal/redList', Obj)
      var More = journalHandler.moreBtnHtml(data.result.hasNext);
      $("#redList").append(redList + More)
    }else{
      $(".load-more").html("加载失败，点击重试");
    }
  },
  bonusMore: function (data) {
    if (data.code === 0) {
      var bonusObj = data.result;
      journalHandler.readId2 = bonusObj.readId
      var _bonusListHtml = template('journal/bonusList', bonusObj)
      var bonusMore = journalHandler.moreBtnHtml(data.result.hasNext);
      $("#bonusList").append(_bonusListHtml + bonusMore)
    }else{
      $(".load-more").html("加载失败，点击重试");
    }
  },
  //增量加载更多html
  moreItemRequest : function(type) {
    var params = {}
    if(type != 'redList') {
      params = {
        count  : 10,
        type   : 'C',
        readId : journalHandler.readId2
      };
    } else {
      params = {
        count  : 10,
        type   : 'V',
        readId : journalHandler.readId
      };
    }
    promotion.ajax(API.walletList,params,function(data){
      $(".load-more").unbind("click")
      journalHandler.activeLoad.remove()
        if (type == 'redList' ) {
          journalHandler.readMore(data)
        } else {
          journalHandler.bonusMore(data)
        }
      journalHandler.clickMoreBtn();
    });
  },
};

$(document).ready(function() {
  journalHandler.advertRequest()
  journalHandler.journalRequest()
});
