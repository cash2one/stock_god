<div class="simple-wrap stk-info">
  <div class="ui-row padding userBox">
    <div class="ui-col-3">
      <div class="gravatar">
        <img src="{{obj.userIcon}}">
      </div>
    </div>
    <div id="J_moreReason" class="ui-col-9">
      <div class="name text-size-14 text-white">{{obj.userName}}</div>
      <div class="cause text-size-12">{{if obj.reason}}{{obj.reason}} <s class="arrow"></s> {{else}}TA什么都没有说{{/if}}</div>
    </div>
  </div>
  <ul class="clearfix">
    <li>
      <dl>
        <dt class="text-size-16 text-white">{{obj.stkName}}</dt>
        <dd><span class="v-small-text">{{obj.stkCode}}</span></dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt class="text-size-16">{{newPrice}}</dt>
        <dd><span
          class="{{dayclass}} text-size-12">{{dayChange}}</span>
        </dd>
      </dl>
    </li>
  </ul>
  <ul class="clearfix">
    <li>
      <dl>
        <dt class="text-size-12">成交价(元)</dt>
        <dd><span class="text-green text-size-14">{{price}}</span></dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt class="text-size-12">盈亏</dt>
        <dd><span
          class="{{pctclass}} text-size-14">{{pct}}</span>
        </dd>
      </dl>
    </li>
  </ul>
  <div class="ui-box text-center">
    <i class="icon-niubi"></i>余额：<span class="text-yellow">{{obj.balAmount}}</span>牛币
    &nbsp;已下注：<span class="text-yellow">{{obj.amount}}</span>牛币
  </div>
  <div class="ui-box-p text-center">
    <div class="quantity-form">
      <a data-type="reduce" class="minus-btn handlebtn">-</a>
      <span class="handleinput">0</span>
      <a data-type="add" class="plus-btn handlebtn">+</a>
    </div>
  </div>
  <div class="padding text-center">
    <a data-type="deposit" href="javascript:void(0);" class="btn blue handlebtn">充值牛币</a>
    <a data-type="bet" href="javascript:void(0);" class="btn handlebtn {{if obj.isCanBet == 0 || obj.gameStatus > 0}}disabled{{/if}}">下注押他赢</a>
  </div>
</div>
