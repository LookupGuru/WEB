import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import en from '@/lang/en'
import tr from '@/lang/tr'
import de from '@/lang/de'
import fr from '@/lang/fr'
import ru from '@/lang/ru'
import dk from '@/lang/dk'
import pt from '@/lang/pt'

let urlParams = new URLSearchParams(window.location.search);

let locale = urlParams?.get('hl') || localStorage.getItem("language") || navigator.language || navigator.userLanguage || 'en-US'

export default new VueI18n({
  locale,
  messages: {
    en,
    tr,
    de,
    fr,
    ru,
    dk,
    pt
  }
})
