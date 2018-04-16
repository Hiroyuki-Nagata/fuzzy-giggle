<template>
  <div>

    <!--Charts-->
    <div class="row">

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="stats in statsCards">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <!-- div class="col-xs-12" -->
      <div id="hot-preview">
        <HotTable :settings="hotSettings"></HotTable>
      </div>
    <!-- /div-->

    </div>

  </div>
</template>
<script>
  import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
  import Handsontable from '../../../../node_modules/handsontable/dist/handsontable.min.js'
  import HotTable from '@handsontable/vue/vue-handsontable-ce.min.js'

  export default {
    components: {
      StatsCard,
      ChartCard,
      HotTable
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        statsCards: [
          {
            type: 'info',
            icon: 'ti-layout-grid4-alt',
            title: 'ファイルを選択',
            value: '',
            footerText: 'ここにファイルをドロップ',
            footerIcon: 'ti-upload'
          }
        ],
        hotSettings: {
          data: [['sample', 'data', 'this']],
          // Handsontable.helper.createSpreadsheetData(50, 50),
          colHeaders: true
        }
      }
    }
  }

</script>

<!-- <style src="../node_modules/handsontable/dist/handsontable.full.css"></style> -->
<style src="../../../../node_modules/handsontable/dist/handsontable.full.min.css"
<style>
</style>
