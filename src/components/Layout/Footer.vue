<template>
  <div class="mt-auto text-center text-sm pt-4 pb-2">
    <div class="mb-4 border inline-flex items-center justify-center py-3 px-4 rounded-lg shadow-sm bg-white space-x-2">
      <div class="font-semibold text-gray-600">{{ $t('selectLanguage') }}:</div>
      <div class="flex space-x-1">
        <div
          class="px-1.5 py-1 hover:bg-gray-50 transition-all duration-300 rounded-md cursor-pointer font-medium"
          :class="{ '!bg-gray-100 font-semibold' : lang === $i18n.locale }"
          :key="key"
          v-for="(lang, key) in $i18n.availableLocales"
          @click="changeLanguage(lang)"
          :title="$t(`info.languages.${lang}`)"
        >{{ lang.toLocaleUpperCase() }}</div>
      </div>
    </div>
    <div><a href="https://github.com/LookupGuru" class="font-bold hover:underline" target="_blank">Berk Altıok</a> - {{ $t('discord') }}</div>
  </div>
</template>

<script>
  export default {
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
