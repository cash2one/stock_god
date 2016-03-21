{{ if isCreate }}
        <div id="j-create" class="j-header-title"><h3>发起<span class="text-yellow">股神来了</span>荐股比赛</h3></div>

{{ else }}
        <div id="j-no-create">
          <h3 class='j-game-name'><span class="text-yellow">{{ eventName }}</span></h3>
          <div class='j-user-name'><span>{{ userName  }}&nbsp;</span>前来参赛</div>
        </div>
{{ /if }}