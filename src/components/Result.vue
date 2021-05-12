<template>
  <div class="bg-white shadow rounded-md overflow-auto mt-4" v-if="result">
    <div class="flex items-center py-3 px-4 border-b" v-if="result.type === 'USER'">
      <a :href="result.avatar_url+'?size=1024'" target="_blank" class="group flex-none mr-1.5 rounded-full bg-gray-100 overflow-hidden relative w-[4.3rem] h-[4.3rem]">
        <div class="absolute h-full w-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-all flex items-center justify-center duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        <img :src="result.avatar_url" :alt="result.username" class="h-full w-full object-cover object-center">
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
        </div>
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
        star: null
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
