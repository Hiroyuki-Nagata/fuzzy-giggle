<template>
  <div id="hot-preview">
    <hot-table :root="root" :settings="hotSettings"></hot-table>
  </div>
</template>

<script>
  import HotTable from '@handsontable/vue' // or `import HotTable from '@handsontable-pro/vue';` for the Pro version
  // import Vue from 'vue';

  export default {
    name: 'hot-table',
    data: function () {
      return {
        root: 'test-hot',
        hotSettings: {
          data: [['sample', 'data']],
          colHeaders: true
        }
      }
    },
    components: {
      HotTable
    }
  }
</script>

<style src="../../../node_modules/handsontable/dist/handsontable.full.css"></style>
<style>
  #test-hot {
    width: 600px;
    height: 400px;
    overflow: hidden;
  }
</style>
