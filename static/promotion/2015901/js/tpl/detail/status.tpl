{{if s == 0 }}
<dt >等待开赛：</dt>
<dd class="countdown">{{#t}}</dd>
{{else if s == 1 }}
<dt class="start">激战正酣：</dt>
<dd class="countdown">{{#t}}</dd>
{{else if s == 2}}
<dt class="one-line">比赛结束</dt>
{{else if s == 3}}
<dt class="start one-line">发起失败</dt>
{{/if}}
