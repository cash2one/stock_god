<div class="simple-wrap endpop" style="background: none">
  <div class="{{if isWinner}}win{{else}}fail{{/if}} endpop-head"></div>
  <div class="padding">
    {{if isWinner}}
      <h4 class="text-yellow text-size-24 text-center title">恭喜你成为股神</h4>
    {{else}}
      <h4 class="text-white text-size-24 text-center title">惜败</h4>
    {{/if}}
    <div id="J_text" class="ui-box ui-col-9" style="float: none">
      {{if isWinner === 0}}
        <p class="text-size-12 ui-row hidden">本场股神: {{userName}}</p>
      {{/if}}
      <p class="text-size-12 ui-row hidden">
      <span class="float-left">荐股收益</span>
      <span class="float-right align-niubi"><i class="icon-niubi"></i>
      {{if rcmdYield > 0}}
      +{{rcmdYield}}牛币
      {{else}}
      {{rcmdYield}}牛币
      {{/if}}
      </span>
      </p>
      {{if isWinner}}
        <p class="text-size-12 text-red msg hidden">(兑换一起牛红包{{rmb}}元)</p>
      {{/if}}
      <p class="text-size-12 ui-row hidden"><span class="float-left">买码收益</span><span class="float-right"><i class="icon-niubi"></i>
      {{if betYield> 0}}
      +{{betYield}}牛币
      {{else}}
      {{betYield}}牛币
      {{/if}}</span></p>
    </div>
    <a href="javascript:void(0);" class="btn width-xl-12 handlebtn">
      {{if isWinner}}
        签收并嘚瑟一下
      {{else}}
        不服，再来一局
      {{/if}}
    </a>
  </div>
</div>
