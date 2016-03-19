{{if isBind }}
<div class="p-header">成功领取红包</div>
<div class="p-main">
    <p>
    您的红包<span>{{ yuan }}</span>元
    <br/>
    已发放到一起牛钱包
    </p>
    <img class='p-guide-img' src="../../../static/promotion/2015901/images/packet_guide.jpg" alt=""/>
    <a class="p-btn">去一起牛提现</a>
</div>
{{ else }}
<div class="p-header">领取红包需要用一起牛绑定微信</div>
<div class="p-main">
    <p>
    简单3步操作，即可领取
    <span>{{ yuan }}</span>元红包
    </p>
     <img src="../../../static/promotion/2015901/images/packet_bind.jpg" alt=""/>
     <a class="p-btn">绑定一起牛账号</a>
</div>
{{ /if }}