<template>
  <div class="mb-6">
    <div class="mt-6 rounded-lg shadow h-[50px] bg-white flex overflow-hidden">
      <div class="border-r last:border-r-0 flex-1" v-for="(item, key) in tab.items">
        <button
          class="w-full h-full flex items-center justify-center text-gray-500 font-medium text-[14px] tracking-[.1px] focus:outline-none border-b-2 pt-0.5 border-transparent transition-all outline-none"
          :class="{ '!text-gray-800 border-indigo-700' : key === tab.active }"
          @click="updateTab(key)"
        >
          {{ item.title }}
        </button>
      </div>
    </div>
    <div class="mt-2 bg-white shadow rounded-lg overflow-auto max-h-[500px]">
      <template v-for="result in tab.list">
        <router-link :to="result.id" class="flex items-center py-3 pl-4 pr-3 border-b last:border-b-0 cursor-pointer" v-if="result.id">
          <div class="flex-none flex justify-center items-center mr-3.5 rounded-full bg-gray-100 overflow-hidden w-[2rem] h-[2rem]">
            <img :src="result.avatar_url" :alt="result.username" class="h-full w-full object-cover object-center" v-if="result.avatar_url">
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
            class="flex-none flex items-center justify-center ml-auto min-w-[28px] h-[28px] group transition-all hover:bg-red-50 rounded-lg focus:outline-none outline-none"
            :class="{ 'bg-red-50' : result.id === deleteItem }"
          >
            <span class="uppercase text-xs text-red-500 px-2 font-semibold" v-if="result.id === deleteItem">Onayla</span>
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
        <span class="text-center mt-1.5 text-gray-500 text-sm font-semibold">Bu Liste Bomboş</span>
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
              title: "Favorilerim",
              list: "LookupGuruStar"
            },
            {
              title: "Son Aramalarım",
              list: "LookupGuruHistory"
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
      }
    },
    created() {
      this.updateLocalList();
    }
  }
</script>

<style scoped>

</style>
