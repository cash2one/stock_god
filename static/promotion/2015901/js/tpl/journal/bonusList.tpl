{{ if first == 1 }}
    <div class="jo-thead">
      累计红包：<span>{{ totalBonus }}元</span>
    </div>
{{/if}}
    {{each datas as item}}
    <div class="jo-tr clearfix">
      <div class="left">
        <h2>{{item.desc}}
          {{if item.remark}}
          <span>&nbsp;(比赛: {{item.remark}})</span>
          {{/if}}
        </h2>
        <span>{{item.time | dateFormat:'yyyy-MM-dd hh:mm:ss' }}</span>
      </div>
      <div class="right">
        {{ if item.amount > 0}}
        <span>+{{ item.amount }} 元</span>
        {{else}}
        <span>{{ item.amount }} 元</span>
        {{/if}}
      </div>
    </div>
    {{/each}}
