<header class="h-header">
  <div class="gravatar">
    <img src="{{ userIcon }}">
  </div>
  <div class="info no-gamenum">
    <h3>{{ userName }}</h3>

    <p>参加了<em class="text-orange"> {{ gameNum }} </em>场比赛</p>

    {{if preferIndu || preferExchange }}
    <div class="like-cate">投资偏好
      <span class="text-yellow">{{ preferIndu }}</span>
      <span class="text-blue">{{ preferExchange }}</span>
    </div>
    {{/if}}

    {{if preferStk }}
    <div class="like-stk">
      {{each preferStk as item}}
        <span>{{item}}</span>
      {{/each}}
    </div>
    {{/if}}
  </div>
</header>
