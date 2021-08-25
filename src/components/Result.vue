<template>
  <div class="bg-white shadow rounded-md overflow-auto mt-4" v-if="result">
    <div class="border-b w-full min-h-[60px]" :style="{ backgroundColor: result.banner.color }" v-if="result.type === 'USER' && (result.banner.color || result.banner.url)">
      <a v-if="result.banner.url" :href="result.banner.url+'?size=1024'" target="_blank" class="group flex relative w-full h-[120px]">
        <div class="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-all flex items-center justify-center duration-200 z-30">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        <img
          :src="result.banner.url"
          :alt="result.username"
          class="h-full w-full object-cover object-center relative z-20"
        >
      </a>
    </div>
    <div class="flex items-center py-3 px-4 border-b" v-if="result.type === 'USER'">
      <a :href="result.avatar_url+'?size=1024'" target="_blank" class="group flex-none mr-1.5 rounded-full bg-gray-100 overflow-hidden relative w-[4.3rem] h-[4.3rem]">
        <div class="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-all flex items-center justify-center duration-200 z-30">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        <img
          :src="result.avatar_url"
          :alt="result.username"
          :class="{ 'hidden' : imageError }"
          class="h-full w-full object-cover object-center relative z-20"
          @error="imageError = !0"
        >
        <div class="absolute top-0 left-0 h-full w-full flex items-center justify-center duration-200 z-10">
          <svg class="fill-current text-gray-300" width="28" height="20" viewBox="0 0 28 20">
            <path fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path>
          </svg>
        </div>
      </a>
      <div class="flex-1 flex flex-col">
        <div
          @click="copyText(`${result.username}#${result.discriminator}`)"
          class="inline-block w-[fit-content] text-xl font-semibold hover:bg-gray-100 px-1.5 ml-1 rounded-md transition-colors cursor-pointer"
        >
          {{ result.username }}<small class="font-normal text-md font-mono ml-[1px]">#{{ result.discriminator }}</small>
        </div>
        <div class="flex items-center px-2 mt-[1px] select-none">
          <div
            v-for="(content, flag) in result.flags"
            class="h-[30px] w-[30px] p-[4px] hover:bg-gray-100 transition-colors rounded-md mr-[1px] cursor-pointer"
            v-tooltip.bottom="{
              content: `<div class='tooltip__title'>${content.title}</div>` + (content.text ? `<div class='tooltip__text'>${content.text}</div>` : '')
            }"
          >
            <img :src="require(`../assets/flags/SVG/${flag}.svg`)" :alt="flag" class="w-full h-full object-contain">
          </div>
        </div>
      </div>
      <div class="flex-none ml-auto cursor-pointer group" @click="addStar" v-tooltip.left="star ? 'Favorilerimden Çıkart' : 'Favorilerime Ekle'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current h-6 w-6 group-hover:text-yellow-500"
          :fill="star ? 'currentColor' : 'none'"
          :class="{ 'fill-current text-yellow-500' : star }"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </div>
    </div>
    <div class="grid sm:grid-cols-2 auto-rows-auto py-3 px-4 gap-3">
      <template v-if="result.type === 'USER'">
        <div>
          <p class="text-sm font-medium text-gray-900">Kullanıcı ID</p>
          <p class="text-sm text-gray-500">{{ result.id }}</p>
        </div>+
        <div>
          <p class="text-sm font-medium text-gray-900">Kullanıcı Tipi</p>
          <p class="text-sm text-gray-500">{{ result.is_bot ? 'Bot Hesap' : 'Normal Hesap' }}</p>
        </div>
      </template>
      <div>
        <p class="text-sm font-medium text-gray-900">Oluşturma Tarihi</p>
        <p class="text-sm text-gray-500">{{ dateFormat(result.created_at) }}</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-900">Oluşturma Yaşı</p>
        <p class="text-sm text-gray-500">{{ dateFrom(result.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    data() {
      return {
        star: null,
        imageError: false
      }
    },
    props: {
      result: {
        type: Object|Array,
        required: true
      }
    },
    methods: {
      copyText(message) {
        this.$copyText(message);
      },
      dateFormat(unix) {
        return moment(unix).locale("tr").format('Do MMMM YYYY, H:mm:ss');
      },
      dateFrom(unix) {
        return moment(unix).locale("tr").fromNow(true);
      },
      addStar() {
        let getData = JSON.parse(localStorage.getItem("LookupGuruStar")) || [];

        if (getData.find(item => item.id === this.result.id)) {
          getData.splice(getData.findIndex(item => item.id === this.result.id), 1);
          this.star = false;
        } else {
          getData.push(this.result)
          this.star = true;
        }
        localStorage.setItem("LookupGuruStar", JSON.stringify(getData));
      },
      addHistory() {
        let getData = JSON.parse(localStorage.getItem("LookupGuruHistory")) || [];

        if (!getData.find(item => item.id === this.result.id)) {
          localStorage.setItem("LookupGuruHistory", JSON.stringify([ this?.result, ...getData ]));
        }
      }
    },
    created() {
      let getData = JSON.parse(localStorage.getItem("LookupGuruStar")) || [];
      this.star = !!getData.find(item => item.id === this.$route.params.id);

      // Add History
      this.addHistory()
    }
  }
</script>
