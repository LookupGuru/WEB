<template>
  <div>
    <Search class="p-4 pt-3 bg-white shadow rounded-lg overflow-hidden" @result="getResult" @loading="getLoading"/>
    <template v-if="result && $route.params.id">
      <Result :result="result" v-if="result"/>
      <ResultPlaceholder v-else/>
    </template>
    <List v-if="(!loading && !result) || !$route.params.id"/>
  </div>
</template>

<script>
  import Search from "@/components/Search";
  import Result from "@/components/Result";
  import List from "@/components/List";
  import ResultPlaceholder from "@/components/ResultPlaceholder";

  export default {
    data() {
      return {
        result: null,
        loading: false
      }
    },
    components: {
      Search,
      ResultPlaceholder,
      Result,
      List
    },
    methods: {
      getResult(data) {
        this.result = data;
      },
      getLoading(data) {
        this.loading = data;
      },
    }
  }
</script>

<style scoped>

</style>
