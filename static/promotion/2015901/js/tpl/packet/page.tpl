{{if isBind }}
<div class="p-header">成功领取红包</div>
<div class="p-main">
    <p>
    您的红包<span>{{ yuan }}</span>元
    <br/>
    已发放到一起牛钱包
    </p>
    <img src="../../../static/promotion/2015901/images/packet_guide.png" alt=""/>
    <a class="p-btn">去一起牛提现</a>
</div>
<div class="p-note"></div>
{{ else }}
<div class="p-header">领取红包需要先绑定一起牛</div>
<div class="p-main">
    <p>
    可提取红包<span>{{ yuan }}</span>元
    </p>
    <a class="p-btn">绑定一起牛账号</a>
</div>
{{ /if }}