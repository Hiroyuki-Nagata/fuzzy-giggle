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

    <div class="col-xs-12">
      <!-- <chart-card :chart-data="usersChart.data" :chart-options="usersChart.options"> -->
      <!--   <h4 class="title" slot="title">Users behavior</h4> -->
      <!--   <span slot="subTitle"> 24 Hours performance</span> -->
      <!--   <span slot="footer"> -->
      <!--     <i class="ti-reload"></i> Updated 3 minutes ago</span> -->
      <!--   <div slot="legend"> -->
      <!--     <i class="fa fa-circle text-info"></i> Open -->
      <!--     <i class="fa fa-circle text-danger"></i> Click -->
      <!--     <i class="fa fa-circle text-warning"></i> Click Second Time -->
      <!--   </div> -->
      <!-- </chart-card> -->
    </div>

    </div>

  </div>
</template>
<script>
  import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
  export default {
    components: {
      StatsCard,
      ChartCard
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
        ]
      }
    }
  }

</script>
<style>

</style>
