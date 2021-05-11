<template>
  <div>
    <Search class="p-4 pt-3 bg-white shadow rounded-md overflow-hidden" @result="getResult" @loading="getLoading"/>
    <ResultPlaceholder v-if="loading"/>
    <Result :result="result" v-else/>
  </div>
</template>

<script>
  import Search from "@/components/Search";
  import Result from "@/components/Result";
  import ResultPlaceholder from "@/components/ResultPlaceholder";

  export default {
    components: {
      Search,
      ResultPlaceholder,
      Result
    },
    data() {
      return {
        result: null,
        loading: false
      }
    },
    methods: {
      getResult(data) {
        this.result = data;
      },
      getLoading(data) {
        this.loading = data;
      }
    },
  }
</script>

<style scoped>

</style>
