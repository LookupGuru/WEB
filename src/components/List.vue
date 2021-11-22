<template>
  <div class="mb-6">
    <div class="mt-6 rounded-lg shadow h-[50px] bg-white flex overflow-hidden">
      <div class="border-r last:border-r-0 flex-1" v-for="(item, key) in tab.items">
        <button
          class="w-full h-full flex items-center justify-center text-gray-500 font-medium text-[14px] tracking-[.1px] focus:outline-none border-b-2 pt-0.5 border-transparent transition-all outline-none"
          :class="{ '!text-gray-800 border-indigo-700' : key === tab.active }"
          @click="updateTab(key)"
        >
          {{ $t(item.title) }}
        </button>
      </div>
    </div>
    <div class="mt-2 bg-white shadow rounded-lg overflow-auto max-h-[500px]">
      <template v-for="result in tab.list" v-if="tab.list[0] !== null">
        <router-link :to="result.id" class="flex items-center py-3 pl-4 pr-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 hover:bg-opacity-40 transition-colors" v-if="result.id">
          <div class="flex-none flex justify-center items-center mr-3.5 rounded-full bg-gray-100 overflow-hidden w-[2rem] h-[2rem] relative">
            <template v-if="result.type === 'USER'">
              <img
                :alt="result.username"
                :src="result.avatar && result.avatar.url"
                v-if="result.avatar && result.avatar.id"
                class="relative h-full w-full object-cover object-center z-20"
                @error="hiddenImage"
              >
              <div class="absolute top-0 left-0 h-full w-full flex items-center justify-center duration-200 z-10">
                <svg class="fill-current text-gray-300 w-3.5 h-auto" viewBox="0 0 28 20">
                  <path fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path>
                </svg>
              </div>
            </template>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="stroke-current text-gray-700 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </div>
          <div class="inline-block font-semibold">
            <template v-if="result.username && result.discriminator">{{ result.username }}<small class="font-normal text-md font-mono ml-[1px]">#{{ result.discriminator }}</small></template>
            <template v-else><span class="font-mono">{{ result.id }}</span></template>
          </div>
          <button
            @click.prevent="removeItem(tab.items[tab.active].list, result.id)"
            class="flex-none flex items-center justify-center ml-auto min-w-[28px] h-[28px] group transition-all hover:bg-red-50 rounded-md focus:outline-none outline-none"
            :class="{ 'bg-red-50' : result.id === deleteItem }"
          >
            <span class="uppercase text-xs text-red-500 px-2 font-semibold" v-if="result.id === deleteItem">{{ $t("list.approve") }}</span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="stroke-current text-gray-700 group-hover:text-red-500 transition-colors h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </router-link>
      </template>
      <div v-if="tab.list.length === 0" class="w-full h-full flex flex-col items-center justify-center py-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current text-gray-500 h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-center mt-1.5 text-gray-500 text-sm font-semibold">{{ $t("list.empty") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tab: {
          active: 0,
          items: [
            {
              title: "list.recent",
              list: "LookupGuruHistory"
            },
            {
              title: "list.favorites",
              list: "LookupGuruStar"
            }
          ],
          list: []
        },
        deleteItem: null
      }
    },
    methods: {
      updateTab(key) {
        this.tab.active = key;
        this.updateLocalList();
      },
      updateLocalList() {
        this.deleteItem = null;
        this.tab.list = this.getLocalList(this.tab.items[this.tab.active].list);
      },
      getLocalList(name) {
        return JSON.parse(localStorage.getItem(name)) || [];
      },
      removeItem(name, id) {
        if (this.deleteItem !== id) return this.deleteItem = id;
        let getData = this.getLocalList(name);
            getData.splice(getData.findIndex(item => item.id === id), 1);

        localStorage.setItem(name, JSON.stringify(getData));

        this.updateLocalList();
      },
      hiddenImage(element) {
        element.currentTarget.className += ' hidden'
      }
    },
    created() {
      this.updateLocalList();
    }
  }
</script>

<style scoped>

</style>
