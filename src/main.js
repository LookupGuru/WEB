import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Set Api
import { ApiUtil } from "@/utils/api.util";
ApiUtil.init('http://localhost:3600/');

// Import Tailwind CSS
import "./assets/scss/tailwind.scss"

// Vue Meta Mask
import VueMeta from 'vue-meta'
Vue.use(VueMeta)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  metaInfo: {
    title: "Discord Lookup",
    titleTemplate: '%s - DiscordID'
  }
}).$mount('#app')
