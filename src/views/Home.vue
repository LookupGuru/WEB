<template>
  <div>
    <Search class="p-4 pt-3 bg-white shadow rounded-md overflow-hidden" @result="getResult"/>
    <div class="p-4 pt-3 bg-white shadow rounded-md overflow-auto mt-4" v-if="result">
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<script>
  import Search from "@/components/Search";

  export default {
    components: {
      Search
    },
    data() {
      return {
        result: null
      }
    },
    methods: {
      getResult(data) {
        this.result = data;
      }
    },
  }
</script>

<style scoped>

</style>
