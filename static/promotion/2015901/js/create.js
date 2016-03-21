/*
 *创建活动
 */

var creater = {

  //缓存开始时间与结束时间
  startTime: null,
  endTime: null,
  reqId: null,

  //变量，触摸定时器
  touchTimer: null,

  touchTimer2: null,

  //初始化头像、时间
  page: function(data) {

    if (data.code === 0) {
      if (data.result) {

        var o = data.result;
        var gravatar = $("#gravatar");
        var startTime = $("#startTime");
        var endTime = $("#endTime");
        var stringArr = ['一天赛','二天赛','一周后','一个月','三个月'];
        creater.startTime = o.tradeDate;
        creater.endTime = o.toTradeDate;

        gravatar.attr("src", promotion.userIcon(o.userIcon));
        startTime.empty();
        endTime.empty();

        $.each(o.tradeDate, function(i, v) {
          startTime.append('<option value="' + v + '">' + v + '</option>');

          //endTime.append('<option value="' + v + '">' + v + '</option>');
        });


        //初始化结束时间
        $.each(o.toTradeDate[o.tradeDate[0]],function(i,v){
            endTime.append('<option value="' + v + '">' + stringArr[i] +' '+ v +'</option>');
        })

        $.each(o.toTradeDate[o.tradeDate[0]],function(i,v){
          if(i>=1) return false;
            $('#v1').text(v)
        })
        // var html = '';
        // for( var a  in json){
        //     html += '<option value="2">'+json[a]+'</option>';
        // }
        // endTime[0].innerHTML = html;
         



        $("#main").fadeIn(250);

        creater.selectStartTime(creater.startTime, creater.endTime);
        // creater.navChange();
      }
    } else {
      dialog.warnPop(data.message);
    }
  },

  //处理输入时导航并顶上来的问题
  navChange: function() {
    $("#competitionName").on("touchstart", function() {
      creater.touchTimer = setTimeout(function() {
        $("footer").animate({
          bottom: "-80px"
        }, 150).hide();
      }, 150);
      clearTimeout(creater.touchTimer2);
    }).on("touchmove", function() {
      clearTimeout(creater.touchTimer);
      if ($("#competitionName").is(":focus") ||
        $("#startTime").is(":focus") ||
        $("#endTime").is(":focus") ||
        $("#memberNumber").is(":focus")) {
        $("footer").animate({
          bottom: "-80px"
        }, 150).hide();
      } else {
        $("footer").animate({
          bottom: 0
        }, 150).show();
      }
    }).on("blur", function() {
      creater.touchTimer2 = setTimeout(function() {
        $("footer").animate({
          bottom: 0
        }, 150).show();
      }, 150);
    });

    $("#startTime").on("touchstart", function() {
      creater.touchTimer = setTimeout(function() {
        $("footer").animate({
          bottom: "-80px"
        }, 150).hide();
      }, 150);
      clearTimeout(creater.touchTimer2);
    }).on("touchmove", function() {
      clearTimeout(creater.touchTimer);
      if ($("#competitionName").is(":focus") ||
        $("#startTime").is(":focus") ||
        $("#endTime").is(":focus") ||
        $("#memberNumber").is(":focus")) {
        $("footer").animate({
          bottom: "-80px"
        }, 150).hide();
      } else {
        $("footer").animate({
          bottom: 0
        }, 150).show();
      }
    }).on("blur", function() {
      creater.touchTimer2 = setTimeout(function() {
        $("footer").animate({
          bottom: 0
        }, 150).show();
      }, 150);
    });

    $("#endTime").on("touchstart", function() {
      creater.touchTimer = setTimeout(function() {
        $("footer").animate({
          bottom: "-80px"
        }, 150).hide();
      }, 150);
      clearTimeout(creater.touchTimer2);
    }).on("touchmove", function() {
      clearTimeout(creater.touchTimer);
      if ($("#competitionName").is(":focus") ||
        $("#startTime").is(":focus") ||
        $("#endTime").is(":focus") ||
        $("#memberNumber").is(":focus")) {
        $("footer").animate({
          bottom: "-80px"
        }, 150).hide();
      } else {
        $("footer").animate({
          bottom: 0
        }, 150).show();
      }
    }).on("blur", function() {
      creater.touchTimer2 = setTimeout(function() {
        $("footer").animate({
          bottom: 0
        }, 150).show();
      }, 150);
    });

    $("#memberNumber").on("touchstart", function() {
      creater.touchTimer = setTimeout(function() {
        $("footer").animate({
          bottom: "-80px"
        }, 150).hide();
      }, 150);
      clearTimeout(creater.touchTimer2);
    }).on("touchmove", function() {
      clearTimeout(creater.touchTimer);
      if ($("#competitionName").is(":focus") ||
        $("#startTime").is(":focus") ||
        $("#endTime").is(":focus") ||
        $("#memberNumber").is(":focus")) {
        $("footer").animate({
          bottom: "-80px"
        }, 150).hide();
      } else {
        $("footer").animate({
          bottom: 0
        }, 150).show();
      }
    }).on("blur", function() {
      creater.touchTimer2 = setTimeout(function() {
        $("footer").animate({
          bottom: 0
        }, 150).show();
      }, 150);
    });
  },

  //选择开始时间
  selectStartTime: function(start, end) {

    var startInput = $("#startTime");
    var endInput = $("#endTime");

    startInput.on("change", function() {
      var val = $(this).val();

      for (var i = 0; i < start.length; i++) {
        if (val === start[i]) {
          creater.changeEndTime(creater.endTime[val]);
        }
      }
    });
  },

  //渲染结束时间
  changeEndTime: function(end) {

    var endInput = $("#endTime");
    var val = endInput.val();
    var stringArr = ['一天赛','二天赛','一周后','一个月','三个月'];
    endInput.empty();
    
    
    // for (var i = 0; i < end.length; i++) {
    //   if (val === end[i]) {
    //     endInput.append('<option value="' + end[i] + '>' + stringArr[i] + '</option>');

    //   } else {
    //     endInput.append('<option value="' + end[i] + '">' +stringArr[i] +' '+ end[i] +'</option>');
    //   }
    // }


    for (var i = 0; i < end.length; i++) {
      if ($('#v1').val() === end[i]) {
         endInput.append('<option value="' + end[i] + '>' +stringArr[i] +' '+ end[i] + '</option>');
         $('#v1').text(end[i]);
      } else {
        endInput.append('<option value="' + end[i] + '">' +stringArr[i] +' '+ end[i] +'</option>');
      }
    }
    function change(ele) {
        v1.innerHTML = ele.getElementsByTagName('option')[ele.selectedIndex].innerHTML.split(' ')[1];
    }  
    // setTimeout(function(){
    //   endInput.find('option:eq(0)').html(endInput.find('option:eq(1)').val())
    //   endInput.on('click',function(){
    //   $(this).find('option:eq(0)').hide();
    //   })
    //   endInput.on('change',function(){
    //   $(this).find('option:eq(0)').val($(this).find('option:checked').val()).show().html($(this).find('option:checked').val());
    //   $(this).val($(this).find('option:checked').val());
    //   })  
    // })


  },

  //提交并创建赛事
  createCompetition: function() {

    $("#createBtn").on("click", function() {
      var competitionName = $("#competitionName").val();
      var startTime = $("#startTime").val();
      var endTime = $("#endTime").val();
      var memberNumber = parseInt($("#memberNumber").val());

      if (!competitionName) {
        $("#competitionName").focus();
        return false;
      }

      if (competitionName && ($.trim(competitionName)).length <= 0) {
        dialog.warnPop("赛事名称格式不被支持");
        return false;
      }

      if (competitionName.length > 10) {
        dialog.warnPop("赛事名称不能超过10个字");
        return false;
      }

      var params = {
        reqId: creater.reqId,
        name: competitionName,
        startDate: startTime,
        endDate: endTime,
        limitNum: memberNumber
      };

      promotion.ajax(API.saveGame, params, function(data) {
        if (data.code === 0) {
          window.location.href = "./join.html?gameId=" + data.result.gameEventId;
        } else {
          dialog.warnPop(data.message);
        }
      });
    });
  }
};

$(document).ready(function() {
   
  creater.reqId = promotion.onlyNum();
  promotion.ajax(API.myInfo, {}, function(data) {

    promotion.ajaxLoading("end");

    if (data.code === 0) {

      var obj = data.result;
      $("#competitionName").val(obj.userName + "的荐股比赛")
      promotion.ajax(API.initCreate, {}, creater.page,null);
    } else {
      dialog.warnPop(data.message);
    }
  }, promotion.ajaxFail);

  creater.createCompetition();

  //关闭微信分享
  promotion.wechatShow(true);

  // 比赛名输入框
  var first = true
  $('#competitionName').focus(function() {
    if(first) {
      $('#competitionName').val('');
      first = false;
    }
  });

});
