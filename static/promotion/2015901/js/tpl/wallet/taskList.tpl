<section class="w-task-wrap">
  <div class="task-thead">
    做任务 赚牛币
  </div>
  <div class="task-tbody">
    {{each datas as item}}
    <a href="{{if item.url !=null && item.url !='' }}{{item.url}}{{else}}javascritp:void(0);{{/if}}" class="task-tr clearfix icon-{{item.taskType}}">
      <div class="left">
        <h2>{{ item.name }}</h2>
        <span>{{ item.taskDesc }}</span>
      </div>
      <div class="right">
        <span class="btn">+{{item.amount }}牛币</span>
      </div>
    </a>
    {{/each}}
  </div>
</section>
