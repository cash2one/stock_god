<div class="de-header">我的牛币<span class="text-orange">{{ balAmount }}</span></div>
<!-- 充值 -->
<div class="de-container">
  {{each datas as item}}
  <a href="javascript:void(0);" class="de-goods" data-id="{{ item.priceId }}">
    <div class="goods-name">{{ item.amount }}<span>牛币</span></div>
    <div class="goods-price">{{ item.price }}元</div>
  </a>
  {{/each}}
</div>
