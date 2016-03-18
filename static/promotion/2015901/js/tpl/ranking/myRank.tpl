<!-- 我的排名 -->
<div class="r-own">
  <!-- item-header -->
  <div class="own-header">
    <h2>我的排名：第<span class="text-orange">{{myrank}}</span>名</h2>
  </div>
  <!-- item-info -->
  <dl class="own-content clearfix">
    <dt class="gravatar">
      <img src="{{icon}}">
    </dt>
    <dd class="r-name">
      <h2>{{username}}</h2>
      <span>{{#title}}</span>
    </dd>
    <dd class="r-yield">
      <h2>推荐胜率</h2>
      <span>{{rcmdYield}}</span>
    </dd>
    <dd class="r-yield r-gain">
      <h2>累计收益</h2>
      <span>{{totalYield}}</span>
    </dd>
  </dl>
</div>
