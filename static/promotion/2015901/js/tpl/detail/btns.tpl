{{if obj.gameStatus === 0}}
  {{if obj.isJoin === 0}}
    {{if obj.num < obj.limitNum}}
<div class="d-btn-wrap">
  <div class="d-btn-box"><a href="./join.html?type=add&gameId={{gameId}}" class="btn breathe percent-100">我要推荐股票</a>
  </div>
</div>
    {{else}}
 <div class="d-btn-wrap"><div class="d-btn-box"><a href="./create.html?ver={{qnPageVersion}}" class="btn breathe percent-100">我要发起比赛</a></div></div>
    {{/if}}
  {{else}}
    {{if obj.subscribe === 0}}
    <div class="d-btn-wrap"><div class="d-btn-box"><a href="javascript:void(0);" class="btn breathe percent-100" id="attentionBtn">了解实时赛况</a></div></div>
    {{else}}
  <div class="d-btn-wrap "><div class="d-btn-box "><a href="javascript:void(0);" class="btn breathe percent-100" id="shareBtn">召集朋友来赛</a></div></div>
    {{/if}}
  {{/if}}
{{else if obj.gameStatus ===1 }}
  {{if obj.isJoin === 0}}
  <div class="d-btn-wrap"><div class="d-btn-box"><a href="./create.html?ver={{qnPageVersion}}" class="btn breathe percent-100">我要发起比赛</a></div></div>
  {{/if}}

{{else if obj.gameStatus === 2}}
  {{if obj.isJoin === 1}}
    <div class="d-btn-wrap">
      <div class="d-btn-box">
        <a href="./create.html?ver={{qnPageVersion}}" class="btn blue fixed-140">再来一局</a>
        <!--<a href="javascript:void(0);" class="btn fixed-140" id="shareBtn">秀一下</a>-->
      </div>
    </div>
  {{/if}}
{{/if}}
