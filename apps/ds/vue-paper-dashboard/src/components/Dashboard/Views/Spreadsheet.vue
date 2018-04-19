<template>
  <div>
    <!-- Stats cards-->
    <div class="row">
      <div class="col-lg-6 col-sm-12" v-for="stats in statsCards">
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

    <div id="drop"
         draggable="true"
         @drop="handleDrop($event)"
         @dragover="handleDragover($event)"
         @dragenter="handleDragover($event)" class="col-xs-12">
      <p>ここにExcelをドラッグ＆ドロップ</p>

      <!-- spreadsheet book -->
      <vue-tabs @tab-change="handleTabChange">
        <v-tab v-bind:title="tab" ref="tabsRef" v-for="(tab,index) in tabs">
          <div class="pre-scrollable">
            <hot-table v-bind:settings="hotSheets[index]"/>
          </div>
        </v-tab>
      </vue-tabs>
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
          icon: 'ti-stats-up',
          title: 'サマリ',
          value: '',
          footerText: 'ファイル:',
          footerIcon: 'ti-comment'
        },
        {
          type: 'info',
          icon: 'ti-export',
          title: 'エクスポートする',
          value: '',
          footerText: '全体 or 選択範囲をエクスポートする',
          footerIcon: 'ti-help-alt'
        }
      ],
      tabs: [],
      hotSheets: []
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
      for (var i = 0, f = files[i]; i !== files.length; ++i) {
        var reader = new FileReader()
        // function will be called after loaded the file
        reader.onload = (function (file, parent) {
          console.log('Excel book: ' + file.name)
          parent.statsCards[0].footerText = 'ファイル: ' + file.name
          return function (e) {
            var data = e.target.result
            var fixedData = parent.fixdata(data)
            var workbook = XLSX.read(btoa(fixedData), {type: 'base64'})

            // Set tab names
            parent.tabs = workbook.SheetNames
            // Set cells
            workbook.SheetNames.forEach(
              (name, idx) => {
                var mat = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, raw: true })
                var col = Math.max.apply(null, mat.map((row) => { return row.length }))
                console.log('Sheet: ' + name + ', ' + mat.length + '行, ' + col + '列')
                // Padding each row doesn't have max size (col) with 'empty'
                var paddingMatrix = mat.map((row) => {
                  var rowLength = row.length
                  if (row.length < col) {
                    return row.concat(new Array(col - rowLength))
                  } else {
                    return row
                  }
                })
                parent.statsCards[0].value = mat.length + '行, ' + col + '列'
                parent.hotSheets.push(
                    {data: paddingMatrix, readOnly: true, rowHeaders: true, colHeaders: true, contextMenu: true}
                )
              }
            )
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
    },
    handleTabChange: function (tabIndex, newTab, oldTab) {
      this.statsCards[0].value = this.hotSheets[tabIndex].data.length + '行, ' + this.hotSheets[tabIndex].data[0].length + '列'
      // console.log(this.$refs.tabsRef[tabIndex].$el)
      // this.$refs.tabsRef[tabIndex].$el.focus()
    }
  }
}

</script>

<style src="../../../../node_modules/handsontable/dist/handsontable.full.min.css"></style>
<style>
  #drop{
  border: 2px dashed #bbb;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      padding: 25px;
      text-align: center;
      // font: 20pt bold,"Vollkorn";
      // color: #bbb;
  }
</style>
