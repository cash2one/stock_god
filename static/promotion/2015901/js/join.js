/*
 *推荐股票
 */

//搜索自动匹配
var stkComplete = {
  //输入参数
  inputChange: function () {
    $("#searchInput").on("input propertychange", function () {
      var txt = $(this).val();
      var $this = $(this);
      stkComplete.searchData(txt, $this);
    });
    //兼容IOS输入中文
    //document.getElementById('searchInput').addEventListener('input', function (e) {
    //  var txt = e.target.value;
    //  var $this = $(this);
    //  stkComplete.searchData(txt, $this);
    //});
  },
  searchData : function (t, o) {
    if (t.length > 0) {
      if (t.length > 6 && o.data("stk")) {
        var params = {
          "condition": o.data("stk").substr(0, 6),
          "flag"     : 1
        };
        promotion.ajax(API.searchStk, params, stkComplete.displayStks);
      } else {
        var params = {
          "condition": t,
          "flag"     : 1
        };
        promotion.ajax(API.searchStk, params, stkComplete.displayStks);
        o.data("stk", "");
      }
    } else {
      $("#searchResult").hide();
      o.data("stk", "");
    }
  },
  //隐藏结果
  hideResult : function () {
    $("#searchResult").hide();
  },
  //显示结果
  displayStks: function (data) {
    if(!data) return false
    if (data.code === 0) {
      var result = $(data.result.stks);
      var box = $("#searchResult");
      box.find("li").remove();
      if (result && result.length <= 0) {
        var html = '<li class="no-result">没有搜索到相关股票</li>';
        box.append(html);
      } else {
        $.each(result, function (i) {
          if (i < 3) {
            var html = stkComplete.fuzzyHtml({
              id    : result[i].id,
              status: result[i].status,
              name  : result[i].name,
              state : stkComplete.stkStatus(result[i].status)
            })
            box.append(html);
          }
        });
      }
      box.fadeIn();
      stkComplete.selectStk();
    } else {
    }
  },
  fuzzyHtml  : function (obj) {
    return template('join/fuzzy', obj);
  },
  //选择股票
  selectStk  : function () {
    $("#searchResult li").on("click", function () {
      var state = {
        5: "未上市股票不能参加比赛",
        4: "退市股票不能参加比赛",
        3: "停牌股票不能参加比赛"
      }
      if ($(this).hasClass("no-result")) {
        return false;
      }
      else {
        var $this = $(this);
        var status =$.trim($this.data("status"));
        var stk = $this.text();
        if (state[status]) {
          dialog.warnPop(state[status])
        }
        else {
          $("#searchInput").data("stk", $(this).data("code")).val(stk);
          stkComplete.hideResult();
        }
      }
    });
  },
  //股票状态
  stkStatus  : function (t) {
    var state = {
      5: '未上市',
      4: '退市',
      3: '停牌'
    }
    return state[t]
  }
};
//推荐股票
var joiner = {
  reqId      : null,
  //处理触摸导航的定时器
  touchTimer : null,
  touchTimer2: null,
  //处理输入时导航并顶上来的问题
  navChange  : function () {
    $("#searchInput").on("click", function () {
      joiner.touchTimer = setTimeout(function () {
        $("footer").animate({bottom: "-80px"}, 150).hide();
      }, 150);
      clearTimeout(joiner.touchTimer2);
    }).on("touchmove", function () {
      clearTimeout(joiner.touchTimer);
      if ($("#searchInput").is(":focus") ||
        $("#reason").is(":focus")) {
        $("footer").animate({bottom: "-80px"}, 150).hide();
      } else {
        $("footer").animate({bottom: 0}, 150).show();
      }
    }).on("blur", function () {
      joiner.touchTimer2 = setTimeout(function () {
        $("footer").animate({bottom: 0}, 150).show();
      }, 550);
    });
    $("#reason").on("click", function () {
      joiner.touchTimer = setTimeout(function () {
        $("footer").animate({bottom: "-80px"}, 150).hide();
      }, 150);
      clearTimeout(joiner.touchTimer2);
      stkComplete.hideResult();
    }).on("touchmove", function () {
      clearTimeout(joiner.touchTimer);
      if ($("#searchInput").is(":focus") ||
        $("#reason").is(":focus")) {
        $("footer").animate({bottom: "-80px"}, 150).hide();
      } else {
        $("footer").animate({bottom: 0}, 150).show();
      }
    }).on("blur", function () {
      joiner.touchTimer2 = setTimeout(function () {
        $("footer").animate({bottom: 0}, 150).show();
      }, 150);
    });
  },
  //// 获取我的名字
  //getUserInfo: function() {
  //  var userId = promotion.getUrlParam("userId");
  //  var params;
  //
  //  if (userId) {
  //    params = {
  //      gameUserId: userId
  //    };
  //
  //    //隐藏掉导航
  //    $("footer").remove();
  //  } else {
  //    params = {};
  //  }
  //
  //  promotion.ajax(API.myInfo, {}, function(data) {
  //
  //    promotion.ajaxLoading("end");
  //
  //    if (data.code === 0) {
  //
  //      var obj = data.result;
  //      $("#competitionName").val(obj.userName + "的荐股比赛")
  //      promotion.ajax(API.initCreate, {}, creater.page,null);
  //    } else {
  //      dialog.warnPop(data.message);
  //    }
  //  }, promotion.ajaxFail);
  //},
  //初始化页面
  page: function () {
    var gameId = promotion.getUrlParam("gameId");
    if (gameId) {
      var params = {
        gameEventId: gameId
      };
      promotion.ajax(API.initRcmdStk, params, function (data) {
        if (data.code === 0) {
          if (data.result) {
            // 生成头部参赛人或创始人信息代码
            var obj = {
              'isCreate':data.result.isCreate,
              'userName':data.result.userName,
              'eventName':data.result.eventName
            };
            var _headerHtml = template('join/joinType',obj);
            $('#j-steps').html(_headerHtml);

            var result = {
              userIcon: data.result.userIcon,
              isNew : data.result.isNew,
              balAmount: data.result.balAmount || 0,
              initAmount: data.result.initAmount
            }
            $("#gravatar").attr("src", result.userIcon);

            // 默认投入的资金
            var raw_value = Math.floor(data.result.balAmount / 2)
            select_value = raw_value % 2 === 0 ? raw_value : raw_value + 1;
            // 选择列表
            var index = raw_value > 50 ? 50 : raw_value;
            var list = []
            for (var i=0;i<=index;i++){
              list.push(i);
            }
            var select = template('join/select', {list: list,select_value: select_value})
            $("#addNiuBi").html(select);
            $("#main").fadeIn(250);
            joiner.save(result);
            joiner.navChange();
            joiner.selectTips(result)
            joiner.layer()
          }
        } else {
          dialog.warnPop(data.message);
        }
      }, promotion.ajaxFail);
    } else {
      dialog.warnPop("数据加载失败");
    }
  },
  //蒙层
  layer      : function () {
    var
      first,
      state = true,
      $marking = $('#J_marking'),
      $openLayer = $('#J_openLayer'),
      toggler = function () {
        if (state) {
          $marking.fadeIn(250)
          state = false
        }
        else {
          $marking.fadeOut(250)
          state = true
        }
      }
    try {
      first = localStorage.getItem('JOINFIRST')
      if (!first) {
        toggler()
        localStorage.setItem('JOINFIRST', 'true')
      }
    }
    catch (err) {
    }
    $marking.on('click', toggler)
    $openLayer.on('click', toggler)
  },
  //投入模拟资金下拉的文字信息提示, 新老用户显示对应文字提示
  selectTips : function (result) {
    var tips = {
      new: '模拟投资股票, 赚收益. 初始赠送40牛币',
      many: '当前余额：<span class="j-note-bal">' + result.balAmount + '</span>牛币'
    }
    $('#J_remark').html(result.isNew ? tips.new : tips.many)
  },
  //提交
  save       : function (result) {
    var $searchInput = $("#searchInput")
    var $reason = $("#reason")
    var $addNiuBi = $("#addNiuBi")
    $("#joinBtn").on("click", function () {
      var stkCode = $searchInput.data("stk") // test code 600503
      var reason = $reason.val()
      var amount = +$addNiuBi.val()
      var balAmount = result.isNew ? result.initAmount : result.balAmount
      if(balAmount < amount){
        dialog.warnPop("牛币余额不足")
        return false;
      }
      if (!stkCode) {
        $searchInput.focus();
        return false;
      }
      //if (!reason) {
      //  $reason.focus();
      //  return false;
      //}
      //if (reason && reason.length > 50) {
      //  dialog.warnPop("推荐理由不能超过50个字")
      //  return false;
      //}
      var params = {
        reqId      : joiner.reqId,
        gameEventId: promotion.getUrlParam("gameId"),
        stkCode    : stkCode,
        reason     : reason,
        amount     : amount
      };
      promotion.ajax(API.saveStk, params, function (data) {
        if (data.code === 0) {
          window.location.href = "./detail.html?gameId=" + data.result.gameEventId + "&v=" + promotion.timeStamp;
        } else {
          dialog.warnPop(data.message);
        }
      },promotion.ajaxFail);
    });
  }
};
$(function () {
  joiner.reqId = promotion.onlyNum();
  stkComplete.inputChange();
  joiner.page();
  //关闭微信分享
  promotion.wechatShow(true);
});


