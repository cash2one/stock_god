<header class="de-advert" id="deAdvertWrap">
  <div class="swiper-pagination" id="adCtrls">
    <!-- 控制圆点 -->
  </div>
  <div class="swiper-wrapper" id="adImages">
    {{each datas as item}}
    <div class="swiper-slide">
        <a href="{{ item.adUrl }}" style="background-image:url({{ item.adImg }})"></a>
    </div>
    {{/each}}
  </div>
  <a href="javascript:;" class="swiper-button-next" id="btn_prev"></a>
  <a href="javascript:;" class="swiper-button-prev" id="btn_next"></a>
  <!-- 这里是广告图片 -->
</header>
