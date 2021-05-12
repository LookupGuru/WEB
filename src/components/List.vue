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
          <a :href="result.avatar_url+'?size=1024'" target="_blank" class="flex-none mr-4 rounded-full bg-gray-100 overflow-hidden">
            <img :src="result.avatar_url" :alt="result.username" class="w-[2rem] h-[2rem]">
          </a>
          <div class="flex-1 flex items-center">
            <div class="inline-block font-semibold">
              {{ result.username }}<small class="font-normal text-md font-mono ml-[1px]">#{{ result.discriminator }}</small>
            </div>
            <button @click.prevent="removeItem(tab.items[tab.active].list, result.id)" class="flex items-start ml-auto p-1.5 group transition-colors hover:bg-red-50 rounded-lg focus:outline-none outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current text-gray-700 group-hover:text-red-500 transition-colors h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </router-link>
      </template>
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
              list: "LookupGuruFavorites"
            },
            {
              title: "Son Aramalarım",
              list: "LookupGuruHistory"
            }
          ],
          list: []
        }
      }
    },
    methods: {
      updateTab(key) {
        this.tab.active = key;
        this.updateLocalList();
      },
      updateLocalList() {
        this.tab.list = this.getLocalList(this.tab.items[this.tab.active].list);
      },
      getLocalList(name) {
        return JSON.parse(localStorage.getItem(name)) || [];
      },
      removeItem(name, id) {
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
