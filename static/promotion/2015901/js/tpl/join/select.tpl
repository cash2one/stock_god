{{each list}}
<option
  {{ if (select_value == $index*2)  }} selected
  {{/if}}
  {{ if select_value > 100 && $index*2==100 }} selected
  {{/if}}
value="{{$index*2}}">{{$index*2}}牛币</option>
{{/each}}