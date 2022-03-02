<template>
  <div class="mt-auto text-center text-sm pt-4 pb-2">
    <div class="mb-4 border inline-flex flex-col py-3 px-4 rounded-lg shadow-sm bg-white space-y-2">
      <div class="font-semibold text-gray-600 text-left">{{ $t('selectLanguage') }}:</div>
      <div class="flex gap-1">
        <div
          class="px-1.5 py-1.5 hover:bg-gray-50 transition-all duration-300 rounded-md cursor-pointer font-medium flex items-center justify-center"
          :class="{ '!bg-gray-100 font-semibold' : lang === $i18n.locale }"
          :key="key"
          v-for="(lang, key) in $i18n.availableLocales"
          @click="changeLanguage(lang)"
          :title="$t(`info.languages.${lang}`)"
        >
          <country-flag :country="$t('info.flag', lang)" class="flag"/>
        </div>
      </div>
    </div>
    <div><a href="https://github.com/LookupGuru" class="font-bold hover:underline" target="_blank">Berk Altıok</a> - {{ $t('discord') }}</div>
  </div>
</template>

<script>
  import CountryFlag from 'vue-country-flag'

  export default {
    components: {
      CountryFlag
    },
    methods: {
      changeLanguage(language) {
        localStorage.setItem("language", language);
        this.$i18n.locale = language;

        this.$route.query.hl && this.$router.replace({
          query: {}
        })
      }
    }
  }
</script>

<style scoped>
 .flag {
   border-radius: 8px;
   display: block;
   margin: 0 !important;
   transform: none !important;
   zoom: .5;
 }
</style>
