<tr id="{{obj.gameStkId}}" data-name="{{obj.userName}}">
  <td class="name">
    <span class="stk-name"><span class="ellipsis">{{stkName}}</span>{{if obj.hasReason}}<em></em>{{/if}}</span><span
    class="text-blue">{{obj.stkCode}}</span>
  </td>
  <td class="text-center">
    <span class="inc text-center {{if changePct}}right{{else}}center{{/if}} {{stkColor}}
    ">{{formatPercent}} </span>
  </td>
  <td class="name text-center">
    <span class="stk-person text-center d-col-3"><span class="ellipsis">{{userName}}  {{if obj.isBet}} <i class="icon-yazhu"></i>{{/if}}</span> {{if obj.isPrize}}<i>获奖</i>{{/if}}</span>
    <span class="text-blue text-center">{{ rcmdYield }}</span>
  </td>
  <td class="{{if obj.isLike}}{{else}}like-box{{/if}}"><i class="icon-niubi"></i><em> {{obj.amount}}</em>
  </td>
</tr>
