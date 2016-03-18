/*
 *活动详情
 */

var detailHandler = {

  //变量，用于存放距离时间
  time: 0,

  //变量，用于存放刷新定时器
  tTimer: null,

  //变量，用于存放倒计时定时器
  iTimer: null,

  //变量，用于锁定最用户刷新
  userType: true,

  //变量，用于控制用户是否查看了广告
  isLook: false,

  // 唯一id
  reqId: null,

  gameId: 0,

  // 红包收益

  bonus: 0,

  goChange: function (obj) {
    for (item in obj) {
      if (obj[item] === null) {
        obj[item] = "";
      }
    }
    return obj;
  },

  bounce: function () {
    return false; //暂时关闭
    var shareBtn = $("#shareBtn");
    shareBtn.addClass("bounceXY animated ");
    setTimeout(function () {
      shareBtn.removeClass("bounceXY animated");
      setTimeout(detailHandler.bounce, 4000);
    }, 1000);
  },
  //初始化
  pageHtml: function () {

    var id = promotion.getUrlParam("gameId");
    console.log(id);
    if (id) {
      detailHandler.gameId = id
      var params = {
        gameEventId: id
      };

      promotion.ajax(API.gameDetail, params, function (data) {

        promotion.ajaxLoading("end");

        if (data.code === 0) {

          var obj = data.result;
          var stks = data.result.gameStk;

          detailHandler.time = data.result.time;

          var htmls = detailHandler.advertHtml() + detailHandler.headerHtml(obj) + detailHandler.infoHtml(obj) + detailHandler.progressHtml(obj) + detailHandler.btnsHtml(obj) + detailHandler.listHtml(stks);

          $("#main").html(htmls).fadeIn(250);

          detailHandler.stkLike();
          //detailHandler.showAdvert();2015.11.13暂停
          detailHandler.isLookAd();
          detailHandler.guosenAdvert();
          detailHandler.isLookGuosen(obj);
          detailHandler.showCourse();
          detailHandler.showStkInfo(obj);
          detailHandler.countdown();
          detailHandler.scrollBtnFixed();
          detailHandler.weixinShare(); //微信分享
          detailHandler.needRefreshData(obj); //是否刷新
          detailHandler.autoAttention(obj); //没关注弹出二位码
          detailHandler.defineShareContent(obj); //自定义分享
          //detailHandler.advertAnimate();//广告动画2015.11.13暂停

          var detailLayer = detailHandler.layer()

          var showEndpop = localStorage.getItem(params.gameEventId)
          if (obj.gameStatus === 2 && obj.isJoin === 1 && !showEndpop) { // 用户已参加的比赛如果结束 并且当前这轮的比赛页面是首次进入才显示结果弹框
            detailHandler.endpop(params)
            localStorage.setItem(params.gameEventId, 'true')
          }
          else {
            detailHandler.bounce()
            detailLayer.firstShow()
          }
        }
      }, promotion.ajaxFail);
    }
  },

  //详情页推广html
  advertHtml: function () {

    return template('detail/advert', {});
  },

  //渲染header
  headerHtml: function (obj) {
    return template('detail/header', obj);
  },

  //渲染info
  infoHtml: function (obj) {
    var data = {
      date: promotion.competitionDate(promotion.checkDate(obj.startDate), promotion.checkDate(obj.endDate)),
      status: detailHandler.statusHtml(obj.gameStatus, obj.time)
    };
    return template('detail/info', data);
  },

  //倒计时
  countDownHtml: function (s) {

    s = (s > 0) ? s : 0;

    var dm = 24 * 60 * 60 * 1000;
    var hm = 60 * 60 * 1000;
    var mm = 60 * 1000;

    var days = parseInt(s / dm, 10);
    var hours = parseInt((s / hm), 10);
    var minutes = parseInt((s / mm) % 60, 10);
    var seconds = parseInt((s / 1000) % 60, 10);

    function format(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    }

    var time = {
      hours: format(hours),
      minutes: format(minutes),
      seconds: format(seconds)
    };

    return template('detail/countdown', time);
  },

  //执行倒计时
  countdown: function () {
    if ($(".countdown").length) {

      detailHandler.iTimer = setInterval(function () {

        if (detailHandler.time > 1000) {

          detailHandler.time -= 1000;

          $(".countdown").html(detailHandler.countDownHtml(detailHandler.time));

        } else {
          $(".countdown").html(detailHandler.countDownHtml(0));
          clearTimeout(detailHandler.iTimer);
        }

      }, 1000);
    }
  },

  //赛事状态
  statusHtml: function (s, t) {
    var data = {
      s: s,
      t: detailHandler.countDownHtml(t)
    };
    return template('detail/status', data);
  },

  //渲染参与人数占比
  progressHtml: function (obj) {
    var data = {
      width: detailHandler.scaleWidth(obj.num, obj.limitNum),
      num: obj.num,
      limitNum: obj.limitNum
    }
    return template('detail/progress', data);
  },

  //按钮
  btnsHtml: function (obj) {
    var data = {
      obj: obj,
      gameId: promotion.getUrlParam("gameId"),
      qnPageVersion: qnPageVersion
    }
    return template("detail/btns", data);
  },

  //个股
  trHtml: function (obj) {
    console.log(obj);
    if (obj) {
      obj = this.goChange(obj);
      var data = {
        obj: obj,
        stkName: obj.stkName.substr(0, 4),
        changePct: (typeof obj.changePct === "number"),
        stkColor: promotion.stkColor(obj.changePct),
        formatPercent: promotion.formatPercent(obj.changePct, 2, true),
        rcmdYield: promotion.formatPercent(obj.rcmdYield, 0),
        userName: obj.userName.substr(0, 4)
      };
      return template('detail/tr', data);
    }
  },

  //个股列表
  listHtml: function (arr) {

    var htmls = template('detail/list', {});
    for (var i = 0; i < arr.length; i++) {
      htmls += this.trHtml(arr[i]);
    }

    htmls += '</tbody></table></div>';

    return htmls;
  },

  //计算参赛进度条
  scaleWidth: function (n, m) {

    if (!m) {
      return '0%';
    } else {
      return ((n / m).toFixed(4) * 100) + "%";
    }
  },

  //点赞
  stkLike: function () {

    return false;
    $("td.like-box").on("click", function (e) {

      var $this = $(this);
      e.stopPropagation();

      var likeObj = $(this).find(".icon-like");
      var stkId = likeObj.parents("tr").attr("id");
      var likeNum = parseInt(likeObj.siblings("em").text());

      var params = {
        gameStkId: stkId
      };

      promotion.ajax(API.stkLike, params, function (data) {

        if (data.code === 0) {

          likeObj.removeClass("icon-like").addClass("icon-likefill");
          likeObj.siblings("em").text(likeNum + 1);
          $this.unbind("click");

        } else {

          dialog.warnPop(data.message);

        }
      }, promotion.ajaxFail);
    });
  },

  //查看红包广告弹窗
  showAdvert: function () {

    $("#advertOne").on("click", function (e) {

      e.stopPropagation();

      var html = $("#advertHtml").html();

      dialog.commPop("advertView", function () {

        $("#advertView").empty().append(html).fadeIn();

      });

      detailHandler.isLook = true;
    });
  },

  //开户广告
  guosenAdvert: function () {

    $("#advertTwo").on("click", function (e) {

      e.stopPropagation();

      var html = $("#guosenHtml").html();

      dialog.commPop("advertView", function () {

        $("#advertView").empty().append(html).fadeIn();

        setTimeout(function () {

          $(".close-style-1").fadeIn();

        }, 2000);

      });
    });
  },

  //是否查看了广告
  isLookAd: function () {
    setTimeout(function () {
      if (!detailHandler.isLook) {
        $("#advert").animate({
          fontSize: "0.10rem"
        }, 300).animate({
          fontSize: "0.18rem"
        }, 200).animate({
          fontSize: "0.10rem"
        }, 110).animate({
          fontSize: "0.14rem"
        }, 78);
      }
    }, 3000);
  },

  //第一次进来弹出广告
  isLookGuosen: function (obj) {
    if (window.localStorage) {

      var storage = window.localStorage;

      if (storage.getItem("qnAdGuosen") != "20151128" && obj.gameStatus === 2) {
        $("#advertTwo").trigger("click");
        storage.setItem("qnAdGuosen", "20151128");
      }
    }
  },

  //广告轮播
  advertAnimate: function () {

    var items = $("#advert a");
    var height = $("#advert").height();
    var len = items.length;
    var f = 0;
    var s = 1;

    for (var i = 0; i < len; i++) {
      items.eq(i).css("top", i * height);
    }

    setInterval(function () {

      items.eq(f).animate({
        top: -height
      }, 500, function () {
        items.eq(f).css("top", height);
      });
      items.eq(s).animate({
        top: 0
      }, 500, function () {
        items.eq(s).css("top", height);
      });

      if (f === 0) {
        f = 1;
        s = 0;
      } else {
        f = 0;
        s = 1;
      }

    }, 4500);

  },

  //查看比赛规则
  showCourse: function () {

    var $box = $('#dialogCourse')
    var html = $box.html();

    $("#course").on("click", function (e) {

      e.stopPropagation();

      dialog.commPop("_dialogCourse", function () {

        $('#_dialogCourse').html(html).fadeIn();

      });
    });

    detailHandler.newUserNotice();
  },

  //下注弹框
  showStkInfo: function (obj) {

    var gameStatus = obj.gameStatus

    var Pop = function (data) {
      console.log(data)
      this.popId = 'stkInfoView'
      this.data = data
      if (gameStatus > 0) {
        this.data.isCanBet = 0
      }
      this.$pop = null
      this.$input = null
      this.tips = {
        not: '余额不足, 请先充值牛币',
        error: '请先添加牛币',
        success: '成功下注',
        max: '鸡蛋不要放在一个篮子里 每天最多押注30牛币哦'
      }
      this.count = 0   // 次数
      this.value = 10  // 每次加多少牛币
      this.max = 30    // 最多能加多少牛币
      this.betStatus = true
      return this
    }

    Pop.prototype = {
      init: function () {
        dialog.commPop(this.popId, this.render.bind(this))
      },
      render: function () {
        this.$pop = $("#" + this.popId)
        this.$pop.html(detailHandler.stkInfoHtml(this.data)).fadeIn().on('click', function (e) {
          if (e.target.id === this.popId) {
            dialog.remove()
          }
        }.bind(this))
        this.$input = this.$pop.find('.handleinput')
        this._events()
      },
      _events: function () {
        // 显示更多理由
        $('#J_moreReason').on('click', function () {
          var $cause = $(this).find('.cause')
          if ($cause.hasClass('open')) {
            $cause.removeClass('open')
          }
          else {
            $cause.addClass('open')
          }
        })
        if (this.data.isCanBet === 0) return false
        this.$pop.on('click', function (e) {
          var type = $(e.target).attr('data-type')
          this[type] && this[type]();
        }.bind(this))
      },
      add: function () {
        var totalNums = Math.floor(this.data.balAmount / this.value)
        if (this.count >= this.max / this.value) {
          detailHandler.message(this.tips.max)
          return false
        }
        if (!this.data.balAmount || totalNums <= this.count) {
          detailHandler.message(this.tips.not)
          return false
        }
        this.count++
        this.$input.text(this.count * this.value)
      },
      reduce: function () {
        if (!this.data.balAmount) {
          detailHandler.message(this.tips.not)
          return false
        }
        if (this.count <= 0) {
          return false
        }
        this.count--
        this.$input.text(this.count * this.value)
      },
      deposit: function () {
        location.href = 'deposit.html?v=' + promotion.timeStamp
      },
      bet: function () {
        if (!this.betStatus) return false
        this.betStatus = false
        var val = +parseInt(this.$input.text(), 10)
        if (val <= 0) {
          detailHandler.message(this.tips.error)
          return false
        }
        promotion.ajax(API.saveGameBet, {
          reqId: detailHandler.reqId,
          gameStkId: this.data.gameStkId,
          amount: val
        }, function (data) {
          if (data.code === 0) {
            detailHandler.message(this.tips.success, 2000, function () {
              location.reload()
            })
            this.betStatus = false
          }
          else {
            detailHandler.message(data.message)
            this.betStatus = true
          }
        }.bind(this), promotion.ajaxFail)
      }
    }

    //if(gameStatus === 2) { // 比赛结束, 不能下注
    //  return false
    //}

    $("#J_listBody").find('tr').on("click", function (e) {

      e.stopPropagation();

      //if(gameStatus === 1){
      //  //detailHandler.message('比赛进行中, 无法下注')
      //  return false
      //}
      //if(gameStatus === 3){
      //  //detailHandler.message('比赛发起失败, 无法下注')
      //  return false
      //}

      var stkId = $(this).attr("id")

      promotion.ajax(API.stkDetail, {gameStkId: stkId}, function (data) {

        if (data.code === 0) {

          new Pop(data.result).init()

        } else {

          dialog.warnPop(data.message);

        }

      }, promotion.ajaxFail);
    });

  },

  // 结束弹框
  endpop: function (obj) {

    var pop = function (data) {

      var
        id = 'endpop',
        _data = {
          isWinner: data.isWinner, // 是否股神
          userName: data.userName, // 股神昵称
          rcmdYield: data.rcmdYield,// 荐股收益
          betYield: data.betYield, // 买码收益
          rmb: data.rmb === null ? 0 : data.rmb   // 牛币换算人名币
        }

      dialog.commPop(id, function () {

        var $pop = $("#" + id)

        // 文字动画
        function textAnimate() {
          var
            $items = $('#J_text').find('p'),
            time = null,
            i = 0,
            nums = $items.length
          time = setInterval(function () {
            if (i === nums) {
              clearInterval(time)
            }
            else {
              $items.eq(i).removeClass('hidden').addClass('fadeInUp animated')
              i++
            }
          }, 300)
        }

        // 按钮点击
        function btnHandle() {
          var msg = {
            title: "我在玩【股神来了】群友荐股比赛.赢了" + _data.rmb + "元红包！不服你来一战。",
            desc: '',
            link: '',
            imgUrl: ''
          }
          if (_data.isWinner) {
            promotion.wxShareNotice()
            promotion.wechatShow(false, msg.title, msg.desc, msg.link, msg.imgUrl)
          }
          else {
            location.href = 'create.html?ver=' + promotion.timeStamp
          }
        }

        $pop.html(detailHandler.endpopHtml(_data)).fadeIn(200, textAnimate)
        $pop.find('.handlebtn').on('click', btnHandle)
        $pop.click(dialog.remove)
      })
    }

    // 获取赛事结果数据
    promotion.ajax(API.fetchGameResult, {gameEventId: obj.gameEventId}, function (data) {
      pop(data.result)
    }, promotion.ajaxFail)
  },

  // 结束弹框html
  endpopHtml: function (data) {
    return template('detail/endpop', data);
  },

  //个股详情html
  stkInfoHtml: function (obj) {
    var data = {
      obj: obj,
      newPrice: promotion.formatPrice(obj.price),
      dayChange: promotion.formatPercent(obj.tChangePct, 2),
      price: promotion.formatPrice(promotion.isHave(obj.cfmPrice)),
      pct: promotion.formatPercent(obj.changePct, 2),
      dayclass: promotion.stkColor(obj.tChangePct),
      pctclass: promotion.stkColor(obj.changePct)
    };
    return template('detail/stkinfo', data);
  },

  //滚动固定按钮
  scrollBtnFixed: function () {

    if ($(".d-submit-wrap").length) {

      var wrap = $(".d-submit-wrap");
      var box = $(".d-submit-box");
      var height = wrap.offset().top;
      var mheight = wrap.height();
      var theight = height + mheight;
      var fixTimer;

      $(document).on("scroll", function () {

        var scrollHright = $(document).scrollTop();

        clearTimeout(fixTimer);

        if (box) {

          if (scrollHright > theight) {

            fixTimer = setTimeout(function () {
              box.addClass("fixed");
              box.css("top", -mheight);
              box.animate({
                top: 0
              }, 500);
            }, 100);
          }
        }
      });

      function touchStart(event) {
        box.css("top", -mheight);
        box.removeClass("fixed");
      }

      document.getElementById("dList").addEventListener("click", touchStart, false);

    }
  },

  //分享，召集来赛
  weixinShare: function () {

    if ($("#shareBtn")) {
      $("#shareBtn").on("click", promotion.wxShareNotice);
    }

    if ($("#attentionBtn")) {
      $("#attentionBtn").on("click", promotion.wxAttention);
    }

  },

  //自定义分享
  defineShareContent: function (obj) {

    if (obj.gameStatus === 0) {
      var differ = parseInt(obj.limitNum, 10) - parseInt(obj.num)
      window.dd = obj
      var title = '我在玩【股神来了】群友荐股比赛.荐股pk,收益变红包！【还差' + differ + '人,帮我满上】';
      var shareObj = {
        'differ': differ,
        'game': obj.gameName,
        'user': obj.userName,
        'time': promotion.competitionDate(promotion.checkDate(obj.startDate), promotion.checkDate(obj.endDate))
      }
      var desc = template('detail/share', shareObj)
      var link = document.location.protocol + '//' + window.location.host + '/gs_api/oauth2API?redirectType=share_type&gameId=' + promotion.getUrlParam("gameId");
      var imgUrl = document.location.protocol + '//' + window.location.host + '/static/promotion/2015901/images/pic_share.jpg';

      promotion.wechatShow(false, title, desc, link, imgUrl);

    } else if (obj.gameStatus === 1) {

      var title = '我在玩【股神来了】群友荐股比赛.荐股pk,收益变红包!【下注押我赢,押对赢牛币】';
      var desc = '【下注押我赢,押对分牛币】“股神来了”帮你寻找朋友圈的真股神，速来参赛争夺百万微信红包！';
      var link = document.location.protocol + '//' + window.location.host + '/gs_api/oauth2API?redirectType=share_type&gameId=' + promotion.getUrlParam("gameId");
      var imgUrl = document.location.protocol + '//' + window.location.host + '/static/promotion/2015901/images/pic_share.jpg';

      promotion.wechatShow(false, title, desc, link, imgUrl);
    } else {
      var differ = null
      window.dd = obj
      promotion.ajax(API.fetchGameResult, {gameEventId: detailHandler.gameId}, function (data) {
        detailHandler.bonus = data.result.rmb || 0
        var title = '我在玩【股神来了】群友荐股比赛.赢了'+detailHandler.bonus+'元红包!不服你来一战.';
        var shareObj = {
          'differ': differ,
          'game': obj.gameName,
          'user': obj.userName,
          'time': promotion.competitionDate(promotion.checkDate(obj.startDate), promotion.checkDate(obj.endDate))
        }
        var desc = template('detail/share', shareObj)
        var link = document.location.protocol + '//' + window.location.host + '/gs_api/oauth2API?redirectType=share_type&gameId=' + promotion.getUrlParam("gameId");
        var imgUrl = document.location.protocol + '//' + window.location.host + '/static/promotion/2015901/images/pic_share.jpg';

        promotion.wechatShow(false, title, desc, link, imgUrl);
      }, promotion.ajaxFail)


    }
  },

  //没关注自动弹出关注弹窗
  autoAttention: function (obj) {

    if (obj) {
      if (obj.gameStatus === 0 || obj.gameStatus === 1) {
        if (obj.isJoin === 1 && obj.subscribe === 0) {
          $("#attentionBtn").trigger("click");
        }
      }
    }
  },

  //新用户弹出提示
  newUserNotice: function () {

    var type = promotion.getUrlParam("userType");

    if (type === "new" && detailHandler.userType) {

      detailHandler.userType = false;

      $("#course").trigger("click");
    }
  },

  //刷新股票数据
  refreshDatas: function () {

    //先清除倒计时定时器
    if (detailHandler.iTimer) {
      clearInterval(detailHandler.iTimer);
    }

    var id = promotion.getUrlParam("gameId");

    if (id) {
      var params = {
        gameEventId: id
      };

      promotion.ajax(API.gameDetail, params, function (data) {

        if (data.code === 0) {

          var obj = data.result;
          var stks = data.result.gameStk;

          detailHandler.time = data.result.time;

          var htmls = detailHandler.advertHtml() + detailHandler.headerHtml(obj) + detailHandler.infoHtml(obj) + detailHandler.progressHtml(obj) + detailHandler.btnsHtml(obj) + detailHandler.listHtml(stks);

          $("#main").empty().append(htmls);

          detailHandler.stkLike();
          //detailHandler.showAdvert();2015.11.13暂停
          detailHandler.guosenAdvert();
          detailHandler.showCourse();
          detailHandler.showStkInfo(obj);
          detailHandler.countdown();
          detailHandler.scrollBtnFixed();
          detailHandler.weixinShare();
          detailHandler.needRefreshData(obj);
          detailHandler.layer();
          //detailHandler.advertAnimate();//广告动画2015.11.13暂停
        }
      }, promotion.ajaxFail);
    }
  },

  //判断是否刷新
  needRefreshData: function (obj) {

    if (obj.gameStatus === 0 || obj.gameStatus === 1) {

      //return;
      detailHandler.tTimer = setTimeout(detailHandler.refreshDatas, 10000);

    } else {

      clearTimeout(detailHandler.tTimer);
    }
  },

  //蒙层
  layer: function () {
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

    $marking.on('click', toggler)
    $openLayer.on('click', toggler)
    return {
      toggle: toggler,
      firstShow: function () {
        try {
          first = localStorage.getItem('DETAILFIRST')
          if (!first) {
            toggler()
            localStorage.setItem('DETAILFIRST', 'true')
          }
        }
        catch (err) {
        }
      }
    }
  },

  //message
  message: function (text, time, callback) {
    var $message = $('.com-message')
    if ($message.length) {
      $message.remove()
    }
    $message = $('<div class="com-message" style="display:none">' + '<span>' + text + '</span>' + '</div>')
    $('body').append($message)
    $message.fadeIn(250)
    setTimeout(function () {
      $message.fadeOut(250, function () {
        $message.remove()
        callback && callback()
      })
    }, time || 2000)
  }
};

$(document).ready(function () {
  detailHandler.reqId = promotion.onlyNum();
  detailHandler.pageHtml();

});
