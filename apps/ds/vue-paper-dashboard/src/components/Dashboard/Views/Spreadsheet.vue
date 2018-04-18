<template>
  <div>

    <!--Charts-->
    <div class="row">

    <!--Stats cards-->
    <div class="row">
      <div id="drop"
           draggable="true"
           @drop="handleDrop($event)"
           @dragover="handleDragover($event)"
           @dragenter="handleDragover($event)"
           class="col-lg-3 col-sm-6" v-for="stats in statsCards">
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
      <div id="hot-preview">
        <HotTable :settings="hotSettings"></HotTable>
      </div>
    </div>

    </div>

  </div>
</template>
<script>
import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
import HotTable from '@handsontable/vue/vue-handsontable-ce.min.js'
import XLSX from 'xlsx'

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
        data: [['サンプル', 'データ', 'だYO']],
        colHeaders: true
      } // ,
      // state: {
      //   tickets: [{name: 'test'}],
      //   headers: ['Test Header']
      // }
    }
  },
  methods: {
    /** HELPERS **/
    getHeaderRow: function (sheet) {
      var headers = []
      var range = XLSX.utils.decode_range(sheet['!ref'])
      var C = range.s.r /* start in the first row */
      var R = range.s.r /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
        var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    fixdata: function (data) {
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    workbook_to_json: function (workbook) {
      var result = {}
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
        if (roa.length > 0) {
          result[sheetName] = roa
        }
      })
      return result
    },
    /** PARSING and DRAGDROP **/
    handleDrop: function (e) {
      e.stopPropagation()
      e.preventDefault()
      console.log('DROPPED')
      var files = e.dataTransfer.files
      var i
      var f
      for (i = 0, f = files[i]; i !== files.length; ++i) {
        var reader = new FileReader()
        // function will be called after loaded the file
        reader.onload = (function (file, parent) {
          console.log('Excel book: ' + file.name)
          return function (e) {
            var data = e.target.result
            var fixedData = parent.fixdata(data)
            var workbook = XLSX.read(btoa(fixedData), {type: 'base64'})
            var firstSheetName = workbook.SheetNames[0]
            var worksheet = workbook.Sheets[firstSheetName]
            console.log('Sheet: ' + firstSheetName)
            // https://github.com/SheetJS/js-xlsx/issues/574
            var mat = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })
            parent.hotSettings.data = mat
          }
        })(f, this)
        // load file
        reader.readAsArrayBuffer(f)
      }
    },
    handleDragover: function (e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    }
  }
}

</script>

<style src="../../../../node_modules/handsontable/dist/handsontable.full.min.css"></style>
<style>
</style>
