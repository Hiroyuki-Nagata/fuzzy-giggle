import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'スプレッドシート',
      icon: 'ti-layout-grid4',
      path: '/admin/spreadsheet'
    },
    {
      name: 'データソース',
      icon: 'ti-server',
      path: '/admin/data-src'
    },
    {
      name: '定型ジョブ',
      icon: 'ti-agenda',
      path: '/admin/template-job'
    },
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/admin/overview'
    },
    {
      name: 'User Profile',
      icon: 'ti-user',
      path: '/admin/stats'
    },
    {
      name: 'Table List',
      icon: 'ti-view-list-alt',
      path: '/admin/table-list'
    },
    {
      name: 'Typography',
      icon: 'ti-text',
      path: '/admin/typography'
    },
    {
      name: 'Icons',
      icon: 'ti-pencil-alt2',
      path: '/admin/icons'
    },
    {
      name: 'Maps',
      icon: 'ti-map',
      path: '/admin/maps'
    },
    {
      name: 'Notifications',
      icon: 'ti-bell',
      path: '/admin/notifications'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
