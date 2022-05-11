import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Set Api
import { Api } from "@/utils/api";
Api.init(
  process.env.NODE_ENV === "production" ?
    "https://lookupguru.herokuapp.com/" :
    "http://localhost:3600/"
);

// I18n
import i18n from '@/utils/i18n'

// Vue Meta Mask
import VueMeta from 'vue-meta'
Vue.use(VueMeta)

// Clipboard
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// Tooltip
import VTooltip from 'v-tooltip'
Vue.use(VTooltip, {
  defaultHtml: true,
  trigger: "hover",
  defaultHideOnTargetClick: false
})

// Google Analytics
import VueAnalytics from 'vue-analytics';
if (process.env.NODE_ENV === "production") {
  Vue.use(VueAnalytics, {
    id: 'UA-89120054-6',
    router
  })
}

Vue.config.productionTip = false

new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
  metaInfo: {
    title: "Discord Search ID",
    titleTemplate: '%s - Lookup.Guru',
    meta: [
      { name: 'title', content: 'Discord Search ID - Lookup.Guru' },
      { name: 'description', content: 'Lookup.Guru is a free and open source Discord search engine. It allows you to search for Discord IDs and get information about them.' },
      { name: 'keywords', content: 'Discord Search ID, Discord Lookup, Discord ID Lookup, Discord ID Finder, Discord Look Up, Discord ID Tracker, Discord ID Search, Discord ID, Discord Search, Lookup.Guru, Lookup Guru, Discord, Search, ID, Lookup, Guru' }
    ]
  }
}).$mount('#app')
