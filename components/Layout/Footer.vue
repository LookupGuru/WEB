<template>
  <div class="mt-auto pt-4 pb-2 text-center text-sm">
    <div class="mb-4 inline-flex flex-col space-y-2 rounded-lg border bg-white py-3 px-4 shadow-sm">
      <div class="text-left font-semibold text-gray-600">{{ $t('selectLanguage') }}:</div>
      <div class="flex gap-1">
        <div
          class="flex cursor-pointer items-center justify-center rounded-md px-1.5 py-1.5 font-medium transition-all duration-300 hover:bg-gray-50"
          :class="{ '!bg-gray-100 font-semibold': lang === $i18n.locale }"
          :key="key"
          v-for="(lang, key) in $i18n.availableLocales"
          @click="changeLanguage(lang)"
          :title="$t(`info.languages.${lang}`)"
        >
          <div class="flag">
            <img :src="require(`@/assets/flags/${$t('info.flag', lang)}.svg`)" :alt="$t('info.flag', lang)" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <a href="https://lookup.guru" class="font-bold hover:underline" target="_blank">LookupGuru</a>
      - {{ $t('discord') }}
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      changeLanguage(language) {
        this.$i18n.setLocale(language)
      }
    }
  }
</script>

<style scoped lang="scss">
  .flag {
    display: inline-block;
    overflow: hidden;
    position: relative;
    height: 20px;
    border-radius: 3px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-width: 100%;
      user-select: none;
    }
  }
</style>
